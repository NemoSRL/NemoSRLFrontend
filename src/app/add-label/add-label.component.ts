import { Component, inject, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {EtichetteService} from "../service/etichette.service";
import { ProdottiService, Prodotto } from '../service/prodotti.service';

@Component({
  selector: 'app-add-label',
  templateUrl: './add-label.component.html',
  styleUrl: './add-label.component.css'
})
export class AddLabelComponent {
  id?: number=0;
  dataArrivo? : Date ;
  descrizione: string="";
  abbattimento: boolean=true;
  peso: number=0;
  prodotto: string="";
  venditanp?:number=undefined;
  venditadata?: Date=undefined;
  ordineuscita: number=0;
  scontoextra:number=0;
  posizioneid?: number;
  posizionenp?: number;
  prenotazione?: string;

  private modalService = inject(NgbModal);
  closeResult = '';
  constructor(private etichetteService : EtichetteService, private productService : ProdottiService, private clientService : ClienteService){}
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
  selectedPosition:string = "0 - 0";
  addEtichetta(): void{
    const parsedPosition = this.selectedPosition?.split(' - ')
    this.posizioneid=parseInt(parsedPosition[0])
    this.posizionenp=parseInt(parsedPosition[1])

    this.etichetteService.addEtichetta({id:undefined,dataarrivo:this.dataArrivo, descrizione:this.descrizione, abbattimento: this.abbattimento,
      peso: this.peso, prodotto : this.prodotto , venditanp: this.venditanp, venditadata: this.venditadata,
      ordineUscita:this.ordineuscita,scontoextra:this.scontoextra,posizioneid:this.posizioneid,
      posizionenp:this.posizionenp, prenotazione:this.prenotazione}).subscribe()
      this.modalService.dismissAll()
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

  products : Prodotto[] = []
  private getProducts() : void {

		this.productService.readAllProdotti()
			.subscribe(products => this.products = products);

}
reservations : Cliente[] = []
private getClients() : void {
  this.clientService.readAllClienti()
    .subscribe(reservations => this.reservations = reservations);
}
ngOnInit(): void {
	this.getProducts();
  this.getClients
}

}
