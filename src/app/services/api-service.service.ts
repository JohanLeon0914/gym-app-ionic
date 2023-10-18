import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exercise } from 'src/models/Exercise.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(this.apiUrl);
  }
}
