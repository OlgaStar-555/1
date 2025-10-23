import {createContext, useContext} from "react";
import type { Dispatch, SetStateAction } from 'react';
import type {AllData} from "../types/allData.ts";

export interface AllDataContextType {
    allData: AllData | undefined;
    setAllData: Dispatch<SetStateAction<AllData | undefined>>;
}

export const AllDataContext = createContext<AllDataContextType | undefined>(undefined);

const useAllData = () => {
    const context = useContext(AllDataContext);
    if (!context) {
        throw new Error('useAllData must be used within a AllDataProvider');
    }
    return context;
};

export default  useAllData

