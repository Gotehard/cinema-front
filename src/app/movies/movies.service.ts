import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../shared/services/auth.service";
import {Movie} from "../shared/interfaces/movie";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  movies: Observable<Movie[]> = new Observable<Movie[]>();

  constructor(private http: HttpClient,
              private authService: AuthService) { }
  getMoviesList(){
    const token = this.authService.getToken();
    const headers = {
        'Authorization': 'Bearer '+token
    };

    this.movies = this.http.get<Movie[]>('http://localhost:8080/api/movie', {headers});
  }
}
