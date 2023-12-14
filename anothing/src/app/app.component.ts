import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiaccuService } from './apiaccu.service';

interface WeatherForm {
  location: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public weatherSearchForm!: FormGroup;
  public weatherLocation: any;
  public locationKey: string;
  public currentConditions: any;
  public fiveDayForecast: any;
  public twelveHourForecast: any;

  constructor(
    private formBuilder: FormBuilder,
    private apiaccuService: ApiaccuService
    ) {}

ngOnInit() {
  this.weatherSearchForm = this.formBuilder.group({
    location: ['']
  });
}

sendToAPIAccu(formValues: WeatherForm ) {
  this.apiaccuService.getLocationKey(formValues.location).subscribe((data) => {
    this.weatherLocation = data
    this.locationKey = this.weatherLocation?.[0].Key;
    console.log(this.weatherLocation);

    if (this.locationKey !== undefined && this.locationKey !== '') {
      console.log('LocationKey is not empty:' + this.locationKey);
      this.twelveHourData();
      this.currentData();
      this.fiveDayData();
    }
  
  },
  (error) => {
    console.error('Error getting location key:', error);
  }
  
  ); 

}

twelveHourData() {
  this.apiaccuService.getTwelveHourData(this.locationKey).subscribe((data: any) => {
    this.twelveHourForecast = data;
    console.log(this.twelveHourForecast);
  },

  (error) => {
    console.error('Error current weather data:', error);
  }
  
  );
}

currentData() {
  this.apiaccuService.getCurrentData(this.locationKey).subscribe((data: any) => {
    this.currentConditions = data;
    console.log(this.currentConditions);
    console.log(this.currentConditions?.[0].Temperature.Imperial.Value);
  },

  (error) => {
    console.error('Error 12 hour weather data:', error);
  }
  
  );
}

fiveDayData() {
  this.apiaccuService.getFiveDayData(this.locationKey).subscribe((data: any) => {
    this.currentConditions = data;
    console.log(this.fiveDayForecast);
    // console.log(this.fiveDayForecast?.[0].Temperature.Value);
  },

  (error) => {
    console.error('Error 5 day weather data:', error);
  }
  
  );
}
}
