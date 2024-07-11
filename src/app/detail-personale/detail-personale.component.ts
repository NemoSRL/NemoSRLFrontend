
import { MessageService } from '../services/message.service';
import { Personale, PersonaleService } from '../services/personale.service';
import { Component, inject, TemplateRef, Input } from '@angular/core';

import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-detail-personale',
  templateUrl: './detail-personale.component.html',
  styleUrl: './detail-personale.component.css'
})
export class DetailPersonaleComponent {
  constructor(private personaleService: PersonaleService, private messageService : MessageService) {}
  @Input() personaleId?: string;
  personale?: Personale;

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
  ngOnInit(): void {
    this.personaleService
      .getPersonaleById(this.personaleId!)
      .subscribe((personale) => {this.personale = personale;}, errore => this.messageService.add("Errore caricamento dati personale."));
  }
}
