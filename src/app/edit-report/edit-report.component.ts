import { Component, inject, TemplateRef, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
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
import { popolato } from '../checker';
import { Subscription } from 'rxjs';
import { ReportEditDataService } from '../services/event.service';
@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrl: './edit-report.component.css',
})
export class EditReportComponent {
  @ViewChild('content', { static: true }) content?: TemplateRef<any>;
  
  etichetta?: number;
  data?: Date;
  dettagli?: string;
  personale?: string;
  constructor(
    private reportService: ReportService,
    private labelService: EtichetteService,
    private staffMemberService: PersonaleService,
    private messageService : MessageService,
    private editDataService : ReportEditDataService
  ) {}
  report?: Report;
  @Output() reportModifed = new EventEmitter<void>();
  tempReport?: Report;
  private modalService = inject(NgbModal);
  closeResult = '';

  open(content: TemplateRef<any>, templateName : string) {
    /*if(templateName === "main"){
      this.ngOnInit();
      
    }*/
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
  spostamento?: string;
  spostato?: boolean;
  editReport(): void {
    if(!(popolato(this.personale) && popolato(this.dettagli) && popolato(this.data) && popolato(this.etichetta))) {
      alert("Ti sei dimenticato qualche campo!")
      return
    } 
    
    
    if(this.spostamento === "" || this.spostamento === null){
      
      this.spostato = undefined;
    } 
    if(this.spostamento === "") this.spostamento = undefined
    this.reportService
      .updateReport({
        np: this.report?.np,
        etichetta: this.report?.etichetta,
        data: this.data,
        dettagli: this.dettagli,
        personale: this.personale,
        tipo:this.spostamento,
        spostato:this.spostato,
      })
      .subscribe(successo => {
        console.log("ok");
        setTimeout(() => {
          this.reportModifed.emit(); // Emitting the event after a delay
        }, 1000); // Delay of 1 seconds
      }, errore => this.messageService.add("Errore modifica."));
      this.modalService.dismissAll();
  }
  deleteReport(): void {
    this.modalService.dismissAll();
    this.reportService
      .deleteReport(this.report?.np ?? -1, this.report?.etichetta ?? -1)
      .subscribe(successo => {
        console.log("ok");
        setTimeout(() => {
          this.reportModifed.emit(); // Emitting the event after a delay
        }, 1000); // Delay of 1 seconds
      }, errore => this.messageService.add("Errore eliminazione."));
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
  private param1Subscription?: Subscription;
  ngOnInit(): void {
    
    
    this.param1Subscription = this.editDataService.param1Observable$.subscribe(
      (param: any) => {
        this.report = param as Report;
        this.initInput()
        this.getLabels();
      
        
        this.getStaffMembers();
        this.open(this.content!, "main")
      }
    );
  }
  initInput(): void {
    this.etichetta = this.report?.etichetta;
    this.data = this.report?.data;
    this.dettagli= this.report?.dettagli;
    this.personale = this.report?.personale;
    this.spostamento = this.report?.tipo
    this.onSpostamentoChange(this.report?.tipo)
  }
  closeAllModal(){
    this.modalService.dismissAll()
  }
  spostatoDiv?: boolean
  onSpostamentoChange(spostamento?: string) {
    if(spostamento==="" || spostamento===null){
      this.spostatoDiv=false;
      this.spostato=false;
    } else{
      this.spostatoDiv=true
    }
  }


}
