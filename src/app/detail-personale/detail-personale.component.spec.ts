import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPersonaleComponent } from './detail-personale.component';

describe('DetailPersonaleComponent', () => {
  let component: DetailPersonaleComponent;
  let fixture: ComponentFixture<DetailPersonaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailPersonaleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailPersonaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
