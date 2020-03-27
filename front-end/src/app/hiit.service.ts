import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HiitService {

  public apiURL = "http://192.168.10.159/health-app-api/";

  constructor(public http: HttpClient) { }

  loadHiitData() {
    return this.http.get(this.apiURL + "load.php");
  }

  saveHiitData(hiitData) {
    let param = "?time=" + hiitData.exerciseTime + "&rep=" + hiitData.repotition +
      "&work=" + hiitData.work + "&rest=" + hiitData.rest + "&exercise=" + hiitData.exercise;
    console.log(param);
    return this.http.get(this.apiURL + "save.php" + param);
  }

}
