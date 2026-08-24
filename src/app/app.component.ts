import { Component } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <header>
      <h1>RPG Character Builder</h1>

      <nav aria-label="Primary navigation">
        <a
          routerLink="/"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }">
          Home
        </a>

        <a
          routerLink="/classes"
          routerLinkActive="active">
          Classes
        </a>

        <a
          routerLink="/about"
          routerLinkActive="active">
          About
        </a>
      </nav>
    </header>

    <main>
      <router-outlet />
    </main>

    <footer>
      <p>WEB 425 · RPG Character Builder</p>
    </footer>
  `
})

export class AppComponent {}
