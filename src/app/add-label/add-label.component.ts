import { Component, inject, TemplateRef } from '@angular/core';
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { EtichetteService } from '../services/etichette.service';
import { ProdottiService, Prodotto } from '../services/prodotti.service';
import { Cliente, ClienteService } from '../services/cliente.service';
import { Posizione, PosizioneService } from '../services/posizione.service';
import {
  OrdineInUscita,
  OrdineUscitaService,
} from '../services/ordine-uscita.service';
import { Vendita, VenditaService } from '../services/vendita.service';
import { MessageService } from '../services/message.service';
@Component({
  selector: 'app-add-label',
  templateUrl: './add-label.component.html',
  styleUrl: './add-label.component.css',
})
export class AddLabelComponent {
  id?: number = 0;
  dataArrivo?: Date;
  descrizione: string = '';
  abbattimento: boolean = true;
  peso: number = 0;
  prodotto?: number ;
  venditanp?: number = undefined;
  venditadata?: Date = undefined;
  ordineuscita: number = 0;
  scontoextra: number = 0;
  posizioneid?: string='';
  posizionenp?: number;
  prenotazione?: string;

  private modalService = inject(NgbModal);
  closeResult = '';
  constructor(
    private etichetteService: EtichetteService,
    private productService: ProdottiService,
    private clientService: ClienteService,
    private positionService: PosizioneService,
    private orderService: OrdineUscitaService,
    private venditaService: VenditaService,
    private messageService : MessageService
  ) {}
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
  selectedPosition: string = '';
  selectedVendita: string = '';
  addEtichetta(): void {
    if (this.selectedPosition === '') {
      this.posizioneid = undefined;
      this.posizionenp = undefined;
    } else {
      const parsedPosition = this.selectedPosition?.split(' - ');
      this.posizioneid = parsedPosition[0];
      this.posizionenp = parseInt(parsedPosition[1]);
    }
    if(this.selectedVendita===''){
      this.venditanp=undefined
      this.venditadata=undefined
    } else{
      const parsedVendita = this.selectedVendita?.split(' - ');
      this.venditanp = parseInt(parsedVendita[0])
      this.venditadata = new Date(parsedVendita[1])
    }

    this.etichetteService
      .addEtichetta({
        id: -1,
        dataarrivo: this.dataArrivo,
        descrizione: this.descrizione,
        abbattimento: this.abbattimento,
        peso: this.peso,
        prodotto: this.prodotto,
        venditanp: this.venditanp,
        venditadata: this.venditadata,
        ordineUscita: this.ordineuscita,
        scontoextra: this.scontoextra,
        posizioneid: this.posizioneid,
        posizionenp: this.posizionenp,
        prenotazione: this.prenotazione,
      })
      .subscribe(successo => console.log("successo"), errore => this.messageService.add("Errore inserimento."));
      console.log({id: undefined,
        dataarrivo: this.dataArrivo,
        descrizione: this.descrizione,
        abbattimento: this.abbattimento,
        peso: this.peso,
        prodotto: this.prodotto,
        venditanp: this.venditanp,
        venditadata: this.venditadata,
        ordineUscita: this.ordineuscita,
        scontoextra: this.scontoextra,
        posizioneid: this.posizioneid,
        posizionenp: this.posizionenp,
        prenotazione: this.prenotazione,})
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

  products: Prodotto[] = [];
  private getProducts(): void {
    this.productService
      .getAllProdotti()
      .subscribe((products) => (this.products = products), errore => this.messageService.add("Errore caricamento prodotti."));
  }
  reservations: Cliente[] = [];
  private getClients(): void {
    this.clientService
      .getAllClienti()
      .subscribe((reservations) => (this.reservations = reservations), errore => this.messageService.add("Errore caricamento personale."));
  }

  positions: Posizione[] = [];
  private getPositions(): void {
    this.positionService
      .getAllPosizioni()
      .subscribe((positions) => (this.positions = positions), errore => this.messageService.add("Errore caricamento posizioni."));
  }
  orders: OrdineInUscita[] = [];
  private getOrders(): void {
    this.orderService
      .getAllOrdini()
      .subscribe((orders) => (this.orders = orders), errore => this.messageService.add("Errore caricamento ordini."));
  }

  vendite: Vendita[] = [];
  private getVendite(): void {
    this.venditaService.getAllVendita()
    .subscribe(vendite=>(this.vendite=vendite), errore => this.messageService.add("Errore caricamento vendite."))
  }
  ngOnInit(): void {
    this.getProducts();
    this.getClients();
    this.getPositions();
    this.getOrders();
    this.getVendite();
  }
}
