import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiaccuService {

  constructor(private http: HttpClient) { }

  getLocationKey(location: string){
    return this.http.get(
        'http://dataservice.accuweather.com/locations/v1/search?q='+ location + '&apikey=a1kyetxsuUxLFoWdzRsWEehgTSHV7eJR'
      );
  }

}
