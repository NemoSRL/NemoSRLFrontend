import { Component, EventEmitter, Output, TemplateRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProdottiService } from '../services/prodotti.service';
import { MessageService } from '../services/message.service';
import { popolato } from '../checker';
@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent {
  nome: string = '';
  qualita: string = '';
  qntMinima: number = 0;
  qnt: number = 0;
  closeResult = '';
  @Output() productAdded = new EventEmitter<void>();

  constructor(private modalService: NgbModal, private productService: ProdottiService, private messageService: MessageService) {}

  open(content: TemplateRef<any>, templateName : string) {
    if(templateName === "main"){
      this.resetInput()
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }


  resetInput(): void {
    this.nome = '';
    this.qualita = '';
    this.qntMinima = 0;
    this.qnt= 0;
  }
  addProduct(): void {
    if(!(popolato(this.nome) && popolato(this.qualita) && popolato(this.qnt) && popolato(this.qntMinima))) {
      alert("Ti sei dimenticato qualche campo!")
      return
    } 
    if(isNaN(this.qnt) || isNaN(this.qntMinima)){
      alert("Quantità e soglia minima devono essere dei numeri!")
      return
    }
    if(this.qnt<0 || this.qntMinima<0){
      alert("Quantità e soglia minima devono essere maggiori di zero!")
      return
    }
    this.productService.updateProdotto({
      id: undefined,
      nome: this.nome,
      qualita: this.qualita,
      sogliaminima: this.qntMinima,
      quantita: this.qnt,
    }).subscribe(
      successo => {
        console.log("successo");
        setTimeout(() => {
          this.productAdded.emit(); // Emitting the event after a delay
        }, 1000); // Delay of 1 seconds
      },
      errore => this.messageService.add("Errore inserimento.")
    );
    this.modalService.dismissAll();
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
