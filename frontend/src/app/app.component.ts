import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MedicineService } from '../app/services/medicine.service';
import { RouterModule, Router } from '@angular/router';

interface DateItem {
  day: string;
  date: Date;
  selected: boolean;
}

interface MenuItem {
  label: string;
  icon: string;
  active: boolean;
  route: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dates: DateItem[] = [];
  currentIndex = 0;
  activeTab: 'today' | 'inventory' = 'today';
  currentDate: Date = new Date();
  selectedDate: Date = new Date(); 
  medicines: any[] = [];

  menuItems: MenuItem[] = [
    { label: 'Medications', icon: 'fas fa-pills', active: true, route: '/medications' },
    { label: 'Inventory', icon: 'fas fa-box', active: false, route: '/inventory' },
    { label: 'Reports', icon: 'fas fa-chart-bar', active: false, route: '/weekly-report' },
    { label: 'Settings', icon: 'fas fa-cog', active: false, route: '/settings' }
  ];

  //constructor(public router: Router) {}

  constructor(private medicineService: MedicineService, public router: Router) {}

  ngOnInit() {
    this.generateDateRange();
    //this.getByDate(this.selectedDate); 
    
  }

  navigateToSettings(): void {
    this.router.navigate(['/settings']); // Use the Router to navigate
  }

  generateDateRange(startDate: Date = new Date()) {
    this.dates = [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 0; i < 5; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      this.dates.push({
        day: days[date.getDay()],
        date: date,
        selected: i === 0
      });
    }
  }

  selectDate(selectedDate: DateItem) {
    this.dates.forEach(date => date.selected = false);
    selectedDate.selected = true;
    this.selectedDate = selectedDate.date;
    this.getByDate();
    this.router.navigate(['/daily-medication', this.formatDate(selectedDate.date)]);
  }

  fetchMedicines(date: Date) {
    const formattedDate = this.formatDate(date);
    this.medicineService.getMedicinesByDate(formattedDate).subscribe(
      (medications: any[]) => {
        this.medicines = medications; 
      },
      (error:any) => {
        console.error('Error fetching medications:', error);
      }
    );
  }

  getByDate(){
    console.log('getting a date');
    const date = this.selectedDate.toISOString().split('T')[0]; 
        this.medicineService.getByDate(date).subscribe(
      (data) => {
        this.medicines = data;
      }
    );
  }

  moveDate(direction: 'prev' | 'next') {
    const currentFirstDate = this.dates[0].date;
    const newStartDate = new Date(currentFirstDate);
    
    if (direction === 'prev') {
      newStartDate.setDate(currentFirstDate.getDate() - 5);
    } else {
      newStartDate.setDate(currentFirstDate.getDate() + 5);
    }

    this.generateDateRange(newStartDate);
  }

  setActiveTab(tab: 'today' | 'inventory') {
    this.activeTab = tab;
  }

  setActiveMenuItem(selectedItem: MenuItem) {
    // Deactivate all menu items
    this.menuItems.forEach(item => item.active = false);
    
    // Activate the selected item
    selectedItem.active = true;
  }

  navigateHome(item: MenuItem) {
    this.router.navigate([item.route]);
  }


  private formatDate(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`; // Format date to YYYY-MM-DD
  }
}