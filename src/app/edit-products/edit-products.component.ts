import { Component, inject, TemplateRef, Input } from '@angular/core';

import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { Prodotto } from '../services/prodotti.service';

import { ProdottiService } from '../services/prodotti.service';
import { MessageService } from '../services/message.service';
@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrl: './edit-products.component.css',
})
export class EditProductsComponent {
  nome: string = "";
  qualita: string = "";
  qntMinima: number = -3;
  qnt: number = -3;
  constructor(private productService: ProdottiService, private messageService : MessageService) {}
  @Input() product?: Prodotto;

  tempProd?: Prodotto;
  private modalService = inject(NgbModal);
  closeResult = '';

  open(content: TemplateRef<any>) {
    this.initInputs()
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
    const updatedProduct: Prodotto = {
      id: this.product?.id ?? -1,
      nome: this.nome,
      qualita: this.qualita,
      sogliaminima: this.qntMinima,
      quantita: this.qnt,
    };
    console.log(updatedProduct);
    this.productService.updateProdotto(updatedProduct).subscribe(successo => console.log("successo"),  errore => this.messageService.add("Errore modifica."));
    this.modalService.dismissAll();
  }
  deleteProduct(): void {
    this.modalService.dismissAll();
    this.productService.deleteProdotto(this.product?.id ?? -1).subscribe(successo => console.log("successo"),  errore => this.messageService.add("Errore eliminazione."));
  }

  initInputs() : void {
    console.log(this.product?.sogliaminima)
    console.log(this.product)
    this.nome = this.product?.nome || "";
    this.qualita = this.product?.qualita || "";
    this.qntMinima = this.product?.sogliaminima || 0;
    this.qnt = this.product?.quantita || 0;
  }

  closeAllModal(){
    this.modalService.dismissAll()
  }
}
