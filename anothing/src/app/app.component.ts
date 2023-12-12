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
  this.apiaccuService.getWeather(formValues.location)
  .subscribe(data => console.log(data))
}
}
