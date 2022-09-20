import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { TimesheetService } from './timesheet.service';

describe('TimesheetService', () => {
  let service: TimesheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    });
    service = TestBed.inject(TimesheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
