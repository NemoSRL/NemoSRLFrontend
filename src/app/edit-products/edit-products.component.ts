import { Component, inject, TemplateRef, Input } from '@angular/core';

import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Prodotto } from '../service/prodotti.service';

import { ProdottiService } from '../service/prodotti.service';
@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrl: './edit-products.component.css'
})
export class EditProductsComponent {
  nome: string = '';
  qualita: string = '';
  qntMinima: number = 0;
  qnt: number = 0;
  constructor(private productService : ProdottiService){}
  @Input() product?: Prodotto

  tempProd?: Prodotto
  private modalService = inject(NgbModal);
  closeResult = '';

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
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
  editProduct(): void{
    const updatedProduct: Prodotto = {
      id: this.product?.id ?? -1,
      nome: this.nome,
      qualita: this.qualita,
      sogliaminima: this.qntMinima,
      quantita: this.qnt
    };
    console.log(updatedProduct)
    this.productService.updateProdotto(updatedProduct).subscribe()
    this.modalService.dismissAll()

  }
  deleteProduct(): void{
    this.modalService.dismissAll()
    this.productService.deleteProdotto(this.product?.id ?? -1).subscribe()
  }
  }
