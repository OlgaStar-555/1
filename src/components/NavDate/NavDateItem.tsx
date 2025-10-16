import "./NavDate.css";

import type { DateData } from "./NavDate";
import type { ReactNode } from "react";
// import {setActiveDate} from "./NavDate"

interface DateDataProps extends DateData {
  isActiveDate: boolean;
  setActiveDate: (newValue: string) => void;
}

export default function NavDateItem(props: DateDataProps): ReactNode {
  const handleClick = () => {
    props.setActiveDate(props.value);
  };

  const today = new Date().toISOString().split("T")[0];
  console.log("\n\n\t\ttoday\t", today);

  console.log("\t\t\t", today === props.value);

  return (
    <li className={`nav-line__item ${props.isActiveDate ? "active" : ""}`}>
      <button
        className="nav-line__button button_date"
        onClick={handleClick}
        title={props.value.split("-").reverse().join(".")}
      >
        {today === props.value && <span className="text">Сегодня</span>}
        <span className="text text_capitalize">{props.day}, </span>
        <span className="text">{props.date}</span>
      </button>
    </li>
  );
}
