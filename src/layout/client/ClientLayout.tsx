import {Outlet} from 'react-router-dom';
import {ClientProvider} from "./ClientProvider.tsx";

export default function ClientLayout() {
    return (
        <ClientProvider>
            <Outlet/>
        </ClientProvider>
    );
};
