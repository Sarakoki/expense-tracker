import { Component, OnInit } from "@angular/core";
import { appService } from "../app.service";
import { Observable } from "rxjs";

//this is example of decorator
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  // expenses = {};
  total = Object;
  category: any;
  amount: any;
  datee: any;
  totall: any;

  // tot: Object;
  constructor(private add: appService) {}
  title = "Expense Tracker";
  ngOnInit() {
    this.add.getAll().subscribe(data => {
      this.total = data;
      console.log(data);
    });
  }
  postexp() {
    this.add
      .postUser({
        category: this.category,
        amount: this.amount,
        datee: this.datee
      })
      .subscribe(
        data => {
          this.total = data;
          console.log(data);
        },
        err => {
          console.log(err);
        }
      );
  }
}
