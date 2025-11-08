import {createContext, useContext} from "react";
import type {ClientContextType} from "./paymentTypes.ts";


export const ClientContext = createContext<ClientContextType | undefined>(undefined);

const useClientContext = () => {
    const context = useContext(ClientContext);
    if (context === undefined) {
        throw new Error('useClientContext must be used within a ClientProvider');
    }
    return context;
};

export default useClientContext