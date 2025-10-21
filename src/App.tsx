import {useState} from "react";


import "./App.css";

import Background from "./components/bg/Background";
import Header from "./components/header/Header";
import {Outlet} from "react-router-dom";

export default function App() {
    console.log("App");

    const [isAdmin, setIsAdmin] = useState(false);

    const onClick = () => {
        console.log("13");
        setIsAdmin(!isAdmin);
    };

    return (
        <>
            <Background isAdmin={isAdmin}/>
            <Header onClick={onClick}/>
            <main>
                <div className="content-wrapper">
                    <Outlet/>

                </div>
            </main>
        </>
    );
}
