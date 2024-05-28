import { Component, inject, TemplateRef, Input, Output, EventEmitter } from '@angular/core';
import { Report } from '../services/report.service';
import { ReportService } from '../services/report.service';
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { EtichetteService, Etichetta } from '../services/etichette.service';
import { Personale, PersonaleService } from '../services/personale.service';
import { MessageService } from '../services/message.service';
@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrl: './edit-report.component.css',
})
export class EditReportComponent {
  etichetta?: number;
  data?: Date;
  dettagli?: string;
  personale?: string;
  constructor(
    private reportService: ReportService,
    private labelService: EtichetteService,
    private staffMemberService: PersonaleService,
    private messageService : MessageService
  ) {}
  @Input() report?: Report;

  tempReport?: Report;
  private modalService = inject(NgbModal);
  closeResult = '';

  open(content: TemplateRef<any>) {
    this.initInput()
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
  editReport(): void {
    this.modalService.dismissAll();
    console.log({
        np: this.report?.np,
        data: this.data,
        dettagli: this.dettagli,
        etichetta: this.etichetta,
        personale: this.personale,
      })
    this.reportService
      .updateReport({
        np: this.report?.np,
        data: this.data,
        dettagli: this.dettagli,
        etichetta: this.etichetta,
        personale: this.personale,
        oldEtichetta: this.report?.etichetta
      })
      .subscribe(successo => {console.log("ok");}, errore => this.messageService.add("Errore modifica."));
  }
  deleteReport(): void {
    this.modalService.dismissAll();
    this.reportService
      .deleteReport(this.report?.np ?? -1, this.report?.etichetta ?? -1)
      .subscribe(successo => console.log("ok"), errore => this.messageService.add("Errore eliminazione."));
  }
  labels: Etichetta[] = [];
  private getLabels(): void {
    this.labelService
      .readAllEtichette()
      .subscribe((labels) => (this.labels = labels), errore => this.messageService.add("Errore caricamento etichette."));
  }
  staffMembers: Personale[] = []
  private getStaffMembers(): void {
    this.staffMemberService.getAllPersonale()
    .subscribe(staffMembers => (this.staffMembers = staffMembers), errore => this.messageService.add("Errore caricamento personale."))
  }
  ngOnInit(): void {
    this.getLabels();
    this.getStaffMembers();
  }
  initInput(): void {
    this.etichetta = this.report?.etichetta;
    this.data = this.report?.data;
    this.dettagli= this.report?.dettagli;
    this.personale = this.report?.personale;
  }
  closeAllModal(){
    this.modalService.dismissAll()
  }
}
