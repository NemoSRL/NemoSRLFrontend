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
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css',
})
export class DetailProductComponent {
  constructor(private productService: ProdottiService, private messageService : MessageService) {}
  @Input() productId?: number;
  product?: Prodotto;

  private modalService = inject(NgbModal);
  closeResult = '';

  open(content: TemplateRef<any>) {
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
  ngOnInit(): void {
    this.productService
      .getProdottoById(this.productId ?? 0)
      .subscribe((product) => {this.product = product; console.log(product)}, errore => this.messageService.add("Errore caricamento prodotti."));
  }
}
