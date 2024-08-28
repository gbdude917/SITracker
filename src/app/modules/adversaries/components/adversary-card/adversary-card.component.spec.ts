import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdversaryCardComponent } from './adversary-card.component';

describe('AdversaryCardComponent', () => {
  let component: AdversaryCardComponent;
  let fixture: ComponentFixture<AdversaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdversaryCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdversaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
