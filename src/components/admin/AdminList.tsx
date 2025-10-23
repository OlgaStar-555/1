import {useRouteLoaderData} from "react-router-dom";
import type {AllData} from "../../types/allData.ts";
import HallControl from "./AdminCards/HallControl.tsx";
import {useState} from "react";

export default function AdminList() {


    console.log('\n\n\t\tAdminList\n\n')
    const [allData, setAllData] = useState(useRouteLoaderData('root') as AllData)
    console.log(allData)


    const [hallsMap, setHallsMap] = useState(new Map(allData.halls?.map(hall => [hall.id, hall])))
    const [filmsMap, setFilmsMap] = useState(new Map(allData.films?.map(film => [film.id, film])))
    const [seancesMap, setSeancesMap] = useState(new Map(allData.seances?.map(seance => [seance.id, seance])))


    console.log(hallsMap)
    console.log(filmsMap)
    console.log(seancesMap)

    console.log(setSeancesMap)
    console.log(setFilmsMap)

    const useNewAllData = (elemName: string) => {
        console.log(elemName)
        const newAllData = useRouteLoaderData('root') as AllData
        setAllData(newAllData)



        setHallsMap(new Map(newAllData.halls?.map(hall => [hall.id, hall])))
        setFilmsMap(new Map(newAllData.films?.map(film => [film.id, film])))
        setSeancesMap(new Map(newAllData.seances?.map(seance => [seance.id, seance])))
    }




    return (
        <section className="card-list">
           <HallControl hallsMap={hallsMap} handleSubmit={useNewAllData}/>


        </section>

    )
}