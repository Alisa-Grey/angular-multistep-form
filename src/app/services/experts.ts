import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IExpert, IExpertFull } from '../interfaces/interfaces';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpertsService {
  httpClient = inject(HttpClient);
  isLoading: boolean = true;

  fetchExperts(): Observable<IExpert[]> {
    this.isLoading = true;
    return this.httpClient.get<IExpertFull[]>('https://jsonplaceholder.typicode.com/users').pipe(
      map((res) => {
        return res.map((expert) => ({
          id: expert.id,
          name: expert.name,
          email: expert.email,
          phone: expert.phone,
          city: expert.address.city,
          company: expert.company.name,
        }));
      }),
      catchError((error) => {
        console.error('Caught error:', error.message);
        return of([]);
      })
    );
  }
}
