import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Bootsuebersicht from "./pages/Bootsuebersicht";
import Reservierungen from "./pages/Reservierungen";
import Header from "./components/Header";
import AddNewBootForm from "./pages/AddNewBootForm";
import AddReservierung from "./pages/addReservierung";
import BoatDetail from "./pages/BoatDetail";
import Login from "./pages/Login";
import { useState } from "react";
import RegisterNewUser from "./pages/RegisterNewUser";

function App() {
  const [authorization, setAuthorization] = useState(null);
  const [userProfileInfo, setUserProfileInfo] = useState(null);
  return (
    <>
      <main>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  authorization={authorization}
                  userProfileInfo={userProfileInfo}
                />
              }
            />
            <Route
              path="/boatlist"
              element={
                <Bootsuebersicht
                  authorization={authorization}
                  userProfileInfo={userProfileInfo}
                />
              }
            />
            <Route path="/reservierungen" element={<Reservierungen />} />
            <Route
              path="/add-boot"
              element={
                <AddNewBootForm
                  authorization={authorization}
                  userProfileInfo={userProfileInfo}
                />
              }
            />
            <Route
              path="/add-reservierung/:bootId"
              element={<AddReservierung />}
            />
            <Route path="/boat-detail/:bootId" element={<BoatDetail />} />
            <Route
              path="/login"
              element={
                <Login
                  onLoginSuccess={(authorization, userProfileInfo) => {
                    setAuthorization(authorization);
                    setUserProfileInfo(userProfileInfo);
                  }}
                />
              }
            />
            <Route path="/register" element={<RegisterNewUser />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;