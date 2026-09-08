import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

export interface Character {
  name: string;
  characterClass: string;
  level: number;
  veteran: boolean;
  startingHitPoints: number;
}

@Component({
  selector: 'app-character-builder',
  imports: [FormsModule],
  standalone: true,
  template: `
    <form
      data-testid="character-form"
      #characterForm="ngForm"
      (ngSubmit)="addCharacter(characterForm)"
    >
      <label for="name">Name:</label>
      <input
        data-testid="character-name"
        type="text"
        id="name"
        name="name"
        [(ngModel)]="name"
        required
      />

      <label for="characterClass">Class:</label>
      <input
        data-testid="character-class"
        type="text"
        id="characterClass"
        name="characterClass"
        [(ngModel)]="characterClass"
        required
      />

      <label for="level">Level:</label>
      <input
        data-testid="character-level"
        type="number"
        id="level"
        name="level"
        [(ngModel)]="level"
        min="1"
        max="20"
        step="1"
        required
      />

      <label for="veteran">Veteran:</label>
      <input
        data-testid="character-veteran"
        type="checkbox"
        id="veteran"
        name="veteran"
        [(ngModel)]="veteran"
      />

      <button data-testid="character-submit" type="submit" [disabled]="characterForm.invalid">
        Create Character
      </button>
    </form>

    <div>
      <h2>Created Characters</h2>
      <ul data-testid="character-list">
        @for (character of characters; track $index) {
          <li>
            {{ character.name }} - {{ character.characterClass }} - Level: {{ character.level }} -
            Veteran: {{ character.veteran ? 'Yes' : 'No' }} - Starting HP:
            {{ character.startingHitPoints }}
          </li>
        }
      </ul>
    </div>
  `,
  styleUrl: './character-builder.css',
})
export class CharacterBuilderComponent {
  name: string = '';
  characterClass: string = '';
  level: number = 1;
  veteran: boolean = false;

  public characters: Character[] = [];

  addCharacter(form: NgForm): void {
    if (form.invalid || !Number.isInteger(this.level) || this.level < 1 || this.level > 20) {
      return;
    }

    const character: Character = {
      name: this.name,
      characterClass: this.characterClass,
      level: this.level,
      veteran: this.veteran,
      startingHitPoints: 10 + this.level,
    };

    this.characters.push(character);

    form.resetForm({
      name: '',
      characterClass: '',
      level: 1,
      veteran: false,
    });

    this.name = '';
    this.characterClass = '';
    this.level = 1;
    this.veteran = false;
  }
}
