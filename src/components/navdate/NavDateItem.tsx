import "./NavDate.css";

import type {DateData} from "./NavDate";
import type {ReactNode} from "react";
import useClientContext from "../../layout/client/ClientContext.tsx";

interface DateDataProps extends DateData {
    isActiveDate: boolean;
    setActiveDate: (newValue: string) => void;
}

export default function NavDateItem(props: DateDataProps): ReactNode {
    const {todayStrRu} = useClientContext()

    const handleClick = () => {
        props.setActiveDate(props.value);
    };

    return (
        <li className={`nav-line__item ${props.isActiveDate ? "active" : ""}`}>
            <button
                className={`nav-line__button button_date${props.day === 'сб' || props.day === 'вс' ? ' color_red' : ''}`}
                onClick={handleClick}
                title={props.hover}
            >
                {todayStrRu === props.hover && <span className="text">Сегодня</span>}
                <span className="text text_capitalize">{props.day}, </span>
                <span className="text">{props.date}</span>
            </button>
        </li>
    );
}
