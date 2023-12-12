import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {
    
}
ngOnInit() {
  
  this.weatherSearchForm = this.formBuilder.group({
    location: ['']
  });
}
sendToAPIAccu(formValues: WeatherForm ) {
  console.log(formValues);
}
}
