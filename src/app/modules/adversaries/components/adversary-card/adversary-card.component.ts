import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Adversary } from '../../adversary.module';

@Component({
  selector: 'app-adversary-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './adversary-card.component.html',
  styleUrl: './adversary-card.component.css',
})
export class AdversaryCardComponent implements OnInit {
  @Input({ required: true }) adversary!: Adversary;

  id!: number;
  name!: string;
  pathname!: string;
  flag!: string;

  ngOnInit(): void {
    const { id, name, pathname, flag } = this.adversary;

    this.id = id;
    this.name = name;
    this.pathname = pathname;
    this.flag = flag;
  }
}
