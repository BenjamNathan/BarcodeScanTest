import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Appointment } from './models/appointment.model';
import { OperationResponse } from './models/response.model';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  baseUrl = '../assets/serialnumbersearch-swagger.v1.0.0.yml';

  constructor(private http: HttpClient) {
  }

  public logAppointment(appointment: Appointment): Observable<OperationResponse> {
    return this.http.get<OperationResponse>(this.baseUrl + '/' + appointment);
  }

}
