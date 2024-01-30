export class ReservationForCompany {
    id?: number;
    status?: ReservationStatus;
    price?: number;
    qrCode?: String;
   
}  

export enum ReservationStatus {
	CANCELLED,
	PENDING,
	REJECTED,
	TAKEN
  }