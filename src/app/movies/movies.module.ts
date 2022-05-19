import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MoviesRoutingModule} from './movies-routing.module';
import {MoviesComponent} from './movies.component';
import {MovieDetailsComponent} from './movie-details/movie-details.component';
import {MovieDurationPipe} from "../shared/pipes/movie-duration.pipe";


@NgModule({
  declarations: [
    MoviesComponent,
    MovieDetailsComponent,
    MovieDurationPipe
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule
  ],
  providers: []
})
export class MoviesModule { }
