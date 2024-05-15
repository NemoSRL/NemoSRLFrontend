import { Component, inject, TemplateRef } from '@angular/core';
import { Prodotto } from '../prodotti.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProdottiService } from '../prodotti.service';
@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css'
})
export class AddProductsComponent {
  nome: string = '';
  qualita: string = '';
  qntMinima: number = 0;
  qnt: number = 0;
  private modalService = inject(NgbModal);
	closeResult = '';
  constructor(private productService : ProdottiService){}
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

  addProduct(): void{
	//console.log({id:-1, nome:this.nome, qualita: this.qualita, sogliaminima : this.qntMinima, quantita : this.qnt})
    this.productService.updateProdotto({id: undefined, nome:this.nome, qualita: this.qualita, sogliaminima : this.qntMinima, quantita : this.qnt}).subscribe()
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
