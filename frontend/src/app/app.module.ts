
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { routes } from './app.routes';

import { MyMedicationComponent } from './my-medication/my-medication.component';
import { TodaysMedicationComponent } from './todays-medication/todays-medication.component';
import { WeeklyReportComponent } from './weekly-report/weekly-report.component';
import { MyInventoryComponent } from './my-inventory/my-inventory.component';

@NgModule({
  declarations: [
    MyMedicationComponent,
    TodaysMedicationComponent,
    WeeklyReportComponent,
    MyInventoryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }