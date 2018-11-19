import { Component, OnInit } from "@angular/core";
import { appService } from "../app.service";
import { Observable } from "rxjs";
//to hold data the returnfrom the api

@Component({
  selector: "app-get-track",
  templateUrl: "./get-track.component.html",
  styleUrls: ["./get-track.component.css"]
})
export class getTrackComponent {
  // tracks: String;
  // subtotal: any;
  constructor(private tracksService: appService) {}

  setType(value) {
    this.tracksService.changeCategory(value);
  }
}

// ngOnInit() {
//   this.tracksService.getData().subscribe(
//     data => {
//       this.tracks = data;
//       console.log(data);
//     },
//     err => console.error(err),
//     () => console.log("done loading")
//   );
// }

// getData() {
//   this.tracksService.getData().subscribe(
//     data => {
//       this.expense = data;
//     },
//     err => console.error(err),
//     () => console.log("done loading foods")
//   );
// }
