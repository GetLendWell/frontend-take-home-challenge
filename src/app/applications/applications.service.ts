import { Injectable } from '@angular/core';
import { Observable, delay, of, switchMap, throwError, timer } from 'rxjs';
import { Application, ApplicationStatus } from './application.model';

const STATUSES: ApplicationStatus[] = ['draft', 'submitted', 'approved', 'rejected'];
const NAMES = ['Aoife Byrne', 'Liam Kelly', 'Saoirse Nolan', 'Conor Walsh', 'Niamh Doyle', 'Cian Murphy'];

export interface GetApplicationsOptions {
  count?: number;
  fail?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ApplicationsService {
  /**
   * Returns a large list of applications asynchronously, simulating a slow
   * network call. Pass `{ fail: true }` to exercise the error state.
   */
  getApplications(options: GetApplicationsOptions = {}): Observable<Application[]> {
    const { count = 50_000, fail = false } = options;

    if (fail) {
      return timer(600).pipe(switchMap(() => throwError(() => new Error('Failed to load applications'))));
    }

    return of(this._generate(count)).pipe(delay(600));
  }

  private _generate(count: number): Application[] {
    return Array.from({ length: count }, (_, i) => ({
      id: String(i + 1),
      applicantName: `${NAMES[i % NAMES.length]} ${i + 1}`,
      status: STATUSES[i % STATUSES.length],
      submittedAt: this._dateFor(i),
      loanAmount: 50_000 + (i % 40) * 7_500,
    }));
  }

  private _dateFor(i: number): string {
    const date = new Date(2026, 0, 1 + (i % 300));
    return date.toISOString().slice(0, 10);
  }
}
