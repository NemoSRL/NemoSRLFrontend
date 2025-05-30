import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLabelComponent } from './edit-label.component';

describe('EditLabelComponent', () => {
  let component: EditLabelComponent;
  let fixture: ComponentFixture<EditLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditLabelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
