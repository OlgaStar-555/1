import './admin.css'

import {Outlet} from "react-router-dom";
import useAllData from "../../context/AllDataContext.tsx";

export default function Admin() {

    const { allData, setAllData } = useAllData();

    console.log(allData)
    console.log(setAllData)


    return (
        <Outlet/>
    )
}