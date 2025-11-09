import './Client.css'

import Films from "../../../components/films/Films.tsx";
import NavDate from "../../../components/navdate/NavDate.tsx";
import useAllData from "../../../context/AllDataContext.tsx";

export default function Client() {

    const {allData} = useAllData()

    return (
        <>
            <NavDate/>
            <Films {...allData}></Films>
        </>
    );
}
