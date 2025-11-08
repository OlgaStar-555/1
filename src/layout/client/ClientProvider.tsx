import {useState, type ReactNode, useCallback} from 'react';
// Импортируем типы из нового файла
import type {PaymentProps, Ticket} from './paymentTypes.ts';
import type {MovieHall, MovieSeance} from "../../types/allData.ts";
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
        }
    );

    const updateDate = useCallback((date: string) => {
        console.log('\n\n\tupdateDate FUNC', date)

        setPaymentData((prevData) => {
            console.table(prevData)
            console.table({...prevData, ticketDate: date})
            console.log('\n\n')
            return {...prevData, ticketDate: date}
        })

        setActiveDate(date)

    }, [])

    const updateSeanceProps = useCallback((seance: MovieSeance, hall: MovieHall) => {
        setPaymentData((prevData) => {
            console.log('\n\n\tupdateSeanceProps\tsetPaymentData FUNC')
            console.table(prevData)
            console.table({
                ...prevData,
                seanceId: seance.id,
                hallName: hall.hall_name,
                seanceTime: seance.seance_time
            })
            console.log('\n\n')

            return {
                ...prevData,
                seanceId: seance.id,
                hallName: hall.hall_name,
                seanceTime: seance.seance_time
            }
        })
    }, [])

    const updatePlaces = useCallback((tickets: Ticket[]) => {
        setPaymentData((prevData) => {
            console.log('\n\n\tupdatePlaces\t FUNC')
            console.table(prevData)
            console.table(tickets)
            console.log('\n===>\n')
            console.table({
                ...prevData,
                tickets: tickets
            })
            console.log('\n\n')
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

