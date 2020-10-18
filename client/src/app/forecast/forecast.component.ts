import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { WeatherService } from '../weather.service';
@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent {
  loc$: Observable<string>;
  loc: string;
  forecast: any;
  msg: string;
  constructor(
    private store: Store<any>,
    private weatherService: WeatherService
  ) {
    this.loc$ = store.pipe(select('loc'));
    this.loc$.subscribe(loc => {
      this.loc = loc;
      this.searchForecast(loc);
    })
  }

  searchForecast(loc: string) {
    this.weatherService.getForecast(loc)
      .subscribe(res => {
        this.forecast = res;
      }, err => {
        this.msg = "Failed to get forecast."
        if (err.error && err.error.message) {
          this.msg = err.error.message;
        }
        this.forecast = null;
      })
  }
}
