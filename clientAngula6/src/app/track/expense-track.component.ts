import { Component, OnInit } from "@angular/core";
// import { ExpenseService } from "../expense.service";
import { trackService } from "../track.service";

import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-expense-track",
  templateUrl: "./expense-track.component.html",
  styleUrls: ["./expense-track.component.css"]
})
export class ExpenseTrackComponent implements OnInit {
  expense$ = Object;
  subtotal = Object;
  constructor(
    private expensesService: trackService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => (this.expense$ = params.expense_id));
    this.route.params.subscribe(params => (this.subtotal = params.total));
  }

  ngOnInit() {
    this.expensesService.getUser(this.expense$).subscribe(
      data => {
        this.expense$ = data;
        console.log(data);
      },
      err => console.error(err),
      () => console.log("done loadinggg")
    );
  }
  subTotal() {
    this.expensesService.getSubtotal(this.subtotal).subscribe(
      data => {
        this.subtotal = data;
        console.log(data[0]["sum(amount)"]);
      },
      err => console.error(err),
      () => console.log("done loadinggg")
    );
  }
}
