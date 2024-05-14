import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProdottiComponent } from './add-prodotti.component';

describe('AddProdottiComponent', () => {
  let component: AddProdottiComponent;
  let fixture: ComponentFixture<AddProdottiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProdottiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddProdottiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
