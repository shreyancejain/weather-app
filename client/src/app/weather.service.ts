import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {
  constructor(private http: HttpClient) { }
  public url = 'http://api.openweathermap.org/data/2.5';
  public apiKey = '94b4fb078c6447f17ff96477b5ebcfbb';
  getCurrentWeather(loc: string) {
    return this.http.get(`/api/weather?loc=${loc}`)
  }
  getForecast(loc: string) {
    return this.http.get(`/api/forecast?loc=${loc}`)
  }
}
