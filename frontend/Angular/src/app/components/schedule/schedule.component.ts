  import {ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
  import { ScheduleService } from '../../services/schedule.service';
  import { Schedule } from '../../models/schedule.model';
  import {ScheduleResponse} from "../../models/Schedule-response";
  import {MatPaginator} from '@angular/material/paginator';
  import {MatTableDataSource} from "@angular/material/table";
  import {MatSort} from "@angular/material/sort";

  import {DatePipe, registerLocaleData} from '@angular/common';
  import localeFr from '@angular/common/locales/fr';
  import {AuthService} from "../../services/auth.service";
  import {ProfilService} from "../../services/profil.service";


  //----Calendrier Import------//
  import {CalendarOptions, Calendar, EventClickArg, EventApi, ViewApi, EventInput} from '@fullcalendar/core';
  import { FullCalendarComponent } from '@fullcalendar/angular';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import timeGridPlugin from '@fullcalendar/timegrid'
  import interactionPlugin, {DateClickArg} from '@fullcalendar/interaction'; // for dateClick
  import listPlugin from '@fullcalendar/list';
  import { MatDialog } from '@angular/material/dialog';
  import { CreateScheduleDialogComponent } from '../create-schedule-dialog/create-schedule-dialog.component';
  import {ScheduleDayDialogComponent} from "../schedule-day-dialog/schedule-day-dialog.component";

  //----PDF import-------//
  import jsPDF from 'jspdf';
  import autoTable from 'jspdf-autotable'



  registerLocaleData(localeFr, 'fr');


    @Component({
      selector: 'app-schedule',
      templateUrl: './schedule.component.html',
      styleUrls: ['./schedule.component.scss']
    })


    export class ScheduleComponent implements OnInit, AfterViewInit {
      displayedColumns: string[] = [ 'date', 'travel_time', 'load_status', 'unload_status', 'arrival_time', 'departure_time', 'break_time','panier', 'grand_deplacement', 'work_location', ];

      dataSource!: MatTableDataSource<Schedule>;
      userNames: string[] = [];
      selectedUser = '';
      role: string|null='';
      nameUser!: string;
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;

      constructor(
        private dialog: MatDialog,
        private scheduleService: ScheduleService,
        private authService : AuthService,
        private userService: ProfilService,
        private cdr: ChangeDetectorRef
      ) { }

      //Calendrier
      eventsLoaded = false;

      @ViewChild(FullCalendarComponent) calendarComponent!: FullCalendarComponent;
      totalWorkHours = 0;
      totalPanier = 0;
      totalGrandDeplacement = 0;

      calendarOptions: CalendarOptions = {
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'listWeek,dayGridWeek,dayGridMonth'
        },
        initialView: 'dayGridWeek',
        locale: 'fr',
        titleFormat: {year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'},
        firstDay: 1,
        hiddenDays: [6, 0], // cache le samedi et le dimanche
        events: [],  // initialize as empty array
        eventClick: this.openScheduleDialog.bind(this),
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
        editable: false,
        height: 600,  // définir la hauteur à 700px,

        //affiche la bulle de dialog correspondante ajout/modifier event
        dateClick: (clickInfo) => {
          // Get the clicked date
          let clickedDate = clickInfo.date;

          // Get all events from the calendar
          let calendarApi = clickInfo.view.calendar;
          let allEvents = calendarApi.getEvents();

          // Find if there's already an event for the clicked date
          let eventForClickedDate = allEvents.find((event) => {
            return event.start && event.start.toISOString() === clickedDate.toISOString();
          });

          if (eventForClickedDate) {
            // If an event already exists for the clicked date, open the schedule dialog
            this.openScheduleDialog({
              event: eventForClickedDate,
              el: clickInfo.dayEl,
              jsEvent: clickInfo.jsEvent,
              view: clickInfo.view
            });
          } else {
            // If no event exists for the clicked date, open the add schedule dialog
            this.openAddScheduleDialog(clickInfo);
          }
        },
        datesSet: (view) => {
          this.calculateTotalWorkHours(view);
        },
        eventContent: function(arg) {
          var arrayOfDomNodes = [];

          var titleEl = document.createElement('div');
          titleEl.classList.add('fc-event-title');
          titleEl.innerHTML = arg.event.title;
          arrayOfDomNodes.push(titleEl);

          var subtitleEl = document.createElement('div');
          subtitleEl.classList.add('fc-event-subtitle');
          subtitleEl.innerHTML = arg.event.extendedProps['subtitle'];
          arrayOfDomNodes.push(subtitleEl);

          var validationEl = document.createElement('div');
          validationEl.classList.add('fc-event-validation');
          validationEl.innerHTML = arg.event.extendedProps['validation'];
          arrayOfDomNodes.push(validationEl);

          return {domNodes: arrayOfDomNodes};
        }

      }


      ngOnInit() {
        this.authService.setLoggedIn(true); // après une connexion réussie

        //récupérer les roles et users
        this.userService.getRole().subscribe(role => {
          this.role = role;

          if(this.role =='administrateur'){
            this.scheduleService.getAllNames().subscribe(names => {
              this.userNames = names;
            });
          }
          this.loadEvents();
        }, error => {
          console.error('Error:', error);
        });
      }

      ngAfterViewInit() {
        const calendarApi = this.calendarComponent.getApi();  // Get the calendar API
        const view = calendarApi.view;  // Get the current view
        this.calculateTotalWorkHours(view);
      }



      //----------Séléction de l'User--------//
      onUserChange() {
        this.scheduleService.getSchedulesForUser(this.selectedUser).subscribe((response: ScheduleResponse) => {
          this.calendarOptions.events = response.data.map(item => {
            // Create a common event object
            let event = {
              id: item.id,
              title: item.total_work_time + ' heures', // default title
              subtitle: item.commentaire,
              validation: '',
              date: item.date,
              status: item.status,
              // Mapping the rest of the keys to your interface
              travel_time: item.travel_time,
              load_status: item.load_status,
              unload_status: item.unload_status,
              arrival_time: item.arrival_time,
              departure_time: item.departure_time,
              break_time: item.break_time,
              panier: item.panier,
              grand_deplacement: item.grand_deplacement,
              work_location: item.work_location,
              total_work_time: item.total_work_time,
              commentaire: item.commentaire,
              validated: item.validated,

              // Style properties
              color: 'blue',
              textColor: 'black',
              backgroundColor: '#92dde1',
              borderColor: 'darkblue',
              classNames: ['my-custom-class'],
              display: 'block',
            };

            if (item.status === 'absence') {
              event.title = 'Absent';
              event.color = 'red';
            } else if (item.status === 'conge') {
              event.title = 'Congé';
              event.color = 'green';
            }
            //validation
            if (item.validated){
              event.validation += ' Validé ✅';
              event.borderColor= '#39ff00';

            } else {
              event.validation += ' Non validé ❌';
              event.borderColor= '#ff0000';
            }

            // If not an admin, modify the title
            if(this.role == 'administrateur') {
              event.title = item.firstName+ ' : '+item.total_work_time +' heures';
            }

            return event;
          });
        });
      }


      //--------Charge les horaires ( si admin charge tous les horaires, sinon charge que User_id-------//
      loadEvents() {
        this.scheduleService.getSchedules().subscribe((response: ScheduleResponse) => {
          this.calendarOptions.events = response.data.map(item => {
            // Create a common event object
            this.nameUser = item.firstName;
            let event = {
              id: item.id,
              title: item.total_work_time + ' heures', // default title
              subtitle: item.commentaire,
              validation: '',

              // Mapping the rest of the keys to your interface*
              date: item.date,
              status: item.status,
              firstName: item.firstName,
              travel_time: item.travel_time,
              load_status: item.load_status,
              unload_status: item.unload_status,
              arrival_time: item.arrival_time,
              departure_time: item.departure_time,
              break_time: item.break_time,
              panier: item.panier,
              grand_deplacement: item.grand_deplacement,
              work_location: item.work_location,
              total_work_time: item.total_work_time,
              commentaire: item.commentaire,
              validated: !!item.validated,

              // Style properties
              color: 'blue',
              textColor: 'black',
              backgroundColor: '#92dde1',
              borderColor: 'darkblue',
              classNames: ['my-custom-class'],
              display: 'block',

            };

            // Adjust the color and title of the event based on the status
            if (item.status === 'absence') {
              event.title = 'Absent';
              event.backgroundColor = '#ff9595' ;
            } else if (item.status === 'conge') {
              event.title = 'Congé';
              event.backgroundColor = 'lightgreen';
            }

            //validation
            if (item.validated){
              event.validation += ' Validé ✅';
              event.borderColor= '#39ff00';

            } else {
              event.validation += ' Non validé ❌';
              event.borderColor= '#ff0000';
            }

            // If not an admin, modify the title
            if(this.role == 'administrateur') {
              event.title = item.firstName+ ' : '+item.total_work_time +' heures';
            }

            return event;
          })
          this.eventsLoaded = true;
        });

      }



      openAddScheduleDialog(arg: DateClickArg) {
        // Open the add schedule dialog
        const dialogRef = this.dialog.open(CreateScheduleDialogComponent, {
          width: '50%',
          data: { date: arg.dateStr }  // Passing the clicked date to the dialog
        });
        //
        // dialogRef.afterClosed().subscribe(result => {
        //   if (result) {
        //     // If there's result, that means the dialog was not cancelled
        //     // Add the new event to the calendar and refresh it
        //     let calendarApi = arg.view.calendar;
        //     calendarApi.addEvent({
        //       id: result.scheduleID,
        //       title: result.firstName,
        //       start: result.Date,
        //       // ... Add other necessary properties
        //     });
        //     calendarApi.unselect();  // Clear date selection
        //   }
        // });


      }


      //affiche la fenetre de l'event
      openScheduleDialog(event: any): void {
        this.dialog.open(ScheduleDayDialogComponent, {
          width: '50%',
          data: event, // Cela envoie les données de l'événement au composant du dialogue
          closeOnNavigation: true,

        });
      }

      // Définissez la méthode en dehors de calendarOptions
      calculateTotalWorkHours(view: any): void {
        // Check if events have been loaded before calculating total work hours
        if (this.eventsLoaded) {
          let viewStart =view.start;
          let viewEnd = view.end;

          this.totalWorkHours = 0;  // Reset total work hours
          this.totalPanier = 0;
          this.totalGrandDeplacement = 0;

          let calendarApi = this.calendarComponent.getApi();
          let events = calendarApi.getEvents();

          events.forEach((event: any) => {
            if (event.start) {  // Check if event.start is defined
                let eventStart = new Date(event.start);


                if (eventStart >= viewStart && eventStart < viewEnd) {

                  if (event.extendedProps && event.extendedProps['total_work_time']) {
                    this.totalWorkHours += parseFloat(event.extendedProps['total_work_time']);  // Converted string to number
                  }
                  if (event.extendedProps && event.extendedProps['panier']=='1') {
                    this.totalPanier +=1;
                  }
                  if (event.extendedProps && event.extendedProps['grand_deplacement']=='1') {
                    this.totalGrandDeplacement +=1;
                  }
                }
            }

          });
        }
      }

      //----------------PDF----------------//
      generatePDF() {
        let doc = new jsPDF();

        // Ajoute le logo.
        //doc.addImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQv3Hcg4Ax8V6PC6UsY8_ISERwWTE2GaeVmCOr1hMKqA&s", 'JPEG', 15, 40, 180, 160);

        // Ajoute le titre.
        doc.setFontSize(20);
        doc.text('Horaires TURCAN', 15, 30);


        // Crée le tableau avec les événements.
        const calendarApi = this.calendarComponent.getApi();  // Get the calendar API
        const view = calendarApi.view;  // Get the current view
        let viewStart = view.activeStart;
        let viewEnd = view.activeEnd;
        let events = calendarApi.getEvents();

        const tableData: any[] = [];
        const datePipe = new DatePipe('fr');

        // Ajoute le nom d'utilisateur et la date.
        let formattedViewStart = datePipe.transform(viewStart, 'fullDate')
        doc.setFontSize(14);
        doc.text(`Nom d'utilisateur: ${this.nameUser}`, 15, 70);
        doc.text(`Date de vue: ${formattedViewStart}`, 15, 85);


        events.forEach((event: any) => {
          if (event.start) {  // Check if event.start is defined
            let eventStart = new Date(event.start);

            let formattedDate = datePipe.transform(eventStart, 'fullDate')

            if (eventStart >= viewStart && eventStart < viewEnd) {
              if (event.extendedProps && event.extendedProps['total_work_time']) {
                tableData.push([
                  formattedDate,  // Date
                  event.extendedProps.travel_time,
                  event.extendedProps.load_status == "1",
                  event.extendedProps.unload_status == "1",
                  event.extendedProps.arrival_time,
                  event.extendedProps.departure_time,
                  event.extendedProps.break_time,
                  event.extendedProps.panier == "1",
                  event.extendedProps.grand_deplacement == "1",
                  event.extendedProps.work_location ,
                  event.extendedProps.total_work_time
                ]);
              }
            }
          }
        });

        // Ajoute le tableau au PDF.
        autoTable(doc,{
          head: [
            ['Date', 'Temps de trajet', 'Chargement', 'Dechargement', "Heure d'arrivée", 'Heure de départ', 'Temps de pause', 'Panier', 'Grand déplacement', 'Lieu', 'Temps de travail du jour']
          ],
          body: tableData,
          startY: 100
        });

        doc.save('rapport.pdf');
      }


}
