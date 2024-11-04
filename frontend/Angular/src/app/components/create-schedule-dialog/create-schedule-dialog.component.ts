import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {MessageService} from "../../services/message.service";
import {ScheduleService} from "../../services/schedule.service";
import {ScheduleResponse} from "../../models/Schedule-response";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-schedule-dialog',
  templateUrl: './create-schedule-dialog.component.html',
  styleUrls: ['./create-schedule-dialog.component.scss']
})
export class CreateScheduleDialogComponent implements OnInit {
  scheduleForm = this.fb.group({
    date: this.data.date,
    travel_time: [''],
    status:[''],
    load_status: [false],
    unload_status: [false],
    arrival_time: ['', Validators.required],
    departure_time: ['', Validators.required],
    break_time: [''],
    panier: [false],
    grand_deplacement: [false],
    work_location: ['',Validators.required],
    commentaire:[''],
  });

  constructor(
    private fb: FormBuilder,
    private scheduleService: ScheduleService,
    public dialogRef: MatDialogRef<CreateScheduleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any  // Injecting the clicked date
    ) {}

  date = this.data.date;

  ngOnInit(): void {
    const datePipe = new DatePipe('fr');
    this.date=this.data.date
    this.date = datePipe.transform(this.date, 'fullDate'); // Utilisez le format 'short' pour un format de date court


  }

  createSchedule() {
    if (this.scheduleForm.valid) {
      this.scheduleService.createSchedule(this.scheduleForm.value)
        .subscribe(response => {
          this.dialogRef.close(response.data);  // Close the dialog and return the created schedule
        });
      location.reload();
    }
  }

  addScheduleAbsence(){
    this.scheduleForm.patchValue({
      status: "absence"
    });
    console.log(this.scheduleForm.value);
    this.scheduleService.createSchedule(this.scheduleForm.value).subscribe(response => {
      this.dialogRef.close(response.data);  // Close the dialog and return the created schedule
    });
    location.reload();
  }

  addScheduleConge(){
    this.scheduleForm.patchValue({
      status: "conge"
    });
    console.log(this.scheduleForm.value);
    this.scheduleService.createSchedule(this.scheduleForm.value).subscribe(response => {
      this.dialogRef.close(response.data);  // Close the dialog and return the created schedule
    });
    location.reload();
  }



}

