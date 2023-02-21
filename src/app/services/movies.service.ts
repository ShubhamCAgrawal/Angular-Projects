import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentt } from 'src/environments/environment';

export interface ApiResult {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getTopRatedMovies(page = 1): Observable<ApiResult> {
    return this.http.get<ApiResult>(`${environmentt.baseUrl}/movie/popular?api_key=${environmentt.apiKey}&page={page}`);
  }

  getMovieDetails(id: string) {
    return this.http.get(`${environmentt.baseUrl}/movie/${id}?api_key=${environmentt.apiKey}`);
  }
}
