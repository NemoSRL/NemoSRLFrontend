import { Component, inject, TemplateRef, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { Prodotto } from '../services/prodotti.service';

import { ProdottiService } from '../services/prodotti.service';
import { MessageService } from '../services/message.service';
import { popolato } from '../checker';
import { ProductEditDataService } from '../services/event.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrl: './edit-products.component.css',
})
export class EditProductsComponent {
  @ViewChild('content', { static: true }) content?: TemplateRef<any>;
  nome: string = "";
  qualita: string = "";
  qntMinima: number = -3;
  qnt: number = -3;
  constructor(private productService: ProdottiService, private messageService : MessageService, private EditDataService: ProductEditDataService) {}
  @Input() product?: Prodotto;
  @Output() productEdited = new EventEmitter<void>();
  tempProd?: Prodotto;
  private modalService = inject(NgbModal);
  closeResult = '';

  open(content: TemplateRef<any>, templateName : string) {
    /*if(templateName === "main"){
      this.initInput();
      
    }*/
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
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
  editProduct(): void {
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
    const updatedProduct: Prodotto = {
      id: this.product?.id ?? -1,
      nome: this.nome,
      qualita: this.qualita,
      sogliaminima: this.qntMinima,
      quantita: this.qnt,
    };
    console.log(updatedProduct);
    this.productService.updateProdotto(updatedProduct).subscribe(successo => {
      console.log("successo");
        setTimeout(() => {
          this.productEdited.emit(); // Emitting the event after a delay
        }, 1000); // Delay of 1 seconds
    },  errore => this.messageService.add("Errore modifica."));
    this.modalService.dismissAll();
  }
  deleteProduct(): void {
    this.modalService.dismissAll();
    this.productService.deleteProdotto(this.product?.id ?? -1).subscribe(successo => {
      console.log("successo");
        setTimeout(() => {
          this.productEdited.emit(); // Emitting the event after a delay
        }, 1000); // Delay of 1 seconds
    },  errore => this.messageService.add("Errore eliminazione."));
  }
 
  initInput() : void {
    
    this.nome = this.product?.nome || "";
    this.qualita = this.product?.qualita || "";
    this.qntMinima = this.product?.sogliaminima || 0;
    this.qnt = this.product?.quantita || 0;
    
  }


  private param1Subscription?: Subscription;
  ngOnInit(): void {
    
    this.param1Subscription = this.EditDataService.param1Observable$.subscribe(
      (param: any) => {
        this.product = param as Prodotto;
        this.initInput()
        this.open(this.content!, "main")
      }
    );
  }
  openParam1(param1: string) {
    // La tua logica per aprire param1
    alert( param1);
  }
  closeAllModal(){
    this.modalService.dismissAll()
  }
}
