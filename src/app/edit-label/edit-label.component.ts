import { Component, inject, TemplateRef, Input } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {etichette, EtichetteService} from "../etichette.service";
import {Data} from "@angular/router";
import {ProdottiService, Prodotto} from "../prodotti.service";
import { Cliente, ClienteService } from '../cliente.service';

@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrl: './edit-label.component.css'
})
export class EditLabelComponent {
  dataarrivo?: Date =new Date ('2000-00-00')
  descrizione?: string =""
  abbattimento?: boolean = false
  peso?: number =-1
  prodotto?: string =""
  venditanp?: number =-1
  venditadata?: Date =new Date ('2000-00-00')
  ordineUscita?: number =-1
  cliente?: string =""
  scontoextra?: number=-1
  posizioneid?: number=-1
  posizionenp?: number=-1
  prenotazione?: string=""

  constructor(private etichetteService : EtichetteService, private productService : ProdottiService, private clientService : ClienteService, private positionService : PosizioneService){}
  @Input() etichetta?: etichette
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
  selectedPosition:string = "0 - 0";
  addEtichetta(): void{
    const parsedPosition = this.selectedPosition?.split(' - ')
    this.posizioneid=parseInt(parsedPosition[0])
    this.posizionenp=parseInt(parsedPosition[1])
    
    const updatedEtichetta: etichette = {
      id: this.etichetta?.id ?? -1,
      dataarrivo:this.dataarrivo,
      descrizione:this.descrizione,
      abbattimento:this.abbattimento,
      peso:this.peso,
      prodotto:this.prodotto,
      venditanp:this.venditanp,
      venditadata:this.venditadata,
      ordineUscita:this.ordineUscita,
      scontoextra:this.scontoextra??0,
      posizioneid:this.posizioneid,
      posizionenp:this.posizionenp,
      prenotazione:this.prenotazione,
    };
    console.log(updatedEtichetta)
    this.etichetteService.updateEtichetta(updatedEtichetta).subscribe()
    this.modalService.dismissAll()

  }
  deleteEtichette(): void{
    this.etichetteService.deleteEtichette(this.etichetta?.id ?? -1).subscribe()
    this.modalService.dismissAll()
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

  positions : Posizione[] = []
  private getPositions() : void {
    this.positionService.readAllPosizioni()
			.subscribe(positions => this.positions = positions);
  }
ngOnInit(): void {
	this.getProducts();
  this.getClients();
  this.getPositions();
}
}
