import { Component, inject, TemplateRef, Input } from '@angular/core';

import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Prodotto } from '../prodotti.service';


@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrl: './edit-products.component.css'
})
export class EditProductsComponent {
  @Input() product?: Prodotto
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
}
