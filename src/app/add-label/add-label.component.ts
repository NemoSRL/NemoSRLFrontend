import { Component, EventEmitter, inject, Output, TemplateRef } from '@angular/core';
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
import { Slot, SlotService } from '../services/slot.service';
import { popolato } from '../checker';
@Component({
  selector: 'app-add-label',
  templateUrl: './add-label.component.html',
  styleUrl: './add-label.component.css',
})
export class AddLabelComponent {
  @Output() labelModified = new EventEmitter<void>();
  id?: number = 0;
  dataArrivo?: Date;
  descrizione: string = '';
  abbattimento: boolean = true;
  peso: number = 0;
  prodotto: number = 0;
  scontoextra: number = 0;
  posizioneid?: string='';

  private modalService = inject(NgbModal);
  closeResult = '';
  constructor(
    private etichetteService: EtichetteService,
    private productService: ProdottiService,
    
    private positionService: PosizioneService,
    
    
    private messageService : MessageService,
    private slotService : SlotService
  ) {}
  open(content: TemplateRef<any>, templateName : string) {
    if(templateName === "main"){
      this.ngOnInit();
      this.resetInput();
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

  resetInput() : void {
    this.id = 0;
    this.dataArrivo = new Date();
    this.descrizione = '';
    this.abbattimento = true;
    this.peso = 0;
    this.prodotto = 0;
    this.scontoextra = 0;
    this.posizioneid ='';
  }
  selectedPosition: string = '';
  addEtichetta(): void {
    if(!(popolato(this.dataArrivo) && popolato(this.peso) && popolato(this.prodotto) && popolato(this.scontoextra) && popolato(this.selectedPosition) && popolato(this.selectedSlot) && popolato(this.descrizione))) {
      alert("Ti sei dimenticato qualche campo!")
      return
    } 
    if(isNaN(this.peso) || isNaN(this.scontoextra)){
      alert("Peso e sconto extra minima devono essere dei numeri!")
      return
    }
    if(this.peso<0 || this.scontoextra<0){
      alert("Peso deve essere maggiore di zero e sconto extra deve essere maggiore o uguale di zero!")
      return
    }

    this.etichetteService
      .addEtichetta({
        id: undefined,
        dataarrivo: this.dataArrivo,
        descrizione: this.descrizione,
        abbattimento: this.abbattimento,
        peso: this.peso,
        prodotto: this.prodotto,
        scontoextra: this.scontoextra,
        posizioneid: this.selectedPosition,
        posizionenp: parseInt(this.selectedSlot),
        oldPosizioneId: this.selectedPosition,
        oldPosizioneNp: parseInt(this.selectedSlot)
        
      })
      .subscribe(successo => {
        console.log("successo");
        setTimeout(() => {
          this.labelModified.emit(); // Emitting the event after a delay
        }, 1000); // Delay of 1 seconds
      }, errore => this.messageService.add("Errore inserimento."));
      
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
  
  

  positions: Posizione[] = [];
  private getPositions(): void {
    this.positionService
      .getAllPosizioni()
      .subscribe((positions) => (this.positions = positions), errore => this.messageService.add("Errore caricamento posizioni."));
  }
  

  
  ngOnInit(): void {
    this.getProducts();
    
    this.getPositions();
    
  }
  closeAllModal(){
    this.modalService.dismissAll()
  }
  slots : Slot[] = []
  selectedSlot = '';
  onPositionChange(positionId: string) {
    // Filter the subPositions based on the selected positionId
    this.slotService.getSlots(positionId, false).subscribe(
      slots=>this.slots=slots, errore => this.messageService.add("Errore caricamento slots.")
    )
    // Reset the selectedSubPosition when the main position changes
    this.selectedSlot = '';
  }
}
