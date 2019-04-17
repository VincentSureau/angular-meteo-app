import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


interface Meteo {
    
}

@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.scss']
})
export class MeteoComponent implements OnInit {
  public meteo: any = {};

  constructor(
    public http: HttpClient
  ) {
    this.meteo.city = "Forcalqueiret";
    this.meteo.temperature = 0;
    this.meteo.description = 'chargement';
    this.meteo.ip = '';

    console.log(this.meteo);
  }

  ngOnInit() {

    this.http.get(
      'https://api.my-ip.io/ip.json',
      {headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*').set('Access-Control-Allow-Headers', 'Content-Type')}
      ).subscribe(ip => this.meteo.ip = ip['ip']);

    this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.meteo.city},fr&APPID=80baecf0928a00cec842d4d50d1a0331&units=metric&lang=fr`)
        .subscribe( json => {
              this.meteo.temperature = Math.round(json.main.temp);
              this.meteo.icon = json.weather[0].icon;
              this.meteo.description = json.weather[0].description;
            }
        )
  }

  onClick($event) {
    $event.target.contentEditable = true;
  }

  onPressEnter($event) {
    if($event.key === "Enter"){
      $event.preventDefault();
      $event.target.contentEditable = false;
      this.http.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${$event.target.textContent},fr&APPID=80baecf0928a00cec842d4d50d1a0331&units=metric&lang=fr`)
          .subscribe( meteo => {
              this.meteo.city = $event.target.textContent;
              this.meteo.temperature = Math.round(meteo.main.temp);
              this.meteo.icon = meteo.weather[0].icon;
              this.meteo.description = meteo.weather[0].description;
            } 
          )
    }
  }
}
