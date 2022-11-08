import { Global } from "@emotion/react";
import emotionReset from "emotion-reset";
import  React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import { CodingPage } from "./pages/CodingPage";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
    <Global styles={emotionReset}/>
        <BrowserRouter>
            <Routes>
                <Route path="/coding" element={<CodingPage/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);