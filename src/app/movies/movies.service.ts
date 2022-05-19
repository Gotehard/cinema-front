import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Movie} from "../shared/interfaces/movie";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  movies$: Observable<Movie[]> = new Observable<Movie[]>();

  constructor(private http: HttpClient) {
  }

  getMoviesList() {
    this.movies$ = this.http.get<Movie[]>('http://localhost:8080/api/movie');
  }

  getMovieById(id: number) {
    return this.http.get<Movie>('http://localhost:8080/api/movie/' + id);
  }
}
