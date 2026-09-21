import { TestBed } from '@angular/core/testing';

import { CharacterProfileComponent } from './character-profile.component';

describe('CharacterProfileComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterProfileComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture =
      TestBed.createComponent(
        CharacterProfileComponent,
      );

    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });

  it('should be invalid in its initial state', () => {
    const fixture =
      TestBed.createComponent(
        CharacterProfileComponent,
      );

    const component = fixture.componentInstance;

    expect(component.profileForm.valid).toBeFalse();
  });

  it('should create one skill control for each skill option', () => {
    const fixture =
      TestBed.createComponent(
        CharacterProfileComponent,
      );

    const component = fixture.componentInstance;

    expect(
      component.skillsArray.length,
    ).toBe(component.skillOptions.length);
  });

  it('should be valid when all required values are supplied', () => {
    const fixture =
      TestBed.createComponent(
        CharacterProfileComponent,
      );

    const component = fixture.componentInstance;

    component.profileForm.controls.backstory.setValue(
      'Raised near the old forest.',
    );

    component.profileForm.controls.alignment.setValue(
      'neutral-good',
    );

    component.skillsArray.at(0).setValue(true);

    component.profileForm.controls.homeland.setValue(
      'northreach',
    );

    expect(component.profileForm.valid).toBeTrue();
  });

  it('should transform selected skill booleans into skill labels', () => {
    const fixture =
      TestBed.createComponent(
        CharacterProfileComponent,
      );

    const component = fixture.componentInstance;

    component.profileForm.controls.backstory.setValue(
      'Raised near the old forest.',
    );

    component.profileForm.controls.alignment.setValue(
      'neutral-good',
    );

    component.skillsArray.at(0).setValue(true);
    component.skillsArray.at(2).setValue(true);

    component.profileForm.controls.homeland.setValue(
      'northreach',
    );

    component.saveProfile();

    expect(component.profiles.length).toBe(1);

    expect(component.profiles[0].skills).toEqual([
      'Arcana',
      'Survival',
    ]);
  });

  it('should render stored profile data', () => {
    const fixture =
      TestBed.createComponent(
        CharacterProfileComponent,
      );

    const component = fixture.componentInstance;

    component.profileForm.controls.backstory.setValue(
      'Raised near the old forest.',
    );

    component.profileForm.controls.alignment.setValue(
      'neutral-good',
    );

    component.skillsArray.at(0).setValue(true);
    component.skillsArray.at(2).setValue(true);

    component.profileForm.controls.homeland.setValue(
      'northreach',
    );

    component.saveProfile();

    fixture.detectChanges();

    const profileList: HTMLElement =
      fixture.nativeElement.querySelector(
        '[data-testid="profile-list"]',
      );

    expect(profileList.textContent).toContain(
      'Northreach',
    );

    expect(profileList.textContent).toContain(
      'Neutral Good',
    );

    expect(profileList.textContent).toContain(
      'Arcana',
    );

    expect(profileList.textContent).toContain(
      'Survival',
    );

    expect(profileList.textContent).toContain(
      'Raised near the old forest.',
    );
  });
});
