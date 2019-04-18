import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.scss']
})
export class MeteoComponent implements OnInit {
  public city: string;
  public ip: string;
  public meteoData: any = {};

  constructor(
    public http: HttpClient
  ) {

    this.city = 'Forcalqueiret';
    console.log(this.meteoData);
  }

  ngOnInit() {
    console.log(this.city),
    this.city = 'Forcalqueiret';
    this.http.get(
      'https://api.my-ip.io/ip.json',
      {headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*').set('Access-Control-Allow-Headers', 'Content-Type')}
      ).subscribe(ip => this.ip = ip['ip']);

    this.http.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${this.city},fr&APPID=80baecf0928a00cec842d4d50d1a0331&units=metric&lang=fr`)
        .subscribe( meteo => {
          console.log(meteo);
          this.meteoData = meteo;
        });
  }

  onClick($event) {
    $event.target.contentEditable = true;
  }

  onPressEnter($event) {
    if($event.key === "Enter"){
      $event.preventDefault();
      $event.target.contentEditable = false;
      this.http.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${$event.target.textContent},fr&APPID=80baecf0928a00cec842d4d50d1a0331&units=metric&lang=fr`)
          .subscribe( meteo => {
              this.meteoData = meteo;
            }
          );}
  }
}
