import { Component, inject, TemplateRef } from '@angular/core';
import { ReportService } from '../services/report.service';
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { Report } from '../services/report.service';
import { Etichetta, EtichetteService } from '../services/etichette.service';
import { PersonaleService , Personale} from '../services/personale.service';
import { MessageService } from '../services/message.service';
@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrl: './add-report.component.css',
})
export class AddReportComponent {
  etichetta?: number;
  data?: Date;
  dettagli?: string;
  personale?: string;
  spostamento?: string;
  spostato?: boolean;
  labels: Etichetta[] = [];
  private modalService = inject(NgbModal);
  closeResult = '';
  constructor(
    private reportService: ReportService,
    private labelService: EtichetteService,
    private staffMemberService: PersonaleService,
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

  addReport(): void {
    
    if(this.spostamento === "" || this.spostamento === null || this.spostamento === undefined){
      this.spostato = undefined;
    } else{
      this.spostato = false;
    }
    if(this.spostamento === "") this.spostamento = undefined
    this.reportService
      .addReport({
        np: -1,
        data: this.data,
        dettagli: this.dettagli,
        etichetta: this.etichetta,
        personale: this.personale,
        tipo: this.spostamento,
        spostato: this.spostato
      })
      .subscribe(successo => console.log("successo"), errore => this.messageService.add("Errore inserimento."));
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

  closeAllModals(){
    this.modalService.dismissAll()
  }


}
