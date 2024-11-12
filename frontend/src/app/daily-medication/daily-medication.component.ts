import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MedicineService } from '../services/medicine.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-daily-medication',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  template: './daily-medication.component.html'
})
export class DailyMedicationComponent implements OnInit {
  selectedDate: Date = new Date();
  timeCategories = ['morning', 'afternoon', 'evening', 'night'];
  medicines = {
    morning: [],
    afternoon: [],
    evening: [],
    night: []
  };

  constructor(
    private route: ActivatedRoute,
    private medicineService: MedicineService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const dateParam = params.get('date');
      if (dateParam) {
        this.selectedDate = new Date(dateParam);
        this.fetchMedicines();
      }
    });
  }

  fetchMedicines() {
    const formattedDate = this.selectedDate.toISOString().split('T')[0]; 
    this.medicineService.getMedicinesByDate(formattedDate).subscribe(
      (medications) => {
        this.categorizedMedications(medications);
      },
      (error) => {
        console.error('Error fetching medications:', error);
      }
    );
  }

  categorizedMedications(medications:any) {
    this.medicines = {
      morning: medications.morning || [],
      afternoon: medications.afternoon || [],
      evening: medications.evening || [],
      night: medications.night || []
    };
  }

  getTimeIcon(timeOfDay: string): string {
    switch (timeOfDay) {
      case 'morning':
        return 'wb_sunny'; // Morning icon
      case 'afternoon':
        return 'wb_cloudy'; // Afternoon icon
      case 'evening':
        return 'wb_twilight'; // Evening icon
      case 'night':
        return 'nightlight_round'; // Night icon
      default:
        return '';
    }
  }

  getTimeSlot(timeOfDay: string): string {
    switch (timeOfDay) {
      case 'morning':
        return '10:30 AM';
      case 'afternoon':
        return '12:00 PM';
      case 'evening':
        return '05:00 PM';
      case 'night':
        return '09:00 PM';
      default:
        return '';
    }
  }
}