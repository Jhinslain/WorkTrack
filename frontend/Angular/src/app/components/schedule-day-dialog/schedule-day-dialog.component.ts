import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Schedule} from "../../models/schedule.model";
import {ScheduleService} from "../../services/schedule.service";
import {CreateScheduleDialogComponent} from "../create-schedule-dialog/create-schedule-dialog.component";
import {ModifyScheduleComponent} from "../modify-schedule/modify-schedule.component";
import {DatePipe} from "@angular/common";
import {ProfilService} from "../../services/profil.service";

@Component({
  selector: 'app-schedule-day-dialog',
  templateUrl: './schedule-day-dialog.component.html',
  styleUrls: ['./schedule-day-dialog.component.scss']

})
export class ScheduleDayDialogComponent implements OnInit {
  event: any;
  schedule!: Schedule;
  role: string | null = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private scheduleService: ScheduleService,
              public dialog: MatDialog,
              private userService: ProfilService) {
    this.event = data.event;
  }

  ngOnInit() {

    this.schedule = {
      id: this.event._def.publicId,
      userID: this.event._def.extendedProps.userID,
      firstName: this.event._def.extendedProps.firstName,
      date: new Date(this.event.start),
      status: this.event._def.extendedProps.status,
      travel_time: this.event._def.extendedProps.travel_time,
      load_status: this.event._def.extendedProps.load_status === "1",
      unload_status: this.event._def.extendedProps.unload_status === "1",
      arrival_time: this.event._def.extendedProps.arrival_time,
      departure_time: this.event._def.extendedProps.departure_time,
      break_time: this.event._def.extendedProps.break_time,
      panier: this.event._def.extendedProps.panier  === "1",
      grand_deplacement: this.event._def.extendedProps.grand_deplacement  === "1",
      work_location: this.event._def.extendedProps.work_location,
      total_work_time: this.event._def.extendedProps.total_work_time,
      validated: this.event._def.extendedProps.validated,
      commentaire: this.event._def.extendedProps.commentaire,
    };
    this.userService.getRole().subscribe(role => {
      this.role = role;
    });
  }

  deleteEvent() {
    // Remove the event from the calendar
    this.event.remove();

    this.scheduleService.removeSchedule(this.schedule.id).subscribe(
      response => {
        console.log("Delete response:", response);
      },
      error => {
        console.error("Delete error:", error);
      }
    );
    location.reload();
  }

  validateEvent(){
    this.scheduleService.validateSchedule(this.schedule.id).subscribe(
      response => {
        console.log("Delete response:", response);
      },
      error => {
        console.error("Delete error:", error);
      }
    );
    location.reload();
  }


  openModifySchedule(): void {
    this.dialog.open(ModifyScheduleComponent, {
      width: '50%',
    });
  }

}
