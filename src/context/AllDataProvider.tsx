import {type ReactNode, useCallback, useEffect, useState} from 'react';
import {AllDataContext} from "./AllDataContext";
import type {AllData} from "../types/allData.ts";
import getData from "../data.ts";

interface AllDataProviderProps {
    children: ReactNode;
}

const AllDataProvider = ({ children }: AllDataProviderProps) => {
    const [allData, setAllData] = useState<AllData | undefined>(undefined);

    const fetchData = useCallback(async () => {
        const result = await getData("alldata");
        if (result) {
            setAllData(result);

            console.log('\n\n\n\n\t\t\t!!!!!!!!!!!!!!!!!\t\tresult\n\n')
            console.log(result)

            return result
        }

    }, []);

    useEffect(() => {
        fetchData();
    }, []);



    return (
        <AllDataContext.Provider value={{ allData, setAllData }}>
            {children}
        </AllDataContext.Provider>
    );
};

export default AllDataProvider