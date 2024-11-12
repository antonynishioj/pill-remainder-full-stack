import { Routes } from '@angular/router';
import { MyMedicationComponent } from './my-medication/my-medication.component';
import { AddMedicineComponent } from './add-medicine/add-medicine.component';
import { TodaysMedicationComponent } from './todays-medication/todays-medication.component';
import { WeeklyReportComponent } from './weekly-report/weekly-report.component';
import { MyInventoryComponent } from './my-inventory/my-inventory.component';
import { DailyMedicationComponent } from './daily-medication/daily-medication.component';
import { SettingsComponent } from './settings/settings.component';

export const routes: Routes = [
  { path: '', redirectTo: '/medications', pathMatch: 'full' },
  { path: 'medications', component: MyMedicationComponent },
  { path: 'add-medicine', component: AddMedicineComponent },
  { path: 'today', component: TodaysMedicationComponent },
  { path: 'weekly-report', component: WeeklyReportComponent },
  { path: 'inventory', component: MyInventoryComponent },
  { path: 'daily-medication/:date', component: DailyMedicationComponent },
  { path: 'settings', component: SettingsComponent }
];