import {useState, type ReactNode, useCallback} from 'react';
import type {PaymentProps, TicketWithPlace} from './paymentTypes.ts';
import type {MovieSeance} from "../../types/allData.ts";
import {ClientContext} from './ClientContext.tsx';
import {getNumFromTime} from "../../functions.ts";

export function ClientProvider({children}: { children: ReactNode }) {

    const now = new Date();

    const todayStrRu = now.toLocaleString().split(',')[0]

    const todayMin = getNumFromTime(`${now.getHours()}:${now.getMinutes()}`)

    const todayStr = todayStrRu.split('.').reverse().join('-')

    const [activeDate, setActiveDate] = useState(todayStr)

    const [paymentData, setPaymentData] = useState<PaymentProps>(
        {
            seanceId: 0,
            ticketDate: todayStr,
            tickets: [],
            hallName: '',
            seanceTime: '',
            filmName: ''
        }
    );

    const updateDate = useCallback((date: string) => {
        setPaymentData((prevData) => {
            return {...prevData, ticketDate: date}
        })

        setActiveDate(date)

    }, [])

    const updateSeanceProps = useCallback((seance: MovieSeance, hallName: string, filmName: string) => {
        setPaymentData((prevData) => {
            return {
                ...prevData,
                seanceId: seance.id,
                seanceTime: seance.seance_time,
                hallName: hallName,
                filmName: filmName
            }
        })
    }, [])

    const updatePlaces = useCallback((tickets: TicketWithPlace[]) => {
        setPaymentData((prevData) => {
            return {
                ...prevData,
                tickets: tickets
            }
        })
    }, [])

    return (
        <ClientContext.Provider value={{
            paymentData,
            updateDate,
            updateSeanceProps,
            updatePlaces,
            todayMin,
            todayStrRu,
            todayStr,
            activeDate
        }}>
            {children}
        </ClientContext.Provider>
    );
}

