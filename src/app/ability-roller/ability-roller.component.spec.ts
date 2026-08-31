import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  convertToParamMap
} from '@angular/router';

import { AbilityRollerComponent } from './ability-roller.component';
import { DiceService } from '../dice.service';

describe('AbilityRollerComponent', () => {
  let fixture: ComponentFixture<AbilityRollerComponent>;
  let component: AbilityRollerComponent;
  let diceService: jasmine.SpyObj<DiceService>;

  let routeSides: string | null;

  beforeEach(async () => {
    routeSides = '20';

    diceService = jasmine.createSpyObj<DiceService>(
      'DiceService',
      ['roll']
    );

    await TestBed.configureTestingModule({
      imports: [AbilityRollerComponent],
      providers: [
        {
          provide: DiceService,
          useValue: diceService
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (name: string) =>
                  name === 'sides' ? routeSides : null
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AbilityRollerComponent);
    component = fixture.componentInstance;
  });

  it('should call DiceService.roll with the routed number of sides', () => {
    diceService.roll.and.returnValue(14);

    component.rollAbility();

    expect(diceService.roll).toHaveBeenCalledOnceWith(20);
    expect(component.result).toBe(14);
  });

  it('should use d6 and write one warning for invalid route input', () => {
    routeSides = 'invalid';

    diceService.roll.and.returnValue(4);

    const warnSpy = spyOn(console, 'warn');

    component.rollAbility();

    expect(diceService.roll).toHaveBeenCalledOnceWith(6);
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(component.result).toBe(4);
  });

  it('should display the rolled result in the DOM', () => {
    routeSides = '6';

    diceService.roll.and.returnValue(5);

    fixture.detectChanges();

    const button =
      fixture.nativeElement.querySelector(
        '[data-testid="roll-button"]'
      ) as HTMLButtonElement;

    button.click();

    fixture.detectChanges();

    const result =
      fixture.nativeElement.querySelector(
        '[data-testid="roll-result"]'
      ) as HTMLElement;

    expect(result.textContent).toContain('5');
  });
});
