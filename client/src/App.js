import Layout from "./components/Layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Classes from "./pages/Classes";
import MyClasses from "./pages/MyClasses";
import Trainers from "./pages/Trainers";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Prices from "./pages/Prices";
import Gyms from "./pages/Gyms";
import MainPage from "./pages/MainPage";
import AddGym from "./pages/AddGym";
import AddClass from "./pages/AddClass";
import MyScheduledClasses from "./pages/MyScheduledClasses";
import MyGyms from "./pages/MyGyms";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/myclasses" element={<MyClasses />} />
          <Route path="/myscheduledclasses" element={<MyScheduledClasses />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/gyms" element={<Gyms />} />
          <Route path="/mygyms" element={<MyGyms />} />
          <Route path="/addgym" element={<AddGym />} />
          <Route path="/addclass" element={<AddClass />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
