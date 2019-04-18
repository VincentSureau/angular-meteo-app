import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.scss']
})
export class MeteoComponent implements OnInit {
  public city: any;
  public ip: any;
  public meteoData: any = {};

  constructor(
    public http: HttpClient
  ) {

  }

  ngOnInit() {
    this.getIp();
  }

  getIp() {
    this.http.get(
      'https://api.my-ip.io/ip.json',
      {headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*').set('Access-Control-Allow-Headers', 'Content-Type')}
      ).subscribe(ip => {
        this.ip = ip['ip'];
        this.getCityFromIp();
      });
  }

  getCityFromIp(){
    this.http.get(
      `http://api.ipstack.com/${this.ip}?access_key=993a9f495c4630eb2f8d5733a8199856&format=1`
    ).subscribe(data => {
      this.city = data['city'];
      this.getMeteo();
    });
  }

  getMeteo() {
    this.http.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${this.city},fr&APPID=80baecf0928a00cec842d4d50d1a0331&units=metric&lang=fr`)
        .subscribe( meteo => {
          this.meteoData = meteo;
        });
  }

  onClick($event) {
    $event.target.contentEditable = true;
  }

  onPressEnter($event) {
    if($event.key === 'Enter'){
      $event.preventDefault();
      $event.target.contentEditable = false;
      this.city = $event.target.textContent;
      this.getMeteo();
    }
  }
}
