import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CharacterClass } from '../models/character-class';

@Component({
  selector: 'app-classes',
  imports: [RouterLink],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css',
})
export class ClassesComponent {
  readonly characterClasses: CharacterClass[] = [
    {
      id: 'fighter',
      name: 'Fighter',
      description: 'A durable combat specialist suited to close-range encounters.'
    },
    {
      id: 'wizard',
      name: 'Wizard',
      description: 'A master of arcane magic and powerful spells.'
    },
    {
      id: 'rogue',
      name: 'Rogue',
      description: 'A specialist in stealth, agility, and precision.'
    }
  ];
}
