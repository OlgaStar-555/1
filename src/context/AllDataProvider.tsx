import {type ReactNode, useCallback, useEffect, useState} from 'react';
import {AllDataContext} from "./AllDataContext";
import type {AllData} from "../types/allData.ts";
import API from "../API.ts";

interface AllDataProviderProps {
    children: ReactNode;
}

const AllDataProvider = ({children}: AllDataProviderProps) => {
    const [allData, setAllData] = useState<AllData | undefined>(undefined);

    const sortAllData = (allData: AllData) => {
        allData.seances?.sort((a, b) => {

            if (a.seance_time < b.seance_time) {
                return -1
            }
            if (a.seance_time > b.seance_time) {
                return 1
            }
            return 0
        })

        allData.halls?.sort((a, b) => {
            const hallNameA = a.hall_name.toLowerCase()
            const hallNameB = b.hall_name.toLowerCase()

            if (hallNameA < hallNameB) {
                return -1
            }
            if (hallNameA > hallNameB) {
                return 1
            }
            return 0
        })


    }


    const fetchAllData = useCallback(async () => {
        try {
            const result = await API.getAllData();
            if (result) {

                sortAllData(result)

                setAllData(result);

                console.log('\n\n\n\n\t\t\t!!!!!!!!!!!!!!!!!\t\tresult\n\n');
                console.log(result);
            }
        } catch (error) {
            console.error("Ошибка при получении данных: ", error);
        }
    }, []);

    const refreshAllData = useCallback(async (newData: AllData | undefined) => {
        console.log('\n\n\nREFRESH\n\n\n')

        console.log(newData)

        console.log({...allData, ...newData})

        try {
            if (newData) {
                setAllData((prevState) => {
                    const newState = {...prevState, ...newData}

                    sortAllData(newState)

                    return newState
                })
            }
        } catch (error) {
            console.error('Ошибка при получении данных: ', error);
        }
    }, [allData]);

    useEffect(() => {
        (async () => {
            try {
                await fetchAllData();
            } catch (error) {
                console.error('Ошибка при получении данных: ', error);
            }
        })();
    }, [fetchAllData, refreshAllData]);


    return (
        <AllDataContext.Provider value={{allData, setAllData, fetchAllData, refreshAllData}}>
            {children}
        </AllDataContext.Provider>
    );
};

export default AllDataProvider