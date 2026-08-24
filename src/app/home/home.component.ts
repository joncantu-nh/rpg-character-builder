import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <section data-testid="home-page">
      <h2>Build the Hero Behind Your Next Adventure</h2>

      <h3>Design a Character</h3>
      <p>{{ introduction }}</p>

      <h4>Character-Building Features</h4>
      <ul data-testid="character-features">
        <li>Browse character classes</li>
        <li>Roll ability scores</li>
        <li>Create and save a character profile</li>
      </ul>
    </section>
  `
})
export class HomeComponent {
  public introduction: string =
    'Choose a class, establish abilities, and record a character profile.';
}
