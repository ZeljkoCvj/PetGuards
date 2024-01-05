import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canActivGuard } from './can-activ.guard';

describe('canActivGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canActivGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
