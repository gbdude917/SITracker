import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/http/api.service';
import { ActivatedRoute } from '@angular/router';
import { Adversary } from '../../adversary.module';

@Component({
  selector: 'app-adversary-details',
  standalone: true,
  imports: [],
  templateUrl: './adversary-details.component.html',
  styleUrl: './adversary-details.component.css',
})
export class AdversaryDetailsComponent implements OnInit {
  adversary!: Adversary;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    const adversaryName = this.route.snapshot.paramMap.get('name');
    this.loadAdversaryData(adversaryName!);
  }

  private loadAdversaryData(adversaryName: string): void {
    this.apiService.getAdversaryByPathname(adversaryName).subscribe((data) => {
      this.adversary = data;
    });
  }
}
