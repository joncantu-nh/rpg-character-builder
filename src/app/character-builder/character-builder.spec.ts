import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';

import { CharacterBuilderComponent } from './character-builder.component';

describe('CharacterBuilderComponent', () => {
  let component: CharacterBuilderComponent;
  let fixture: ComponentFixture<CharacterBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterBuilderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should support two-way binding for the character name', async () => {
    const nameInput: HTMLInputElement =
      fixture.nativeElement.querySelector(
        '[data-testid="character-name"]',
      );

    nameInput.value = 'Aragorn';
    nameInput.dispatchEvent(new Event('input'));

    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.name).toBe('Aragorn');
  });

  it('should not add a character when the form is invalid', async () => {
    component.name = '';
    component.characterClass = '';

    fixture.detectChanges();
    await fixture.whenStable();

    const form = fixture.debugElement
      .query(By.directive(NgForm))
      .injector.get(NgForm);

    component.addCharacter(form);

    expect(component.characters.length).toBe(0);
  });

  it('should store a valid character with calculated starting hit points', async () => {
    component.name = 'Aragorn';
    component.characterClass = 'Ranger';
    component.level = 5;
    component.veteran = true;

    fixture.detectChanges();
    await fixture.whenStable();

    const form = fixture.debugElement
      .query(By.directive(NgForm))
      .injector.get(NgForm);

    component.addCharacter(form);

    expect(component.characters.length).toBe(1);

    const character = component.characters[0];

    expect(character.name).toBe('Aragorn');
    expect(character.characterClass).toBe('Ranger');
    expect(character.level).toBe(5);
    expect(character.veteran).toBe(true);
    expect(character.startingHitPoints).toBe(15);
  });

  it('should reset the form model after successful submission', async () => {
    component.name = 'Gandalf';
    component.characterClass = 'Wizard';
    component.level = 10;
    component.veteran = true;

    fixture.detectChanges();
    await fixture.whenStable();

    const form = fixture.debugElement
      .query(By.directive(NgForm))
      .injector.get(NgForm);

    component.addCharacter(form);

    expect(component.name).toBe('');
    expect(component.characterClass).toBe('');
    expect(component.level).toBe(1);
    expect(component.veteran).toBe(false);
  });
});
