import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  template: `
    <main class="shell">
      <h1 class="shell__title">Applications</h1>
      <p class="shell__hint">
        This is your starting point. Build the filterable, high-performance list
        here — see the <strong>README</strong> for the task.
      </p>
      <p class="shell__hint">
        The data is ready to use: inject <code>ApplicationsService</code>
        (<code>src/app/applications/</code>) and call <code>getApplications()</code>.
        Delete this placeholder when you start.
      </p>
    </main>
  `,
  styleUrl: './app.scss',
})
export class App {}
