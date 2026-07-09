import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { ApplicationsService } from './applications.service';

describe('ApplicationsService', () => {
  let service: ApplicationsService;

  beforeEach(() => {
    service = TestBed.inject(ApplicationsService);
  });

  it('returns the requested number of applications', async () => {
    const applications = await firstValueFrom(service.getApplications({ count: 25 }));

    expect(applications).toHaveLength(25);
    expect(applications[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        applicantName: expect.any(String),
        status: expect.any(String),
        submittedAt: expect.any(String),
        loanAmount: expect.any(Number),
      }),
    );
  });

  it('emits an error when { fail: true }', async () => {
    await expect(firstValueFrom(service.getApplications({ fail: true }))).rejects.toThrow('Failed to load applications');
  });
});
