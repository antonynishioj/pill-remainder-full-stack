import { Component, OnInit } from '@angular/core';
import { MedicineService } from '../services/medicine.service';

@Component({
  selector: 'app-my-medication',
  templateUrl: './my-medication.component.html',
  styleUrls: ['./my-medication.component.css']
})
export class MyMedicationComponent implements OnInit {
  medications: any[] = [];

  constructor(private medicineService: MedicineService) {}

  ngOnInit() {
    // this.fetchMedicines();
  }

  fetchMedicines() {
    const date = new Date().toISOString().split('T')[0]; 
    this.medicineService.getMedicinesByDate(date).subscribe(
      (data) => {
        this.medications = data;
      }
    );
  }



}