import {StrictMode} from "react";
import ReactDOM from "react-dom/client";
import './index.css';

import App from "./components/App";
import { QuizProvider } from "./Context/QuizContext";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <StrictMode>
        <QuizProvider>
             <App />
        </QuizProvider>
    </StrictMode>
)