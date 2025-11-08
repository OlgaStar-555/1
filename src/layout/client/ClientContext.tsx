import { createContext, useContext, useState, type ReactNode } from 'react';
// Импортируем типы из нового файла
import type { PaymentProps, ClientContextType } from './paymentTypes.ts';
import type {MovieSeance} from "../../types/allData.ts";

// Создаем сам контекст
const ClientContext = createContext<ClientContextType | undefined>(undefined);

// Создаем компонент Провайдера
// Используем синтаксис пропсов { children }
export function ClientContextProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<PaymentProps | null>(null);

    const [paymentDate, setPaymentDate] = useState<string>('')

    const [paymentSeanceData, setPaymentSeanceData] = useState<MovieSeance>()

    const [paymentPlaces, setPaymentPlaces] = useState<number[]>([])

    const updateData = (newData: PaymentProps) => {
        setData(newData);
    };

    return (
        <ClientContext.Provider value={{ data, updateData }}>
            {children}
        </ClientContext.Provider>
    );
}

const useClientContext = () => {
    const context = useContext(ClientContext);
    if (context === undefined) {
        throw new Error('useClientContext must be used within a ClientContextProvider');
    }
    return context;
};
