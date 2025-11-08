// import type {Dispatch, SetStateAction} from "react";
import type {MovieHall, MovieSeance} from "../../types/allData.ts";

export interface Ticket {
    row: number;
    place: number;
    coast: number;
}

export interface TicketProps {
    id: number;
    ticket_date: string;
    ticket_time: string;
    ticket_filmName: string;
    ticket_hallName: string;
    ticket_row: number;
    ticket_place: number;
    ticket_price: number;
}

export interface TicketSendProps {
    seanceId: number;
    ticketDate: string;
    tickets: Ticket[]
}


export interface PaymentProps  extends TicketSendProps{
    hallName: string;
    seanceTime: string;
}

export interface ClientContextType {
    paymentData: PaymentProps;
    updateDate: (date: string) => void;
    updateSeanceProps: (seance: MovieSeance, hall: MovieHall) => void;
    updatePlaces: (tickets: Ticket[]) => void;
    todayMin: number;
    todayStrRu: string;
    todayStr: string;
    activeDate: string;

    // setPaymentData: Dispatch<SetStateAction<PaymentProps | undefined>>;
}