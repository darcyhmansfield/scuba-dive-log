import { useState, useEffect } from 'react';
import { supabase } from '/src/config/supabaseClient';
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Container, Form,Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const New_Dive = (props) => {

    const navigate = useNavigate()

    const [ userDives, setUserDives ] = useState([])

    async function getUserDives() {
        const { data } = await supabase
            .from('Dive_Log')
            .select()
            .eq('user_id', props.session.user.id)
        setUserDives(data)
    }

    useEffect(() => { 
        getUserDives()
    }, []);

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
      

/////// useStates for Log Dive form

    const [ diveNum, setDiveNum ] = useState(null)
    const [ date, setDate ] = useState(null)
    const [ diveSite, setDiveSite ] = useState('')
    const [ maxDepth, setMaxDepth ] = useState(null)
    const [ bottomTime, setBottomTime ] = useState(null)
    const [ diveType, setDiveType ] = useState('')
    const [ weather, setWeather ] = useState('')
    const [ waterConditions, setWaterConditions ] = useState('')
    const [ waterTemperature, setWaterTemperature ] = useState(null)
    const [ bodyOfWater, setBodyOfWater ] = useState(null)
    const [ equipment, setEquipment ] = useState('')
    const [ buddy, setBuddy ] = useState('')
    const [ overallFeeling, setOverallFeeling ] = useState('')
    const [ diveCompany, setDiveCompany ] = useState('')

////////// Submit function for Log Dive form (turns all returned data into an object to be passed to parent)

    const _handleSubmit = (event) => {
        event.preventDefault();
        const diveLogObject = {
            diveNum: diveNum,
            date: date,
            diveSite: diveSite,
            maxDepth: maxDepth,
            bottomTime: bottomTime,
            diveType: diveType,
            weather: weather,
            waterConditions: waterConditions,
            waterTemperature: waterTemperature,
            bodyOfWater: bodyOfWater,
            equipment: equipment,
            buddy: buddy,
            overallFeeling: overallFeeling,
            diveCompany: diveCompany,
            user_id: props.session.user.id,
        }

        ////////////// Passes object to App.jsx

        console.log(diveLogObject)
        props.session.user.onSubmit(diveLogObject)

        //////////////////////// Resets Form

        setDiveNum(null);
        setDate(null);
        setDiveSite('');
        setMaxDepth(null);
        setBottomTime(null);
        setDiveType('');
        setWeather('');
        setWaterConditions('');
        setWaterTemperature(null);
        setBodyOfWater(null);
        setEquipment('');
        setBuddy('');
        setOverallFeeling('');
        setDiveCompany('');

        event.target.reset()

        navigate('/Dives')
       
    }

    /////////////////////// Displayed Form

    return (
        <div className='divelog-form'>
            
                <h1>Log Dive</h1>
                <form onSubmit={ _handleSubmit } >
                    <label className='label'>Dive No.</label>
                    <input className='input'
                        type='number'
                        onChange={(event) => setDiveNum(event.target.value)}
                        required
                    />
                    <label className='label'>Date</label>
                    <input className='input'
                        type='date'
                        onChange={(event) => setDate(event.target.value)}
                        required
                    />
                    <label className='label'>Dive Site</label>
                    <input className='input'
                        type='text'
                        onChange={(event) => setDiveSite(event.target.value)}
                        required
                    />
                    <label className='label'>Max Depth</label>
                    <input className='input'
                        type='number'
                        onChange={(event) => setMaxDepth(event.target.value)}
                        required
                    />
                    <label className='label'>Bottom Time</label>
                    <input className='input'
                        type='number'
                        onChange={(event) => setBottomTime(event.target.value)}
                        required
                    />
                    <label className='label'>Dive Type</label>
                    <input className='input'
                        type='text'
                        onChange={(event) => setDiveType(event.target.value)}
                    />
                    <label className='label'>Weather</label>
                    <input className='input'
                        type='text'
                        onChange={(event) => setWeather(event.target.value)}
                    />
                    <label className='label'>Water Conditions</label>
                    <input className='input'
                        type='text'
                        onChange={(event) => setWaterConditions(event.target.value)}
                    />
                    <label className='label'>Water Temperature</label>
                    <input className='input'
                        type='number'
                        onChange={(event) => setWaterTemperature(event.target.value)}
                    />
                    <label className='label'>Body Of Water</label>
                    <input className='input'
                        type='text'
                        onChange={(event) => setBodyOfWater(event.target.value)}
                    />
                    <label className='label'>Equipment</label>
                    <input className='input'
                        type='text'
                        onChange={(event) => setEquipment(event.target.value)}
                    />
                    <label className='label'>Dive Buddy</label>
                    <input className='input'
                        type='text'
                        onChange={(event) => setBuddy(event.target.value)}
                    />
                    <label className='label'>Dive Company</label>
                    <input className='input'
                        type='text'
                        onChange={(event) => setDiveCompany(event.target.value)}
                    />
                    <label className='label'>Overall Feeling</label>
                    <textarea className='input'
                        type='textarea'
                        rows={4}
                        onChange={(event) => setOverallFeeling(event.target.value)}
                    />
                    <button className='submit-button' type='submit'>Log Dive</button>
                </form>
            
        </div>
    
    )
};

export default New_Dive;