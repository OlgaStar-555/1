import './Payment.css'

import {useSearchParams} from 'react-router-dom';
import useClientContext from "../ClientContext.tsx";
import API from "../../../API.ts";
import useAllData from "../../../context/AllDataContext.tsx";
import Button from "../../../components/Button/Button.tsx";
import {useState} from "react";
import type {TicketForSend, TicketProps, TicketWithPlace} from "../paymentTypes.ts";

import QRCodeDisplay from './QRCodeDisplay.tsx';

export default function HallClient() {

    const [searchParams] = useSearchParams();

    const seanceId = Number(searchParams.get('seanceId'))

    const activeDateFromPath = searchParams.get('activeDate')


    const {allData} = useAllData()

    const seance = allData?.seances?.find(seance => seance.id === seanceId)

    const {paymentData, activeDate, updateDate} = useClientContext()

    if (activeDateFromPath && activeDateFromPath !== activeDate) {
        updateDate(activeDateFromPath)
    }

    const [ticketData, setTicketData] = useState<TicketProps[] | undefined>()

    const handleClick = async () => {

        const tickets: TicketForSend[] = paymentData.tickets.map(ticket => {
            const remainingProps: TicketWithPlace = {...ticket};
            delete remainingProps?.placeNum

            return remainingProps
        });

        await API.addTickets(paymentData.seanceId, paymentData.ticketDate, tickets).then((data) => {
            if (data) {
                setTicketData(data)
            }
        })
    }

    const hallName = paymentData.hallName.split(' ')[0] === 'Зал'
        ? paymentData.hallName.split(' ').splice(1).join(' ')
        : paymentData.hallName

    const placesArr = paymentData.tickets.map(ticket => ticket.placeNum)
    const placesStr = placesArr.join(', ')

    const totalCoast: number = paymentData.tickets.reduce((accumulator, currentTicket) => {
        return accumulator + currentTicket.coast;
    }, 0);

    return (
        <article className='card card_payment'>
            <header className="payment__box">
                <h2 className='payment__title'>
                    Вы выбрали билеты:
                </h2>
            </header>
            <section className="payment__box">
                <div className="payment__body">
                    <dl className="payment__info">
                        <div className="info__item">
                            <dt className="info-item__title">
                                На фильм:
                            </dt>
                            <dd className="info-item__description">
                                {paymentData.filmName}
                            </dd>
                        </div>
                        <div className="info__item">
                            <dt className="info-item__title">
                                Места:
                            </dt>
                            <dd className="info-item__description">
                                {placesStr}
                            </dd>
                        </div>
                        <div className="info__item">
                            <dt className="info-item__title">
                                В зале:
                            </dt>
                            <dd className="info-item__description">
                                {hallName}
                            </dd>
                        </div>
                        <div className="info__item">
                            <dt className="info-item__title">
                                Начало сеанса:
                            </dt>
                            <dd className="info-item__description">
                                {seance?.seance_time}
                            </dd>
                        </div>
                        {ticketData === undefined &&
                            <div className="info__item">
                                <dt className="info-item__title">
                                    Стоимость:
                                </dt>
                                <dd className="info-item__description">
                                    {totalCoast}<span className='default-text'> рублей</span>
                                </dd>
                            </div>
                        }
                    </dl>
                    {ticketData === undefined ? (
                        <div className='button-list'>
                            <Button title='Получить код бронирования'
                                    handleClick={handleClick}
                            />
                        </div>
                    ) : (
                        <div className="payment__qr-wrapper">
                            <QRCodeDisplay tickets={ticketData as TicketProps[]}/>
                        </div>
                    )}
                    <p className="payment__text">

                        {ticketData === undefined
                            ?
                            <span className='text__item'>После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал.</span>
                            :
                            <span className='text__item'>Покажите QR-код нашему контроллеру для подтверждения бронирования.</span>
                        }
                        <span className='text__item'>Приятного просмотра!</span>
                    </p>
                </div>
            </section>
        </article>
    );
}