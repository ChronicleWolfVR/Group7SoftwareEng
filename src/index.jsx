import ReactDOM from "react-dom/client"; // Import the ReactDOM client for rendering

import App from "./App.jsx"; // Import the main App component
import "./index.css"; // Import the global CSS file

const entryPoint = document.getElementById("root"); // Get the root element from the HTML
ReactDOM.createRoot(entryPoint).render(<App />); // Create a root and render the App component into the root element