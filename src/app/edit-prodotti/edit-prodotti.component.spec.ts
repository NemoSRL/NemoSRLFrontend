import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProdottiComponent } from './edit-prodotti.component';

describe('EditProdottiComponent', () => {
  let component: EditProdottiComponent;
  let fixture: ComponentFixture<EditProdottiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditProdottiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditProdottiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
