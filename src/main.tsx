import ReactDOM from "react-dom/client"
import Modal from "react-modal"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import "./index.css"
import App from "./App.tsx"


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    // <React.StrictMode>
        <div>
            <App />
            <ToastContainer />
        </div>
    // </React.StrictMode>
);

Modal.setAppElement("#root");
