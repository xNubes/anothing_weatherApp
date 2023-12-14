import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiaccuService {

  constructor(private http: HttpClient) {}

  getLocationKey(location: string): Observable<any> {
    return this.http.get<any>(
        'http://dataservice.accuweather.com/locations/v1/search?q='+ location + '&apikey=a1kyetxsuUxLFoWdzRsWEehgTSHV7eJR'
      );
  }

  getTwelveHourData(locationKey: string): Observable<any> {
    return this.http.get<any>(
      'http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/' + locationKey + '?apikey=a1kyetxsuUxLFoWdzRsWEehgTSHV7eJR&details=true'
    );
  }

  getCurrentData(locationKey: string): Observable<any> {
    return this.http.get<any>(
      'http://dataservice.accuweather.com/currentconditions/v1/' + locationKey + '?apikey=a1kyetxsuUxLFoWdzRsWEehgTSHV7eJR&details=true'
    );
  }
  
  getFiveDayData(locationKey: string): Observable<any> {
    return this.http.get<any>(
      'http://dataservice.accuweather.com/forecasts/v1/daily/5day/' + locationKey + '?apikey=a1kyetxsuUxLFoWdzRsWEehgTSHV7eJR'
    );
  }

}
