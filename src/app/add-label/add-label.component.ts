import { Component, inject, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {EtichetteService} from "../etichette.service";

@Component({
  selector: 'app-add-label',
  templateUrl: './add-label.component.html',
  styleUrl: './add-label.component.css'
})
export class AddLabelComponent {
  id: number=0;
  dataArrivo? : Date ;
  descrizione: string="";
  abbattimento: boolean=true;
  peso: number=0;
  prodotto: string="";
  venditanp:number=0;
  venditadata?: Date;
  ordineuscita: number=0;
  cliente:string="";
  scontoextra:number=0;
  posizioneid?: number;
  posizionenp?: number;
  prenotazione?: string;
  private modalService = inject(NgbModal);
  closeResult = '';
  constructor(private EtichetteService : EtichetteService){}
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

  addEtichetta(): void{
    this.EtichetteService.addEtichetta({id:undefined,dataarrivo:this.dataArrivo, descrizione:this.descrizione, abbattimento: this.abbattimento,
      peso: this.peso, prodotto : this.prodotto , venditanp: this.venditanp, venditadata: this.venditadata,
      ordineUscita:this.ordineuscita, cliente:this.cliente,scontoextra:this.scontoextra,posizioneid:this.posizioneid,
      posizionenp:this.posizionenp, prenotazione:this.prenotazione}).subscribe()
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
