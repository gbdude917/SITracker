import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdversariesComponent } from './adversaries.component';

describe('AdversariesComponent', () => {
  let component: AdversariesComponent;
  let fixture: ComponentFixture<AdversariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdversariesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdversariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
