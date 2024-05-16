import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailLabelComponent } from './detail-label.component';

describe('DetailLabelComponent', () => {
  let component: DetailLabelComponent;
  let fixture: ComponentFixture<DetailLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailLabelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
