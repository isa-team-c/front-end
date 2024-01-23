import { User } from "src/app/infrastructure/auth/model/user.model";
import { Equipment } from "../../user/model/equipment.model";
import { Appointment } from "./appointment.model";

export class Reservation {
    id?: number;
    status?: ReservationStatus;
    price?: number;
    qrCode?: String;
    equipment?: Equipment[];
    appointment?: Appointment;
    user?: User;
}  

export enum ReservationStatus {
	CANCELLED,
	PENDING,
	REJECTED,
	TAKEN
  }