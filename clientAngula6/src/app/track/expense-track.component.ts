import { Component, OnInit } from "@angular/core";
import { appService } from "../app.service";

import { Observable } from "rxjs";
// import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-expense-track",
  templateUrl: "./expense-track.component.html",
  styleUrls: ["./expense-track.component.css"]
})
export class ExpenseTrackComponent {
  expense$: string;
  subtotal: any;
  constructor(
    private expensesService: appService // private route: ActivatedRoute
  ) {
    // this.route.params.subscribe(params => (this.expense = params.expense_id));
    // this.route.params.subscribe(params => (this.subtotal = params.total));
  }

  ngOnInit() {
    // this.expensesService.currentCategory.subscribe(
    //   data => (this.expense$ = data)
    // );
  }

  getMonth(value) {
    let cat = this.expense$;
    this.expensesService.getmonth(value, cat).subscribe(
      data => {
        this.subtotal = data;
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  // this.expensesService.getUser(this.expense$).subscribe(
  //   data => {
  //     this.expense$ = data;
  //     console.log(data);
  //   },
  //   err => console.error(err),
  //   () => console.log("done loadinggg")
  // );

  // subTotal() {
  //   this.expensesService.getSubtotal(this.subtotal).subscribe(
  //     data => {
  //       this.subtotal = data;
  //       console.log(data[0]["sum(amount)"]);
  //     },
  //     err => console.error(err),
  //     () => console.log("done loadinggg")
  //   );
  // }
}
