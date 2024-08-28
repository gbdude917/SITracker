import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../core/http/api.service';
import { Observable } from 'rxjs';
import { SpiritCardComponent } from '../../components/spirit-card/spirit-card.component';
import { Spirit } from '../../spirit.module';

@Component({
  selector: 'app-spirits',
  standalone: true,
  imports: [SpiritCardComponent, CommonModule],
  templateUrl: './spirits.component.html',
  styleUrl: './spirits.component.css',
})
export class SpiritsComponent implements OnInit {
  spirits!: Spirit[];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getSpirits().subscribe((spirits) => {
      this.spirits = spirits;
    });
  }

  trackById(index: number, spirit: Spirit): string {
    return spirit.id;
  }
}
