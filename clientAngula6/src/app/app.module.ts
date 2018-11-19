import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
//import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { getTrackComponent } from "./track/get-track.component";
import { ExpenseTrackComponent } from "./track/expense-track.component";
import { HomeComponent } from "./home/home.component";
import { appService } from "./app.service";
// import { ExpenseService } from "./expense.service";

@NgModule({
  declarations: [
    AppComponent,
    getTrackComponent,
    ExpenseTrackComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "track",
        component: getTrackComponent
      },
      {
        path: "expense",
        component: ExpenseTrackComponent
      }
    ])
  ],
  providers: [appService],
  bootstrap: [AppComponent]
})
export class AppModule {}
