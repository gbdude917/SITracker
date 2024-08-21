import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpiritCardComponent } from './spirit-card.component';

describe('SpiritCardComponent', () => {
  let component: SpiritCardComponent;
  let fixture: ComponentFixture<SpiritCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpiritCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpiritCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
