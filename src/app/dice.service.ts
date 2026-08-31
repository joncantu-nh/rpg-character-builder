import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiceService {

  roll(sides: number): number {
    if (!Number.isInteger(sides) || sides < 2) {
      throw new RangeError(
        'Dice sides must be an integer greater than or equal to 2.'
      );
    }

    return Math.floor(Math.random() * sides) + 1;
  }
}
