import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MoviesService} from "../movies.service";
import {Movie} from "../../shared/interfaces/movie";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  movie: Movie = {} as Movie;

  constructor(private route: ActivatedRoute,
              private movieService: MoviesService) {
  }

  ngOnInit(): void {
    let a: number = +(this.route.snapshot.paramMap.get('id') || 0);
    this.movieService.getMovieById(a)
      .subscribe(m => this.movie = m);
  }


}
