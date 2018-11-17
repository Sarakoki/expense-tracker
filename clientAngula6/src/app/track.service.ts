import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
// import {Observable} from 'rxjs/Observable';

// const httpOptions = {
//   headers: new HttpHeaders({ "Content-Type": "application/json" })
// };

@Injectable({
  providedIn: "root"
})
export class trackService {
  constructor(private http: HttpClient) {}
  getData() {
    return this.http.get("http://localhost:3000/expense/");
    // console.log("HttpClient");
  }

  getTotal() {
    return this.http.get<any>("http://localhost:3000/total/");
  }
  getUser(expenseID) {
    return this.http.get<any>("http://localhost:3000/expense/" + expenseID);
  }
  getSubtotal(total) {
    return this.http.get<any>("http://localhost:3000/subtotal/" + total);
  }
  // postUser() {
  //   return this.http.post<any>("http://localhost:3000/expense/", {
  //     headers: new HttpHeaders({
  //       "Content-Type": "application/json"
  //     })
  //   });
  // }
}
