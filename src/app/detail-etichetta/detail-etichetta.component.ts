

import { Component, inject, TemplateRef, Input } from '@angular/core';
import { Report } from '../report.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { etichette } from '../etichette.service';
import { EtichetteService } from '../etichette.service';
@Component({
  selector: 'app-detail-etichetta',
  templateUrl: './detail-etichetta.component.html',
  styleUrl: './detail-etichetta.component.css'
})
export class DetailEtichettaComponent {


  
  constructor(private EtichetteService : EtichetteService){}
  @Input() idEtichetta?: number
  @Input() etichetta?: etichette
  tempProd?: etichette
  private modalService = inject(NgbModal);
  closeResult = '';

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
  getEtichetta() : void {
		
    this.EtichetteService.readEtichettaById(this.idEtichetta ?? -1)
      .subscribe(etichetta => this.etichetta = etichetta);
    
}

ngOnInit(): void {
  this.getEtichetta();
}
  
  }
