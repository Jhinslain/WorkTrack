import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, of, tap} from 'rxjs';
import { map } from 'rxjs/operators';
import {MessageService} from "./message.service";
import {ScheduleResponse} from "../models/Schedule-response";


@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private url = 'http://34.163.235.31/'; // Votre URL d'API ici
  constructor(private http: HttpClient, private messageService: MessageService) { }

  getSchedules(): Observable<ScheduleResponse> {
    return this.http.get<ScheduleResponse>(this.url + 'getAllDateforUser.php', { withCredentials: true })
      .pipe(
        map(response => response)
      );
  }


  createSchedule(Schedule_create:Partial<any>) {
      return this.messageService.sendMessage('addSchedule',Schedule_create);
  }

  getSchedulesForUser(userName: string): Observable<ScheduleResponse> {
    return this.messageService.sendMessage(`getScheduleForUser`, {user_Name: userName});
  }

  removeSchedule(dateId : string){
    return this.messageService.sendMessage('delSchedule', {date_id: dateId});
  }

  validateSchedule(dateId : string){
    return this.messageService.sendMessage('validateSchedule', {date_id: dateId});
  }

  getAllNames(): Observable<string[]> {
    return this.messageService.sendMessage('getAllUsers', {}).pipe(
      map(response => {
        if (response.data && Array.isArray(response.data)) { // vérifie aussi si c'est un tableau
          return response.data.map((user: { firstName: string }) => user.firstName);
        } else {
          throw new Error('User firstName not found in response');
        }
      }),
      catchError(error => {
        console.error('Error getting user names:', error);
        return of([]);
      })
    );
  }







}
