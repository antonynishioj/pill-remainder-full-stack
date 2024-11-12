import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MedicineService } from '../services/medicine.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Drug {
  id: number;
  name: string;
}

@Component({
  selector: 'app-add-medicine',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.css']
})
export class AddMedicineComponent implements OnInit {
  medicineForm: FormGroup;
  frequencyButtons = ['Morning', 'Afternoon', 'Evening', 'Night'];
  commonDrugs: Drug[] = [
    { id: 1, name: 'Paracetamol' },
    { id: 2, name: 'Ibuprofen' },
    { id: 3, name: 'Antihistamine' },
    { id: 4, name: 'Cetirizine' },
    { id: 5, name: 'Aspirin' }
  ];
  filteredDrugs: Drug[] = [];
  showDrugList: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private medicineService: MedicineService,
    private router: Router
  ) {
    this.medicineForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      form: ['Capsule', Validators.required],
      strength: ['', Validators.required],
      strengthUnit: ['mg', Validators.required],
      dosage: ['', Validators.required],
      qualifier: ['Before Food', Validators.required],
      startDate: ['', Validators.required],
      duration: ['', Validators.required],
      frequency: this.fb.group({
        Morning: [false],
        Afternoon: [false],
        Evening: [false],
        Night: [false]
      }),
      inventoryCount: [''],
      inventoryReminder: [''],
      refillReminder: [false]
    });
  }

  ngOnInit() {
    this.filteredDrugs = this.commonDrugs;
    this.medicineForm.get('name')?.valueChanges.subscribe(value => {
      this.filterDrugs(value);
    });
  }

  filterDrugs(value: string) {
    this.filteredDrugs = this.commonDrugs.filter(drug => 
      drug.name.toLowerCase().includes(value.toLowerCase())
    );
    this.showDrugList = true;
  }

  toggleRefillReminder() {
    const currentValue = this.medicineForm.get('refillReminder')?.value;
    this.medicineForm.get('refillReminder')?.setValue(!currentValue);
  }

  selectDrug(drug: Drug) {
    this.medicineForm.patchValue({
      id: drug.id,
      name: drug.name
    });
    this.showDrugList = false;
  }

  toggleFrequency(time: string) {
    const frequencyControl = this.medicineForm.get('frequency');
    if (frequencyControl) {
      const currentValue = frequencyControl.get(time)?.value;
      frequencyControl.get(time)?.setValue(!currentValue);
    }
  }

  onSubmit() {
    if (this.medicineForm.valid) {
      this.medicineService.addMedicine(this.medicineForm.value).subscribe(
        response => {
          console.log('Medicine added:', response);
          this.medicineForm.reset();
          this.router.navigate(['/']);
        },
        error => {
        }
      );
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}