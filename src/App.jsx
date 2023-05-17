import { useState, useEffect } from "react"
import { supabase } from "./config/supabaseClient"
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./components/Register";
import Account from "./components/Account";
import Home from "./components/Home";
import Auth from "./components/Auth";
import './App.css'
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import User_Home_Page from "./components/User_Home_Page";
import New_Dive from "./components/New_Dive";
import Index from "./components/Index";
import Show from "./components/Show";
import Update_Dive from "./components/Update_dive";
import Search_Results from "./components/Search_Results";

function App() {
  
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log(session);
    })
  }, [])

  return (
    <div className="container mx-auto">
      <BrowserRouter>
        <Navbar session={session} />
        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/register" element={ <Register /> } />

          <Route path="/account" element={!session ? (
            <Auth /> 
          ) : (
              <Account key={session.user.id} session={session} />
          )} />

          <Route path="/dives" element={!session ? (
            <div>
              <h1>User is not logged in</h1>
              <button onClick={() => { navigate("/")}}>Go back home!</button>
            </div>
          ) : (
            <Index key={session.user.id} session={session} /> 
          )} />

          <Route path="/dives/:diveId" element={!session ? (
            <div>
              <h1>User is not logged in</h1>
              <button onClick={() => { navigate("/")}}>Go back home!</button>
            </div>
          ) : (
            <Show key={session.user.id} session={session} /> 
          )} />

          <Route path="/log-dive" element={!session ? (
            <Auth /> 
          ) : (
              <New_Dive key={session.user.id} session={session} />
          )} />



          {/* <Route path="/log-dive" element={<New_Dive onSubmit={ addDive }/>} />
          <Route path="/Dives" element={<Index userDives={ userDives } />} />
          <Route path="/Dives/:diveId" element={<Show userDives={ userDives }/>} />
          <Route path="/update/:diveId" element={<Update_Dive userDives={ userDives }  updateDive={ updateDive } deleteDive={ deleteDive } />} />
          <Route path="/divesite-search" element={<Search_Results results={ results }/> } /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;