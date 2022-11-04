import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { JwtInterceptor } from './jwt.interceptor';

describe('JwtInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientModule ],
    providers: [
      JwtInterceptor
    ]
  }));

  it('should be created', () => {
    const interceptor: JwtInterceptor = TestBed.inject(JwtInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
