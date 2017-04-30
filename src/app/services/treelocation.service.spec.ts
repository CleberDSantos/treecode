import { TestBed, inject } from '@angular/core/testing';

import { TreelocationService } from './treelocation.service';

describe('TreelocationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreelocationService]
    });
  });

  it('should ...', inject([TreelocationService], (service: TreelocationService) => {
    expect(service).toBeTruthy();
  }));
});
