import {createBrowserRouter} from "react-router-dom";
import App from "./App.tsx";
import Content from "./layout/Content";
import Payment from "./components/Payment.tsx";
import getData from "./data.ts";
import {Suspense} from "react";
import LoadingFallback from "./layout/loader.tsx";



async function rootLoader() {
    return await getData('alldata')
}

export const router = createBrowserRouter([
    {
        path: "/",
        id: 'root',
        element:  <Suspense fallback={<LoadingFallback />}> <App /> </Suspense>,
        hydrateFallbackElement: <LoadingFallback />,
        loader: rootLoader,
        children: [
            {
                index: true,
                Component: Content
            },
            {path: "payment", Component: Payment},

        ],
    },
]);