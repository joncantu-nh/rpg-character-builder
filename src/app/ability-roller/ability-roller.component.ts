import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DiceService } from '../dice.service';

@Component({
  selector: 'app-ability-roller',
  standalone: true,
  templateUrl: './ability-roller.component.html',
  styleUrl: './ability-roller.component.css'
})
export class AbilityRollerComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly diceService = inject(DiceService);

  result: number | null = null;
  sides = 6;

  rollAbility(): void {
    const rawSides =
      this.route.snapshot.paramMap.get('sides');

    const parsedSides = Number(rawSides);

    if (
      rawSides === null ||
      !Number.isInteger(parsedSides) ||
      parsedSides < 2
    ) {
      this.sides = 6;

      console.warn(
        'Invalid dice size supplied. Using d6.'
      );
    } else {
      this.sides = parsedSides;
    }

    this.result = this.diceService.roll(this.sides);
  }
}
