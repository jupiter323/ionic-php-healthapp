import { Component } from '@angular/core';
import { fail } from 'assert';
import { HiitService } from '../hiit.service';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public inputBMIData = {
    "height": "",
    "weight": "",
    "gender": "",
    "dreamWeight": "",
    "age": "",
    "exercise": ""
  };

  public resultBMIData = {
    "weightState": "",
    "bmi": "",
    "bmr": "",
    "maintainWeight": "",
    "achieveWeight": "",
    "reduce": false,
    "daysWeight": ""
  };

  public inputHIITData = {
    "exerciseTime": "",
    "repotition": "",
    "work": "",
    "rest": "",
    "exercise": ""
  };

  public resultHIITData = {
    "listData": [],
    "totalExerciseTime": 0,
    "totalRestTime": 0,
    "totalHiitTime": 0
  };

  public switchBMIHIIT = true;
  public bmiResultState = false;
  public hiitResultState = false;

  constructor(
    public hitService: HiitService,
    public loading: LoadingService,
  ) {

  }

  bmiSubmit(bmiData) {
    console.log("asdfhlasjdfhlaj");
    console.log(bmiData);
    console.log(bmiData.valid);
    if (bmiData.valid) {
      this.calculateBMI();
    }
  }

  calculateBMI() {
    this.resultBMIData.bmi = (parseFloat(this.inputBMIData.weight)
      / (parseFloat(this.inputBMIData.height) * parseFloat(this.inputBMIData.height))).toString();
    let floatBMI = parseFloat(this.resultBMIData.bmi);
    if (floatBMI < 18.5) {
      this.resultBMIData.weightState = "Underweight";
    } else if (floatBMI > 18.5 && floatBMI < 24.99) {
      this.resultBMIData.weightState = "Normal Weight";
    } else if (floatBMI > 25 && floatBMI < 29.99) {
      this.resultBMIData.weightState = "Overweight";
    } else if (floatBMI > 30 && floatBMI < 34.99) {
      this.resultBMIData.weightState = "Obese (class 1)";
    } else if (floatBMI > 35 && floatBMI < 39.99) {
      this.resultBMIData.weightState = "Obese (class 2)";
    } else if (floatBMI > 40) {
      this.resultBMIData.weightState = "Morbidly Obese";
    }

    switch (this.inputBMIData.gender) {
      case "Female":
        this.resultBMIData.bmr = (655 + 9.6 * parseFloat(this.inputBMIData.weight) +
          180 * parseFloat(this.inputBMIData.height) - (4.7 * parseFloat(this.inputBMIData.age))).toString();
        break;
      case "Male":
        this.resultBMIData.bmr = (66 + 13.7 * parseFloat(this.inputBMIData.weight) +
          500 * parseFloat(this.inputBMIData.height) - (6.8 * parseFloat(this.inputBMIData.age))).toString();
        break;
      default:
        break
    }

    switch (this.inputBMIData.exercise) {
      case "Hardly Exercise":
        this.resultBMIData.maintainWeight = (parseFloat(this.resultBMIData.bmr) * 1.2).toString();
        break;
      case "Exercise 1 to 2 times a week":
        this.resultBMIData.maintainWeight = (parseFloat(this.resultBMIData.bmr) * 1.375).toString();
        break;
      case "Exercise 3 to 5 times a week":
        this.resultBMIData.maintainWeight = (parseFloat(this.resultBMIData.bmr) * 1.55).toString();
        break;
      case "Exercise 6 to 7 times a week":
        this.resultBMIData.maintainWeight = (parseFloat(this.resultBMIData.bmr) * 1.725).toString();
        break;
      case "Intensive Exercise more than 7 times a week":
        this.resultBMIData.maintainWeight = (parseFloat(this.resultBMIData.bmr) * 1.9).toString();
        break;
      default:
        break
    }

    this.resultBMIData.achieveWeight =
      (parseFloat(this.inputBMIData.dreamWeight) - parseFloat(this.inputBMIData.weight)).toString();

    if (parseFloat(this.resultBMIData.achieveWeight) < 0) {
      this.resultBMIData.reduce = true;
      this.resultBMIData.achieveWeight = (Math.abs(parseFloat(this.resultBMIData.achieveWeight))).toString();
    } else {
      this.resultBMIData.reduce = false;
    }

    this.resultBMIData.daysWeight = (parseFloat(this.resultBMIData.achieveWeight) / 0.0064).toString();
    this.resultBMIData.daysWeight = (Math.abs(parseFloat(this.resultBMIData.daysWeight))).toString();

    this.bmiResultState = true;

  }

  closeModal() {
    this.bmiResultState = false;
  }

  openBMI() {
    this.switchBMIHIIT = true;
  }

  openHIIT() {
    this.switchBMIHIIT = false;
  }

  hiitSubmit(hiitData) {
    console.log(hiitData);
    console.log(hiitData.valid);
    if (hiitData.valid) {
      this.loading.present();
      this.hitService.saveHiitData(this.inputHIITData).subscribe(result => {
        console.log(result);
        this.loading.dismiss();
        this.inputHIITData.exercise = "";
        this.inputHIITData.exerciseTime = "";
        this.inputHIITData.work = "";
        this.inputHIITData.rest = "";
        this.inputHIITData.repotition = "";
        this.loadData();
      }, error => {
        console.log(error);
        this.loading.dismiss();
      })
      // this.loadData();
    }
  }

  loadData() {
    this.loading.present();

    this.resultHIITData.listData = new Array();
    this.resultHIITData.totalExerciseTime = 0;
    this.resultHIITData.totalHiitTime = 0;
    this.resultHIITData.totalRestTime = 0;
    this.hitService.loadHiitData().subscribe(result => {
      console.log(result);
      this.hiitResultState = true;
      for (let list of Object(result)) {
        let param = { "TPR": 0, "WRR": 0, "workout": 0, "rest": 0 };
        param.TPR = Math.round(list.time / list.rep);
        param.WRR = Math.round((param.TPR * 60) / (list.work + list.rest));
        param.workout = param.WRR * list.work;
        param.rest = param.WRR * list.rest;
        this.resultHIITData.listData.push(param);
        this.resultHIITData.totalExerciseTime = this.resultHIITData.totalExerciseTime + param.workout;
        this.resultHIITData.totalRestTime = this.resultHIITData.totalRestTime + param.rest;
        this.resultHIITData.totalHiitTime = this.resultHIITData.totalHiitTime + param.rest + param.workout;
      }
      this.resultHIITData.totalExerciseTime = this.resultHIITData.totalExerciseTime / 60;
      this.resultHIITData.totalRestTime = this.resultHIITData.totalRestTime / 60;
      this.resultHIITData.totalHiitTime = this.resultHIITData.totalHiitTime / 60;
      console.log(this.resultHIITData);
      this.loading.dismiss();
    }, error => {
      console.log(error);
      this.loading.dismiss();
    })
  }


}
