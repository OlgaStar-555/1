import "./NavDate.css";

import {useState, useRef, useEffect} from "react";
import type { ReactNode } from "react";
import NavDateItem from "./NavDateItem";
import NavDateNav from "./NavDateNav";
import useClientContext from "../../layout/client/ClientContext.tsx";
import {LENGTH_OF_DAY} from "../../config/constants.ts";

export interface DateData {
  value: string;
  hover: string;
  date: number;
  day: string;
}


const DAYS_COUNT = 10;
const DAYS_OF_WEEK = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];


const today = new Date();

today.setHours(0, 0, 1, 1)

const dateList: DateData[] = Array.from({ length: DAYS_COUNT }, (_, i) => {
  return new Date(today.getTime() + LENGTH_OF_DAY * i);
}).map((date) => {
  const dateValue = date.toLocaleString().split(",")[0]

  return {
    hover: dateValue,
    value: dateValue.split('.').reverse().join('-'),
    date: date.getDate(),
    day: DAYS_OF_WEEK[date.getDay()],
  };
});

export default function NavDate(): ReactNode {

  const {updateDate} = useClientContext();


  const [activeDate, setActiveDate] = useState(dateList[0]["value"]);

  useEffect(() => {
    console.log('useEffect updateDate')
    updateDate(dateList[0]["value"])
  }, [updateDate]);

  const [listTranslate, setListTranslate] = useState(0);

  const elList = useRef<HTMLUListElement>(null);
  const elListWrapper = useRef<HTMLDivElement>(null);

  const [listWidth, setListWidth] = useState(0);
  const [listWrapperWidth, setListWrapperWidth] = useState(0);

  useEffect(() => {
    if (elListWrapper.current && elList.current) {
      setListWidth(elList.current.offsetWidth);

      setListWrapperWidth(elListWrapper.current.offsetWidth);
    }
  }, []);

  return (
    <section className="nav-line">
      <div className="nav-line__list-wrapper" ref={elListWrapper}>
        <ul
          className="row nav-line__list"
          ref={elList}
          style={{
            transform: `translateX(${listTranslate}px)`,
          }}
        >
          {dateList.map(
            (dateItem: DateData): ReactNode => (
              <NavDateItem
                key={dateItem.value}
                isActiveDate={activeDate === dateItem.value}
                setActiveDate={() => {
                  setActiveDate(dateItem.value)
                  updateDate(dateItem.value)
                }}
                {...dateItem}
              />
            )
          )}
        </ul>
      </div>

      <NavDateNav
        setTranslate={setListTranslate}
        translate={listTranslate}
        translateStep={listWrapperWidth}
        maxTranslate={listWrapperWidth - listWidth}
      />
    </section>
  );
}
