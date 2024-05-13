import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdottiDetailComponent } from './prodotti-detail.component';

describe('ProdottiDetailComponent', () => {
  let component: ProdottiDetailComponent;
  let fixture: ComponentFixture<ProdottiDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProdottiDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProdottiDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
