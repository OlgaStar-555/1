import './HallClient.css'

import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import useClientContext from "../ClientContext.tsx";
import API from "../../../API.ts";
import Legend from "../../../components/Legend/Legend.tsx";
import {
    HALL_PLACE_TYPES_CLIENT,
    type HallPlaceTypesClient,
    hallPlaceTypesClient
} from "../../../config/halls.ts";
import HallPlace from "../../../components/HallPlace/HallPlace.tsx";
import useAllData from "../../../context/AllDataContext.tsx";
import Button from "../../../components/Button/Button.tsx";
import useDoubleTap from "./useDoubleTap.tsx";
import {CONTENT_WIDTH} from "../../../config/constants.ts";
import type {TicketWithPlace} from "../paymentTypes.ts";
import {PAYMENT} from "../../../config/configRouter.ts";

export default function HallClient() {

    const [searchParams] = useSearchParams();

    const seanceId = Number(searchParams.get('seanceId'))

    const activeDateFromPath = searchParams.get('activeDate')

    const navigate = useNavigate()

    const {allData} = useAllData()

    const seance = allData?.seances?.find(seance => seance.id === seanceId)

    const hallId = seance?.seance_hallid
    const hall = allData?.halls?.find(hall => hall.id === hallId)

    const filmId = seance?.seance_filmid
    const film = allData?.films?.find(film => film.id === filmId)

    const {paymentData, activeDate, updateDate, updatePlaces, updateSeanceProps} = useClientContext()

    if (activeDateFromPath && activeDateFromPath !== activeDate) {
        updateDate(activeDateFromPath)
    }

    const [hallConfig, setHallConfig] = useState<string[][]>([])
    const [selectPlaces, setSelectPlaces] = useState<boolean[][]>([])

    const getEmptyPlaces = (stringArr: string[][]): boolean[][] => {
        return stringArr.map((row: string[]) => {
            return row.map(place => !place)
        })
    }

    const getHallConfig = useCallback(async () => {
        try {
            const result = await API.getHallConfig(seanceId, paymentData.ticketDate);
            if (result) {
                setHallConfig(result)

                setSelectPlaces(getEmptyPlaces(result))
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

    const handleHallChange = (row: number, col: number) => {
        const newHall = selectPlaces.map(rowArr => [...rowArr]);

        newHall[row][col] = !newHall[row][col];

        setSelectPlaces(newHall);
    };

    const handleClick = async () => {
        if (hallId !== undefined) {
            let placeCount = 0

            const tickets: TicketWithPlace[] = selectPlaces.flatMap((row, rowIdx) => {
                return row.map((isActive, colIdx): TicketWithPlace | null => {

                    const placeType = hallConfig[rowIdx][colIdx];

                    if (placeType !== 'disabled') {
                        placeCount++
                    }

                    if (!isActive) {
                        return null;
                    }

                    if (placeType !== 'standart' && placeType !== 'vip') {
                        return null;
                    }

                    const coast = (placeType === 'standart')
                        ? hall?.hall_price_standart
                        : (placeType === 'vip')
                            ? hall?.hall_price_vip
                            : 0;

                    if (!coast) {
                        return null;
                    }

                    return {
                        row: rowIdx + 1,
                        place: colIdx + 1,
                        coast: coast,
                        placeNum: placeCount
                    };
                }).filter((ticket): ticket is TicketWithPlace => ticket !== null);
            });

            if (tickets.length) {
                updatePlaces(tickets)
                if (seance !== undefined && hall !== undefined && film !== undefined) {
                    updateSeanceProps(seance, hall.hall_name, film.film_name)
                }

                navigate(`/${PAYMENT}/?seanceId=${seanceId}&date=${activeDate}`)
            }
        }
    }

    const [isScale, setIsScale] = useState(false)

    const handleSetScale = () => {
        if (window.innerWidth < CONTENT_WIDTH) {
            setIsScale(prevState => !prevState)
        }
    }

    const handleDoubleTap = (event: React.TouchEvent) => {
        handleSetScale()
        if (event.cancelable) {
            event.preventDefault();
        }
    };

    const doubleTapProps = useDoubleTap(handleDoubleTap);

    return (
        <article className='content content_seance'>
            <header className="seance__info"
                    {...doubleTapProps}
                    onDoubleClick={handleSetScale}
            >
                <h2 className='seance__title'>{film?.film_name}</h2>
                <p className="seance__subtitle">
                    {seance?.seance_time && `Начало сеанса: ${seance.seance_time}`}
                </p>
                <h3 className='seance__title'>{hall?.hall_name}</h3>
                <div className='seance__hint-box'>
                    Тапните дважды, чтобы {isScale ? 'уменьшить' : 'увеличить'}
                </div>
            </header>
            <section className="box box_hall-config">
                <div className="hall-config__wrapper"
                     style={
                         {
                             '--scaled-place-size': isScale ? 'calc(2 * var(--place-size))' : 'var(--place-size)',
                             '--scaled-hall-gap': isScale ? 'calc(2 * var(--hall-gap))' : 'var(--hall-gap)',
                             width: `calc(${(hall?.hall_places || 0)} * var(--place-size) + ${(hall?.hall_places || 0) - 1} * var(--hall-gap))`
                         } as React.CSSProperties
                     }
                >
                    <div className="hall-config__places"
                         style={
                             {
                                 gridTemplateRows: `repeat(${hallConfig.length}, 1fr`,
                                 gridTemplateColumns: `repeat(${hallConfig[0]?.length}, 1fr`,
                             }
                         }
                    >
                        {hallConfig.map((row: string[], idxRow: number) =>
                            row.map((placeType, idxCol: number) =>
                                (
                                    placeType !== 'disabled' ?
                                        (
                                            <HallPlace key={`${idxRow}-${idxCol}`}
                                                       row={idxRow} col={idxCol}
                                                       onPlaceClick={handleHallChange}
                                                       status={placeType as HallPlaceTypesClient}
                                                       isAdmin={false}
                                                       hall={hallConfig}
                                                       isActive={selectPlaces[idxRow][idxCol]}
                                            />
                                        ) : null
                                )
                            )
                        )}
                    </div>
                    <Legend
                        hallPlaceTypes={hallPlaceTypesClient}
                        hallPlaceTypesRu={HALL_PLACE_TYPES_CLIENT}
                        isClient={true}
                        priceList={
                            {
                                vip: hall?.hall_price_vip,
                                standart: hall?.hall_price_standart
                            }
                        }
                    />
                </div>
            </section>
            <div className='button-list'>
                <Button title='Забронировать'
                        isDisabled={!selectPlaces?.some((row: boolean[]) => {
                                return row.includes(true);
                            }
                        )}
                        handleClick={handleClick}
                />
            </div>
        </article>
    );
}