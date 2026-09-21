import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import {
  CharacterProfile,
  ProfileOption,
} from '../models/character-profile';

type CharacterProfileForm = FormGroup<{
  backstory: FormControl<string>;
  alignment: FormControl<string>;
  skills: FormArray<FormControl<boolean>>;
  homeland: FormControl<string>;
}>;

const atLeastOneSkillValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const skills = control as FormArray<FormControl<boolean>>;

  return skills.controls.some((skill) => skill.value)
    ? null
    : { requiredSkill: true };
};

@Component({
  selector: 'app-character-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="w4-container">
      <h2>Character Profile</h2>

      <div class="w4-grid w4-grid-2">
        <form
          data-testid="profile-form"
          [formGroup]="profileForm"
          (ngSubmit)="saveProfile()"
          class="w4-form"
        >
          <div class="w4-field">
            <label for="backstory">Backstory *</label>

            <textarea
              data-testid="backstory"
              id="backstory"
              rows="6"
              formControlName="backstory"
            ></textarea>

            @if (
              profileForm.controls.backstory.touched &&
              profileForm.controls.backstory.hasError('required')
            ) {
              <small class="w4-error">
                Backstory is required.
              </small>
            }
          </div>

          <fieldset
            data-testid="alignment-group"
            class="w4-field"
          >
            <legend>Alignment *</legend>

            @for (
              option of alignmentOptions;
              track option.id
            ) {
              <label
                [for]="'alignment-' + option.id"
                class="w4-choice"
              >
                <input
                  type="radio"
                  [id]="'alignment-' + option.id"
                  [value]="option.id"
                  formControlName="alignment"
                />

                <span>{{ option.label }}</span>
              </label>
            }

            @if (
              profileForm.controls.alignment.touched &&
              profileForm.controls.alignment.hasError('required')
            ) {
              <small class="w4-error">
                Alignment is required.
              </small>
            }
          </fieldset>

          <fieldset
            data-testid="skill-options"
            formArrayName="skills"
            class="w4-field"
          >
            <legend>Skills *</legend>

            @for (
              control of skillsArray.controls;
              track control;
              let i = $index
            ) {
              <label
                [for]="'skill-' + skillOptions[i].id"
                class="w4-choice"
              >
                <input
                  type="checkbox"
                  [id]="'skill-' + skillOptions[i].id"
                  [formControlName]="i"
                />

                <span>{{ skillOptions[i].label }}</span>
              </label>
            }

            @if (
              skillsArray.touched &&
              skillsArray.hasError('requiredSkill')
            ) {
              <small class="w4-error">
                Select at least one skill.
              </small>
            }
          </fieldset>

          <div class="w4-field">
            <label for="homeland">Homeland *</label>

            <select
              data-testid="homeland"
              id="homeland"
              formControlName="homeland"
            >
              <option value="" disabled>
                Select a homeland
              </option>

              @for (
                option of homelandOptions;
                track option.id
              ) {
                <option [value]="option.id">
                  {{ option.label }}
                </option>
              }
            </select>

            @if (
              profileForm.controls.homeland.touched &&
              profileForm.controls.homeland.hasError('required')
            ) {
              <small class="w4-error">
                Homeland is required.
              </small>
            }
          </div>

          <button
            data-testid="profile-submit"
            type="submit"
            class="w4-btn w4-btn-primary"
            [disabled]="profileForm.invalid"
          >
            Save Profile
          </button>
        </form>

        <section
          data-testid="profile-list"
          aria-labelledby="saved-profiles-heading"
        >
          <h3 id="saved-profiles-heading">
            Saved Profiles
          </h3>

          @if (profiles.length === 0) {
            <p>No profiles have been saved yet.</p>
          } @else {
            @for (profile of profiles; track $index) {
              <article class="w4-card">
                <p>
                  <strong>Homeland:</strong>
                  {{ homelandLabel(profile.homeland) }}
                </p>

                <p>
                  <strong>Alignment:</strong>
                  {{ alignmentLabel(profile.alignment) }}
                </p>

                <p>
                  <strong>Skills:</strong>
                  {{ profile.skills.join(', ') }}
                </p>

                <p>
                  <strong>Backstory:</strong>
                </p>

                <p>{{ profile.backstory }}</p>
              </article>
            }
          }
        </section>
      </div>
    </section>
  `,
})
export class CharacterProfileComponent {
  skillOptions: ProfileOption[] = [
    {
      id: 'arcana',
      label: 'Arcana',
    },
    {
      id: 'athletics',
      label: 'Athletics',
    },
    {
      id: 'survival',
      label: 'Survival',
    },
    {
      id: 'stealth',
      label: 'Stealth',
    },
  ];

  alignmentOptions: ProfileOption[] = [
    {
      id: 'lawful-good',
      label: 'Lawful Good',
    },
    {
      id: 'neutral-good',
      label: 'Neutral Good',
    },
    {
      id: 'chaotic-good',
      label: 'Chaotic Good',
    },
  ];

  homelandOptions: ProfileOption[] = [
    {
      id: 'northreach',
      label: 'Northreach',
    },
    {
      id: 'ironvale',
      label: 'Ironvale',
    },
    {
      id: 'silverwood',
      label: 'Silverwood',
    },
  ];

  profiles: CharacterProfile[] = [];

  profileForm: CharacterProfileForm;

  constructor(private formBuilder: FormBuilder) {
    this.profileForm = this.formBuilder.group({
      backstory: this.formBuilder.nonNullable.control(
        '',
        Validators.required,
      ),

      alignment: this.formBuilder.nonNullable.control(
        '',
        Validators.required,
      ),

      skills: this.formBuilder.array(
        this.skillOptions.map(() =>
          this.formBuilder.nonNullable.control(false),
        ),
        {
          validators: [atLeastOneSkillValidator],
        },
      ),

      homeland: this.formBuilder.nonNullable.control(
        '',
        Validators.required,
      ),
    });
  }

  get skillsArray(): FormArray<FormControl<boolean>> {
    return this.profileForm.controls.skills;
  }

  saveProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      this.skillsArray.markAsTouched();
      return;
    }

    const rawValue = this.profileForm.getRawValue();

    const selectedSkills = this.skillOptions
      .filter(
        (_skill, index) => rawValue.skills[index],
      )
      .map((skill) => skill.label);

    const profile: CharacterProfile = {
      backstory: rawValue.backstory,
      alignment: rawValue.alignment,
      skills: selectedSkills,
      homeland: rawValue.homeland,
    };

    this.profiles = [
      ...this.profiles,
      profile,
    ];

    this.resetForm();
  }

  alignmentLabel(id: string): string {
    return (
      this.alignmentOptions.find(
        (option) => option.id === id,
      )?.label ?? id
    );
  }

  homelandLabel(id: string): string {
    return (
      this.homelandOptions.find(
        (option) => option.id === id,
      )?.label ?? id
    );
  }

  private resetForm(): void {
    this.profileForm.controls.backstory.setValue('');
    this.profileForm.controls.alignment.setValue('');
    this.profileForm.controls.homeland.setValue('');

    this.skillsArray.controls.forEach(
      (control) => control.setValue(false),
    );

    this.profileForm.markAsPristine();
    this.profileForm.markAsUntouched();
    this.skillsArray.markAsUntouched();
  }
}
