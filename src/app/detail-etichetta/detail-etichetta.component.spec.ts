import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEtichettaComponent } from './detail-etichetta.component';

describe('DetailEtichettaComponent', () => {
  let component: DetailEtichettaComponent;
  let fixture: ComponentFixture<DetailEtichettaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailEtichettaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailEtichettaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
