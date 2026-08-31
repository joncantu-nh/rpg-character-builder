import { Component } from '@angular/core';

@Component({
  selector: 'app-ability-roller',
  standalone: true,
  template: `
    <section>
      <h2>Ability Score Roller</h2>

      <button
        type="button"
        data-testid="roll-button">
        Roll ability
      </button>

      <p data-testid="roll-result">0</p>
    </section>
  `
})
export class AbilityRollerComponent {
  result = 0;

  rollAbility(): void {
    // Implemented during GREEN phase.
  }
}
