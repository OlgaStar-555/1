// import {useState} from "react";
import Films from "../components/films/Films.tsx";
import NavDate from "../components/NavDate/NavDate.tsx";
import type {AllData} from "../types.ts";
import {useRouteLoaderData} from 'react-router-dom';

export default function Content(data: AllData) {

    const allData  = useRouteLoaderData('root') as AllData

    console.log("New App");

    console.log(data)

    return (
        <>
            <NavDate/>
            <Films {...allData}></Films>
        </>
    );
}
