import {useState} from "react";
import type {MovieHall} from "../../../types/allData.ts";


interface HallsProps {
    hallsMap: Map<number, MovieHall>;
    handleSubmit: (elemName: string) => void;
}

export default function HallControl(props: HallsProps) {





    console.log(props.hallsMap)
    console.log(props.handleSubmit)

    const [loading, setLoading] = useState<boolean>(false);
    const handleLoading = () => {
        setLoading(true)


        setLoading(false)
    }

    return (
        <article className="card card_admin card_accordion">
            <input type="checkbox" id="hall-control" className="accordion__checkbox"/>
            <label htmlFor="hall-control" className="card__header accordion__button">
                <h3 className="title">

                </h3>
            </label>
            <form className="card__body" onSubmit={handleLoading}>
                <button className="button button_submit" type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Создать зал'}
                </button>
            </form>
        </article>
    )
}