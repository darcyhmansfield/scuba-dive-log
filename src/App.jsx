import CRUDTesting from "./components/CRUDTesting"
import Login from "./components/Login";
import User_Home_Page from "./components/User_Home_Page";
import New_Entry from "./components/New_Entry";
import Index from "./components/Index";
import Show from "./components/Show";
import Update from "./components/Update";
import APItest from "./components/API-Test";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/crudtest" element={<CRUDTesting />} />
        <Route path="/userhome" element={<User_Home_Page />} />
        <Route path="/newentry" element={<New_Entry />} />
        <Route path="/index" element={<Index />} />
        <Route path="/show" element={<Show />} />
        <Route path="/update" element={<Update />} />
        <Route path="/apitest" element={<APItest />} />

      </Routes>
    </Router>
  )
}

export default App;
