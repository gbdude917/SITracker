import { Component } from '@angular/core';
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
export class SpiritsComponent {
  spirits$: Observable<Spirit[]> = this.api.getSpirits();

  constructor(private api: ApiService) {}

  trackById(index: number, spirit: Spirit): string {
    return spirit.id;
  }
}
