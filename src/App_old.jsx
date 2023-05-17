import { useState, useEffect } from 'react'
import axios from 'axios';
import { supabase } from '/src/config/supabaseClient'
import Navbar from "./components/Navbar";
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
// import dotenv from 'dotenv';
// dotenv.config();
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

//////////////////////// CRUD /////////////////////////

////// Show all of a user's dives

  const [ userDives, setUserDives ] = useState([])

  async function getUserDives() {
    const { data } = await supabase
        .from('Dive_Log')
        .select()
        .eq('user_id', session.user.id)
    setUserDives(data)
  }

  useEffect(() => { 
    getUserDives()
  }, [session]);

////// Add to dive log

async function addDive(diveLogObject) {
  const { data, error } = await supabase
      .from('Dive_Log')
      .insert({
          dive_number: diveLogObject.diveNum,
          date: diveLogObject.date,
          dive_site: diveLogObject.diveSite,
          max_depth: diveLogObject.maxDepth,
          bottom_time: diveLogObject.bottomTime,
          dive_type: diveLogObject.diveType,
          weather: diveLogObject.weather,
          water_conditions: diveLogObject.waterConditions,
          water_temperature: diveLogObject.waterTemperature,
          body_of_water: diveLogObject.bodyOfWater,
          equipment: diveLogObject.equipment,
          dive_buddy: diveLogObject.buddy,
          dive_company: diveLogObject.diveCompany,
          overall_feeling: diveLogObject.overallFeeling,
          user_id: diveLogObject.user_id
      })

      if (error) {
        console.log(error)
      }

      getUserDives()

}

////// Update a dive

async function updateDive(diveLogObject) {
  const { data, error } = await supabase
      .from('Dive_Log')
      .update({
          dive_number: diveLogObject.diveNum,
          date: diveLogObject.date,
          dive_site: diveLogObject.diveSite,
          max_depth: diveLogObject.maxDepth,
          bottom_time: diveLogObject.bottomTime,
          dive_type: diveLogObject.diveType,
          weather: diveLogObject.weather,
          water_conditions: diveLogObject.waterConditions,
          water_temperature: diveLogObject.waterTemperature,
          body_of_water: diveLogObject.bodyOfWater,
          equipment: diveLogObject.equipment,
          dive_buddy: diveLogObject.buddy,
          dive_company: diveLogObject.diveCompany,
          overall_feeling: diveLogObject.overallFeeling,
          user_id: diveLogObject.user_id
      })
      .eq('id', diveLogObject.id)
  
      getUserDives()

      if (error) {
        console.log(error)
      }

}

////// Delete a dive

async function deleteDive(diveId) {
  const { data, error } = await supabase
      .from('Dive_Log')
      .delete()
      .eq('id', diveId)

      getUserDives()

      if (error) {
        console.log(error)
      }
}

//////////////////////// CRUD /////////////////////////

//////////////////////// Dive Site API //////////////////////////

const [results, setResults] = useState({});

const Search = (q) => {

  console.log("Searching");

  const options = {

      method: 'GET',
      url: 'https://world-scuba-diving-sites-api.p.rapidapi.com/api/divesite',
      params: {
          country: q
        },    
      headers: {
          'X-RapidAPI-Key': '5f19ae380fmsh4d27eefa4a39e09p1e7e57jsne8215947bc70',
          'X-RapidAPI-Host': 'world-scuba-diving-sites-api.p.rapidapi.com'
      }
  };

  axios.request(options).then((response) => {
      setResults(response.data);
      console.log(response.data)
      console.log(results)
  });
}

//////////////////////// Dive Site API //////////////////////////

//////////////////////// Routes /////////////////////////

  return (
    <div className="container">
    <Router>
      <Navbar Search={ Search } />
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/userhome" element={<User_Home_Page key={session.user.id} session={session} />} />
        <Route path="/log-dive" element={<New_Dive onSubmit={ addDive }/>} />
        <Route path="/Dives" element={<Index userDives={ userDives } />} />
        <Route path="/Dives/:diveId" element={<Show userDives={ userDives }/>} />
        <Route path="/update/:diveId" element={<Update_Dive userDives={ userDives }  updateDive={ updateDive } deleteDive={ deleteDive } />} />
        <Route path="/divesite-search" element={<Search_Results results={ results }/> } />
      </Routes>
      
    </Router>
    </div>
  )
}

//////////////////////// Routes /////////////////////////
export default App;
