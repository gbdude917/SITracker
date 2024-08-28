import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdversaryDetailsComponent } from './adversary-details.component';

describe('AdversaryDetailsComponent', () => {
  let component: AdversaryDetailsComponent;
  let fixture: ComponentFixture<AdversaryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdversaryDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdversaryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
