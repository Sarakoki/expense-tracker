import { Component, OnInit } from "@angular/core";
// import { expensesService } from "./expenses.service";
import { trackService } from "../track.service";

//this is example of decorator
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  // expenses = {};
  total = Object;
  constructor(private postExpense: trackService) {}
  title = "Expense Tracker";
  ngOnInit() {
    this.postExpense.getTotal().subscribe(data => {
      this.total = data;
      console.log(data[0]["sum(amount)"]);
    });
  }
}
