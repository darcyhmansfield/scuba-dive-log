import { useState, useEffect } from 'react';
import { supabase } from '/src/config/supabaseClient';
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Container, Form,Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const New_Dive = (props) => {

    const navigate = useNavigate()


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

async function _handleSubmit(event) {
    event.preventDefault();
    const { data, error } = await supabase
        .from('Dive_Log')
        .insert({
            dive_number: diveNum,
            date: date,
            dive_site: diveSite,
            max_depth: maxDepth,
            bottom_time: bottomTime,
            dive_type: diveType,
            weather: weather,
            water_conditions: waterConditions,
            water_temperature: waterTemperature,
            body_of_water: bodyOfWater,
            equipment: equipment,
            dive_buddy: buddy,
            dive_company: diveCompany,
            overall_feeling: overallFeeling,
            user_id: props.session.user.id
        })

        if (error) {
            console.log(error)
          }

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
                        onWheel={(event) => event.target.blur()}
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
                    <label className='label'>Max Depth (m)</label>
                    <input className='input'
                        type='number'
                        onChange={(event) => setMaxDepth(event.target.value)}
                        onWheel={(event) => event.target.blur()}
                        required
                    />
                    <label className='label'>Bottom Time (mins)</label>
                    <input className='input'
                        type='number'
                        onChange={(event) => setBottomTime(event.target.value)}
                        onWheel={(event) => event.target.blur()}
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
                    <label className='label'>Water Temperature (°C)</label>
                    <input className='input'
                        type='number'
                        onChange={(event) => setWaterTemperature(event.target.value)}
                        onWheel={(event) => event.target.blur()}
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