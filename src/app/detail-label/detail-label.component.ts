import { Component, inject, TemplateRef, Input, ViewChild } from '@angular/core';
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { Etichetta, EtichetteService } from '../services/etichette.service';
import { MessageService } from '../services/message.service';
import { LabelDetailDataService } from '../services/event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail-label',
  templateUrl: './detail-label.component.html',
  styleUrl: './detail-label.component.css',
})
export class DetailLabelComponent {
  @ViewChild('content', { static: true }) content?: TemplateRef<any>;
  constructor(private etichetteService: EtichetteService, private messageService : MessageService, private labelDetailDataService : LabelDetailDataService) {}
  etichetta?: Etichetta;
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
  private param1Subscription?: Subscription;
  ngOnInit(): void {
    this.param1Subscription = this.labelDetailDataService.param1Observable$.subscribe(
      (param: any) => {
        this.etichettaId=param
      this.etichetteService
        .readEtichettaById(this.etichettaId ?? 0)
        .subscribe((etichette) => (this.etichetta = etichette), errore => this.messageService.add("Errore caricamento etichette."));
        this.open(this.content!)
      })
  }

}
