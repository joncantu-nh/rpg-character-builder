import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <header>
      <h1>RPG Character Builder</h1>

      <nav aria-label="Primary navigation">
        <a href="/">Home</a>
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
