export interface Schedule {
  id: string;
  userID: string;
  firstName: string;
  date: Date;
  status: string,
  travel_time: string;
  load_status: boolean;
  unload_status: boolean;
  arrival_time: string;
  departure_time: string;
  break_time: string;
  panier: boolean;
  grand_deplacement: boolean;
  work_location: string;
  total_work_time: string;
  commentaire: string;
  validated: boolean;
}
