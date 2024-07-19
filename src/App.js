// Import necessary components from react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrintPage from "./pages/index.js";

function App() {
  return (
    // Wrap your application in the BrowserRouter component
    <BrowserRouter>
      {/* Define your routes within Routes component */}
      <Routes>
        <Route path="/" element={<PrintPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
