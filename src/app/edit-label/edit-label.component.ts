import { Component, inject, TemplateRef, Input, EventEmitter, Output } from '@angular/core';
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
  OrdineInUscita,
  OrdineUscitaService,
} from '../services/ordine-uscita.service';
import { Vendita, VenditaService } from '../services/vendita.service';
import { MessageService } from '../services/message.service';
import { Slot, SlotService } from '../services/slot.service';
import { popolato } from '../checker';

@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrl: './edit-label.component.css',
})
export class EditLabelComponent {
  @Output() labelModified = new EventEmitter<void>();
  spostamento?: string;
  dataarrivo?: Date;
  descrizione?: string = '';
  abbattimento?: boolean = false;
  peso?: number = -1;
  prodotto?: number ;
  scontoextra?: number = -1;
  posizioneid?: string = '';
  posizionenp?: number = -1;
  prenotazione?: string = '';

  constructor(
    private etichetteService: EtichetteService,
    private productService: ProdottiService,
    
    private positionService: PosizioneService,
    
    private messageService : MessageService,
    private slotService : SlotService
  ) {}
  @Input() etichetta?: Etichetta;
  @Input() etichettaId?: number = 0;
  private modalService = inject(NgbModal);
  closeResult = '';

  open(content: TemplateRef<any>, templateName : string) {
    if(templateName === "main"){
      this.ngOnInit();
      
    }
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
  selectedPosition = this.etichetta?.posizioneid;

  selectedVendita: string = '';
  editEtichette(): void {
    if(!(popolato(this.dataarrivo) && popolato(this.peso) && popolato(this.prodotto) && popolato(this.scontoextra) && popolato(this.selectedPosition) && popolato(this.selectedSlot) && popolato(this.descrizione))) {
      alert("Ti sei dimenticato qualche campo!")
      return
    } 
    if(isNaN(this.peso!) || isNaN(this.scontoextra!)){
      alert("Peso e sconto extra minima devono essere dei numeri!")
      return
    }
    if(this.peso!<0 || this.scontoextra!<0){
      alert("Peso deve essere maggiore di zero e sconto extra deve essere maggiore o uguale di zero!")
      return
    }

    const updatedEtichetta: Etichetta = {
      id: this.etichetta?.id ?? -1,
      dataarrivo: this.dataarrivo,
      descrizione: this.descrizione,
      abbattimento: this.abbattimento,
      peso: this.peso,
      prodotto: this.prodotto,
      scontoextra: this.scontoextra ?? 0,
      posizioneid: this.selectedPosition,
      posizionenp: this.selectedSlot,
      oldPosizioneId: this.etichetta?.posizioneid,
      oldPosizioneNp: this.etichetta?.posizionenp
    };
    console.log(updatedEtichetta);
    this.etichetteService.updateEtichetta(updatedEtichetta).subscribe(successo => {
      console.log("successo");
      setTimeout(() => {
        this.labelModified.emit(); // Emitting the event after a delay
      }, 1000); // Delay of 1 seconds
    }, errore => this.messageService.add("Errore modifica."));
    this.modalService.dismissAll();
  }
  deleteEtichette(): void {
    this.modalService.dismissAll();
    this.etichetteService.deleteEtichette(this.etichetta?.id ?? -1).subscribe(successo => {
      console.log("successo");
      setTimeout(() => {
        this.labelModified.emit(); // Emitting the event after a delay
      }, 1000); // Delay of 1 seconds
    }, errore => this.messageService.add("Errore eliminazione."));
    this.modalService.dismissAll();
  }

  products: Prodotto[] = [];
  private getProducts(): void {
    this.productService
      .getAllProdotti()
      .subscribe((products) => (this.products = products), errore => this.messageService.add("Errore caricamento prodotti."));
  }



  positions: Posizione[] = [];
  private getPositions(): void {
    this.positionService
      .getAllPosizioni()
      .subscribe((positions) => (this.positions = positions), errore => this.messageService.add("Errore caricamento posizioni."));
  }
 


  ngOnInit(): void {
    this.getProducts();
    this.getPositions();
    this.onPositionChange(this.etichetta?.posizioneid || "")
    this.initInput()
    
  }

  initInput() : void {
    this.dataarrivo= this.etichetta?.dataarrivo;
    this.descrizione= this.etichetta?.descrizione;
    this.abbattimento= this.etichetta?.abbattimento;
    this.peso= this.etichetta?.peso;
    this.prodotto= this.etichetta?.prodotto;
    this.scontoextra=this.etichetta?.scontoextra;
    this.selectedPosition=this.etichetta?.posizioneid;
    this.selectedSlot=this.etichetta?.posizionenp || -1;
    this.dataarrivo=this.etichetta?.dataarrivo
  }
  closeAllModal(){
    this.modalService.dismissAll()
  }
  slots : Slot[] = []
  selectedSlot = this.etichetta?.posizionenp
  onPositionChange(positionId: string) {
    // Filter the subPositions based on the selected positionId
    this.slotService.getSlots(positionId, false).subscribe(
      slots=>this.slots=slots, errore => this.messageService.add("Errore caricamento slots.")
    )
    
  }
}
