import "./assets/styles/css/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Auth } from "./pages";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
