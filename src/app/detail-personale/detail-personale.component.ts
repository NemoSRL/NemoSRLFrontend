
import { Subscription } from 'rxjs';
import { MessageService } from '../services/message.service';
import { Personale, PersonaleService } from '../services/personale.service';
import { Component, inject, TemplateRef, Input, ViewChild } from '@angular/core';

import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { PersonaleDetailDataService } from '../services/event.service';
@Component({
  selector: 'app-detail-personale',
  templateUrl: './detail-personale.component.html',
  styleUrl: './detail-personale.component.css'
})
export class DetailPersonaleComponent {
  constructor(private personaleService: PersonaleService, private messageService : MessageService, private personaleDetailDataService : PersonaleDetailDataService) {}
  personaleId?: string;
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
  @ViewChild('content', { static: true }) content?: TemplateRef<any>;
  private param1Subscription?: Subscription;
  ngOnInit(): void {
    this.param1Subscription = this.personaleDetailDataService.param1Observable$.subscribe(
      (param: any) => {
        this.personaleId=param
        this.personaleService
        .getPersonaleById(this.personaleId!)
        .subscribe((personale) => {this.personale = personale;}, errore => this.messageService.add("Errore caricamento dati personale."));
        this.open(this.content!)
      })
    
  }
    
      
    
}
