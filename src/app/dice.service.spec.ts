import { TestBed } from '@angular/core/testing';
import { DiceService } from './dice.service';

describe('DiceService', () => {
  let service: DiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.inject(DiceService);
  });

  it('should return an integer inside the inclusive dice range', () => {
    const sides = 6;

    for (let i = 0; i < 100; i++) {
      const result = service.roll(sides);

      expect(Number.isInteger(result)).toBeTrue();
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(sides);
    }
  });

  it('should throw RangeError for invalid dice sizes', () => {
    expect(() => service.roll(1)).toThrowError(RangeError);
    expect(() => service.roll(0)).toThrowError(RangeError);
    expect(() => service.roll(-6)).toThrowError(RangeError);
    expect(() => service.roll(2.5)).toThrowError(RangeError);
  });
});
