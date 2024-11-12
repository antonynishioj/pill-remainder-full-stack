// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyMedicationComponent } from './my-medication/my-medication.component';
import { AddMedicineComponent } from './add-medicine/add-medicine.component';

const routes: Routes = [
  { path: '', redirectTo: '/medications', pathMatch: 'full' },
  { path: 'medications', component: MyMedicationComponent },
  { path: 'add-medicine', component: AddMedicineComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }