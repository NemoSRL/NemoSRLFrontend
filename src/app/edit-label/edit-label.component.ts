import { Component, inject, TemplateRef, Input } from '@angular/core';
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { Etichetta, EtichetteService } from '../services/etichette.service';
import { Data } from '@angular/router';
import { ProdottiService, Prodotto } from '../services/prodotti.service';
import { Cliente, ClienteService } from '../services/cliente.service';
import { Posizione, PosizioneService } from '../services/posizione.service';
import {
  OrdineUscita,
  OrdineUscitaService,
} from '../services/ordine-uscita.service';
import { Vendita, VenditaService } from '../services/vendita.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrl: './edit-label.component.css',
})
export class EditLabelComponent {
  dataarrivo?: Date = new Date('2000-00-00');
  descrizione?: string = '';
  abbattimento?: boolean = false;
  peso?: number = -1;
  prodotto?: string = '';
  venditanp?: number = -1;
  venditadata?: Date = new Date('2000-00-00');
  ordineUscita?: number = -1;
  cliente?: string = '';
  scontoextra?: number = -1;
  posizioneid?: string = '';
  posizionenp?: number = -1;
  prenotazione?: string = '';

  constructor(
    private etichetteService: EtichetteService,
    private productService: ProdottiService,
    private clientService: ClienteService,
    private positionService: PosizioneService,
    private orderService: OrdineUscitaService,
    private venditaService: VenditaService,
    private messageService : MessageService
  ) {}
  @Input() etichetta?: Etichetta;
  @Input() etichettaId?: number = 0;
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
  selectedPosition: string = '';
  selectedVendita: string = '';
  editEtichette(): void {
    if (this.selectedPosition === '') {
      this.posizioneid = undefined;
      this.posizionenp = undefined;
    } else {
      const parsedPosition = this.selectedPosition?.split(' - ');
      this.posizioneid = parsedPosition[0];
      this.posizionenp = parseInt(parsedPosition[1]);
    }
    if (this.selectedVendita === '') {
      this.venditanp = undefined;
      this.venditadata = undefined;
    } else {
      const parsedVendita = this.selectedVendita?.split(' - ');
      this.venditanp = parseInt(parsedVendita[0]);
      this.venditadata = new Date(parsedVendita[1]);
    }

    const updatedEtichetta: Etichetta = {
      id: this.etichetta?.id ?? -1,
      dataarrivo: this.dataarrivo,
      descrizione: this.descrizione,
      abbattimento: this.abbattimento,
      peso: this.peso,
      prodotto: this.prodotto,
      venditanp: this.venditanp,
      venditadata: this.venditadata,
      ordineUscita: this.ordineUscita,
      scontoextra: this.scontoextra ?? 0,
      posizioneid: this.posizioneid,
      posizionenp: this.posizionenp,
      prenotazione: this.prenotazione,
    };
    console.log(updatedEtichetta);
    this.etichetteService.updateEtichetta(updatedEtichetta).subscribe(successo => console.log("successo"), errore => this.messageService.add("Errore modifica."));
    this.modalService.dismissAll();
  }
  deleteEtichette(): void {
    this.etichetteService.deleteEtichette(this.etichetta?.id ?? -1).subscribe(successo => console.log("successo"), errore => this.messageService.add("Errore eliminazione."));
    this.modalService.dismissAll();
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
  orders: OrdineUscita[] = [];
  private getOrders(): void {
    this.orderService
      .getAllOrdini()
      .subscribe((orders) => (this.orders = orders), errore => this.messageService.add("Errore caricamento ordini."));
  }

  vendite: Vendita[] = [];
  private getVendite(): void {
    this.venditaService
      .getAllVendita()
      .subscribe((vendite) => (this.vendite = vendite));
  }
  ngOnInit(): void {
    this.getProducts();
    this.getClients();
    this.getPositions();
    this.getOrders();
    this.getVendite();
  }
}
