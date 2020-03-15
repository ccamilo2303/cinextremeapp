import { TestBed } from '@angular/core/testing';

import { TheMovieDataBaseService } from './the-movie-data-base.service';

describe('TheMovieDataBaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TheMovieDataBaseService = TestBed.get(TheMovieDataBaseService);
    expect(service).toBeTruthy();
  });
});
