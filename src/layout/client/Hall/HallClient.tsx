import {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import useClientContext from "../ClientContext.tsx";
import API from "../../../API.ts";

export default function HallClient() {

    const {seanceId} = useParams();

    const {paymentData} = useClientContext()
    console.log('\n\n\tHALL')

    console.table(paymentData)

    const [hallConfig, setHallConfig] = useState<string[][]>([])

    const getHallConfig = useCallback(async () => {
        try {
            console.log('\n\n\t\tgetHallConfig')
            console.log('\nseanceId\t', seanceId)
            console.log('\npaymentData.ticketDate\t', paymentData.ticketDate)

            const result = await API.getHallConfig(Number(seanceId), paymentData.ticketDate);
            if (result) {

                setHallConfig(result)
                console.log('\n\n\n\n\t\t\t!!!!!!!!!!!!!!!!!\tsetHallConfig\t\tresult\n');
                console.log(result);
            }
        } catch (error) {
            console.error("Ошибка при получении данных: ", error);
        }
    }, [seanceId, paymentData]);


    useEffect(() => {
        (async () => {
            try {
                await getHallConfig();
            } catch (error) {
                console.error('Ошибка при получении данных: ', error);
            }
        })();
    }, [getHallConfig]);


    console.log('seanceId')
    console.log(seanceId)

    console.log('hallConfig')
    console.log(hallConfig)


    return (
        <div>
            <h1>Сеанс: {seanceId}</h1>
            <h2>Сеанс: {hallConfig.toString()}</h2>
        </div>
    );

}