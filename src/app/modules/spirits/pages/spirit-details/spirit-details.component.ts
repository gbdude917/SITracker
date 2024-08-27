import { Component, OnInit } from '@angular/core';
import { Spirit } from '../../spirit.module';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../core/http/api.service';

@Component({
  selector: 'app-spirit-details',
  standalone: true,
  imports: [],
  templateUrl: './spirit-details.component.html',
  styleUrl: './spirit-details.component.css',
})
export class SpiritDetailsComponent implements OnInit {
  spirit!: Spirit;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    const spiritName = this.route.snapshot.paramMap.get('name');
    this.loadSpiritData(spiritName!);
  }

  private loadSpiritData(spiritName: string): void {
    this.apiService.getSpiritByPathname(spiritName).subscribe((data) => {
      this.spirit = data;
    });
  }
}
