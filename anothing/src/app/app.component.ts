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
  public locationKey: string ='';
  public currentConditions: any;
  public fiveDayForecast: any;
  public dayOneForecast: number = 99;
  public dayTwoForecast: number = 99;
  public dayThreeForecast: number = 99;
  public dayFourForecast: number = 99;
  public dayFiveForecast: number = 99;

  public twelveHourForecast: any;
  public hourOneForecast: number = 99;
  public hourTwoForecast: number = 99;
  public hourThreeForecast: number = 99;
  public hourFourForecast: number = 99;
  public hourFiveForecast: number = 99;
  public hourSixForecast: number = 99;
  public hourSevenForecast: number = 99;
  public hourEightForecast: number = 99;
  public hourNineForecast: number = 99;
  public hourTenForecast: number = 99;
  public hourElevenForecast: number = 99;
  public hourTwelveForecast: number = 99;

  public windDirection: number = 0;
  public weatherImages: string[] = [
    'assets/weatherIcons/0.png',
    'assets/weatherIcons/1.png',
    'assets/weatherIcons/2.png',
    'assets/weatherIcons/3.png',
    'assets/weatherIcons/4.png',
    'assets/weatherIcons/5.png',
    'assets/weatherIcons/6.png',
    'assets/weatherIcons/7.png',
    'assets/weatherIcons/0.png',
    'assets/weatherIcons/0.png',
    'assets/weatherIcons/0.png',
    'assets/weatherIcons/11.png',
    'assets/weatherIcons/12.png',
    'assets/weatherIcons/13.png',
    'assets/weatherIcons/14.png',
    'assets/weatherIcons/15.png',
    'assets/weatherIcons/16.png',
    'assets/weatherIcons/17.png',
    'assets/weatherIcons/18.png',
    'assets/weatherIcons/19.png',
    'assets/weatherIcons/20.png',
    'assets/weatherIcons/21.png',
    'assets/weatherIcons/22.png',
    'assets/weatherIcons/23.png',
    'assets/weatherIcons/24.png',
    'assets/weatherIcons/25.png',
    'assets/weatherIcons/26.png',
    'assets/weatherIcons/0.png',
    'assets/weatherIcons/0.png',
    'assets/weatherIcons/29.png',
    'assets/weatherIcons/30.png',
    'assets/weatherIcons/31.png',
    'assets/weatherIcons/32.png',
    'assets/weatherIcons/33.png',
    'assets/weatherIcons/34.png',
    'assets/weatherIcons/35.png',
    'assets/weatherIcons/36.png',
    'assets/weatherIcons/37.png',
    'assets/weatherIcons/38.png',
    'assets/weatherIcons/39.png',
    'assets/weatherIcons/40.png',
    'assets/weatherIcons/41.png',
    'assets/weatherIcons/42.png',
    'assets/weatherIcons/43.png',
    'assets/weatherIcons/44.png',
  ];

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
    this.hourOneForecast = (this.twelveHourForecast?.[0].Temperature.Value - 32) * 5/9;
    this.hourTwoForecast = (this.twelveHourForecast?.[1].Temperature.Value - 32) * 5/9;
    this.hourThreeForecast = (this.twelveHourForecast?.[2].Temperature.Value - 32) * 5/9;
    this.hourFourForecast = (this.twelveHourForecast?.[3].Temperature.Value - 32) * 5/9;
    this.hourFiveForecast = (this.twelveHourForecast?.[4].Temperature.Value - 32) * 5/9;
    this.hourSixForecast = (this.twelveHourForecast?.[5].Temperature.Value - 32) * 5/9;
    this.hourSevenForecast = (this.twelveHourForecast?.[6].Temperature.Value - 32) * 5/9;
    this.hourEightForecast = (this.twelveHourForecast?.[7].Temperature.Value - 32) * 5/9;
    this.hourNineForecast = (this.twelveHourForecast?.[8].Temperature.Value - 32) * 5/9;
    this.hourTenForecast = (this.twelveHourForecast?.[9].Temperature.Value - 32) * 5/9;
    this.hourElevenForecast = (this.twelveHourForecast?.[10].Temperature.Value - 32) * 5/9;
    this.hourTwelveForecast = (this.twelveHourForecast?.[11].Temperature.Value - 32) * 5/9;

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
    this.windDirection = this.currentConditions?.[0].Wind.Direction.Degrees;
    console.log('Winddirection' + this.windDirection);

  },

  (error) => {
    console.error('Error 12 hour weather data:', error);
  }
  
  );
}

fiveDayData() {
  this.apiaccuService.getFiveDayData(this.locationKey).subscribe((data: any) => {
    this.fiveDayForecast = data;
    this.dayOneForecast = (this.fiveDayForecast?.DailyForecasts[0].Temperature.Maximum.Value - 32) * 5/9;
    this.dayTwoForecast = (this.fiveDayForecast?.DailyForecasts[1].Temperature.Maximum.Value - 32) * 5/9;
    this.dayThreeForecast = (this.fiveDayForecast?.DailyForecasts[2].Temperature.Maximum.Value - 32) * 5/9;
    this.dayFourForecast = (this.fiveDayForecast?.DailyForecasts[3].Temperature.Maximum.Value - 32) * 5/9;
    this.dayFiveForecast = (this.fiveDayForecast?.DailyForecasts[4].Temperature.Maximum.Value - 32) * 5/9;
    console.log(this.fiveDayForecast);
    console.log(this.fiveDayForecast?.DailyForecasts[0].Temperature.Maximum.Value);
  },

  (error) => {
    console.error('Error 5 day weather data:', error);
  }
  
  );
}
}
