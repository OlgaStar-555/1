import type {MovieSeance} from "../../types/allData.ts";

export interface TicketForSend {
    row: number;
    place: number;
    coast: number;
}

export interface TicketWithPlace extends  TicketForSend {
    placeNum?: number;
}

export interface TicketProps {
    id: number;
    ticket_date: string;
    ticket_filmName: string;
    ticket_hallName: string;
    ticket_place: number;
    ticket_price: number;
    ticket_row: number;
    ticket_time: string;
}

export interface TicketSendProps {
    seanceId: number;
    ticketDate: string;
    tickets: TicketWithPlace[]
}


export interface PaymentProps  extends TicketSendProps{
    hallName: string;
    seanceTime: string;
    filmName: string;
}

export interface ClientContextType {
    paymentData: PaymentProps;
    updateDate: (date: string) => void;
    updateSeanceProps: (seance: MovieSeance, hallName: string, filmName: string) => void;
    updatePlaces: (tickets: TicketWithPlace[]) => void;
    todayMin: number;
    todayStrRu: string;
    todayStr: string;
    activeDate: string;
}