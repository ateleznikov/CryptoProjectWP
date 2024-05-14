import { TestBed } from '@angular/core/testing';

import { FavouriteApiService } from './favourite-api.service';

describe('FavouriteApiService', () => {
  let service: FavouriteApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavouriteApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
