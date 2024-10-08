import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Spirit } from '../../spirit.module';

@Component({
  selector: 'app-spirit-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './spirit-card.component.html',
  styleUrl: './spirit-card.component.css',
})
export class SpiritCardComponent implements OnInit {
  @Input({ required: true }) spirit!: Spirit;

  id!: string;
  name!: string;
  pathname!: string;
  image!: string;

  ngOnInit(): void {
    const { id, name, pathname, image } = this.spirit;

    this.id = id;
    this.name = name;
    this.pathname = pathname;
    this.image = image;
  }
}
