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
import LoadingWrapper from "./components/LoadingWrapper";
import VerifyEmail from "./pages/VerifyEmail";

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
                <LoadingWrapper
                  authorization={authorization}
                  saveAuthorization={(auth) => setAuthorization(auth)}
                >
                  <Dashboard
                    authorization={authorization}
                    userProfileInfo={userProfileInfo}
                    onLogout={() => setAuthorization(null)}
                  />
                </LoadingWrapper>
              }
            />
            <Route
              path="/boatlist"
              element={
                <LoadingWrapper
                  authorization={authorization}
                  saveAuthorization={(auth) => setAuthorization(auth)}
                >
                  <Bootsuebersicht
                    authorization={authorization}
                    userProfileInfo={userProfileInfo}
                  />
                </LoadingWrapper>
              }
            />
            <Route path="/reservierungen" element={<Reservierungen />} />
            <Route
              path="/add-boot"
              element={
                <LoadingWrapper
                  authorization={authorization}
                  saveAuthorization={(auth) => setAuthorization(auth)}
                >
                  <AddNewBootForm
                    authorization={authorization}
                    userProfileInfo={userProfileInfo}
                  />
                </LoadingWrapper>
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
            <Route path="/verify-email/:userId" element={<VerifyEmail />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;
