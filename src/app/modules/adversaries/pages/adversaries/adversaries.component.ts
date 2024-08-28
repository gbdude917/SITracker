import { Component, OnInit } from '@angular/core';
import { AdversaryCardComponent } from '../../components/adversary-card/adversary-card.component';
import { Adversary } from '../../adversary.module';
import { ApiService } from '../../../../core/http/api.service';

@Component({
  selector: 'app-adversaries',
  standalone: true,
  imports: [AdversaryCardComponent],
  templateUrl: './adversaries.component.html',
  styleUrl: './adversaries.component.css',
})
export class AdversariesComponent implements OnInit {
  adversaries!: Adversary[];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getAdversaries().subscribe((adversaries) => {
      this.adversaries = adversaries;
    });
  }
}
