import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { throwError } from 'rxjs';

interface Medicine {
  id: number;
  name: string;
  form: string;
  strength: string;
  strengthUnit: string;
  dosage: number;
  qualifier: string;
  frequency: {
    Morning?: boolean;
    Afternoon?: boolean;
    Evening?: boolean;
    Night?: boolean;
  };
}

interface GroupedMedicines {
  morning: Medicine[];
  afternoon: Medicine[];
  evening: Medicine[];
  night: Medicine[];
}

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  addMedicine(medicine: any): Observable<any> {
    return this.http.post(this.apiUrl, medicine)
      .pipe(
        tap(response => console.log('Medicine added successfully', response)),
        catchError(error => {
          console.error('Detailed error:', error);
          return throwError(() => new Error('Failed to add medicine'));
        })
      );
  }

  getMedicinesByDate(date: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/medicines?date=${date}`).pipe(
        catchError(error => {
            console.error('Error fetching medicines:', error);
            return throwError(() => new Error('Failed to fetch medicines'));
        })
    );
}

getByDate(date: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/by-date?date=${date}`).pipe(
      catchError(error => {
          console.error('Error fetching by date:', error);
          return throwError(() => new Error('Failed to fetch by date'));
      })
  );
}

  private formatErrorMessage(error: any): string {
    if (error.error && error.error.message) {
      return error.error.message; 
    }
    if (typeof error === 'string') {
      return error; 
    }
    return 'An unknown error occurred'; 
  }

}