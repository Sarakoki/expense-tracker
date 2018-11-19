import { Injectable, Output, EventEmitter } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
//   {
//   providedIn: "root"
// }
export class appService {
  private categorySource = new BehaviorSubject<string>("default");
  currentCategory = this.categorySource.asObservable();

  constructor(private http: HttpClient) {}
  getData() {
    return this.http.get<any>("http://localhost:3000/expense/");
    // console.log("HttpClient");
  }

  changeCategory(category: string) {
    this.categorySource.next(category);
  }
  getAll() {
    return this.http.get<any>("http://localhost:3000/expenses/");
  }

  getmonth(value, cat) {
    return this.http.get("/subtotal/" + cat + "/" + value);
  }
  // getUser(expenseID) {
  //   return this.http.get<any>("http://localhost:3000/expense/" + expenseID);
  // }
  // getSubtotal(total) {
  //   return this.http.get<any>("http://localhost:3000/subtotal/" + total);
  // }
  postUser(params) {
    return this.http.post<any>("http://localhost:3000/expense/", params);
  }
}
