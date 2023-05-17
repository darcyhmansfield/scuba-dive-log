import { useState, useEffect } from 'react';
import { supabase } from '/src/config/supabaseClient';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form,Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'

const Update_Dive = (props) => {

    const [ dive, setDive ] = useState({})
    const [ userDives, setUserDives ] = useState([])
    const params = useParams();
    const navigate = useNavigate()

    useEffect(() => { 
        let diveQuery = props.userDives.find(dive => dive.id == params.diveId)
        setUserDives(props.userDives)
        setDive(diveQuery)

    }, [])

    //////// Gets Current User/Session
    
        const [user, setUser] = useState({});
    
        useEffect(() => {
            async function getUserData() {
                await supabase.auth.getUser().then((value) => {
                    // value.data.user
                    if (value.data?.user) {
                        console.log(value.data.user);
                        setUser(value.data.user);
                    }
                })
            }
            getUserData();
        }, []);
    
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
    
    useEffect(() => { 
        setDiveNum(dive.dive_number)
        setDate(dive.date)
        setDiveSite(dive.dive_site)
        setMaxDepth(dive.max_depth)
        setBottomTime(dive.bottom_time)
        setDiveType(dive.dive_type)
        setWeather(dive.weather)
        setWaterConditions(dive.water_conditions)
        setWaterTemperature(dive.water_temperature)
        setBodyOfWater(dive.body_of_water)
        setEquipment(dive.equipment)
        setBuddy(dive.dive_buddy)
        setOverallFeeling(dive.overall_feeling)
        setDiveCompany(dive.dive_company)
    }, [dive])
    
    ////////// Submit function for Log Dive form (turns all returned data into an object to be passed to parent)
    
        const _handleSubmitUpdate = (event) => {
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
                user_id: user.id,
                id: dive.id
            }
    
            ////////////// Passes object to App.jsx
    
            props.updateDive(diveLogObject)
            
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

        const _handleDelete = () => {
            const confirmDelete = window.confirm(
                'Are you sure you want to delete this dive?'
              );
              if (confirmDelete) {
                props.deleteDive(dive.id);
                navigate('/Dives');
              }
        }

    
        /////////////////////// Displayed Form
    
        return (
            <div className='divelog-form'>
        
                    <h1>Update Dive</h1>
                    <form onSubmit={ _handleSubmitUpdate } >
                    <label className='label'>Dive No.</label>
                         <input className='input' 
                            type='number'
                            onChange={(event) => setDiveNum(event.target.value)}
                            value={ diveNum }
                            required
                        />
                        <label className='label'>Date</label>
                         <input className='input' 
                            type='date'
                            onChange={(event) => setDate(event.target.value)}
                            value={ date }
                            required
                        />
                        <label className='label'>Dive Site</label>
                         <input className='input' 
                            type='text'
                            onChange={(event) => setDiveSite(event.target.value)}
                            value={ diveSite }
                            required
                        />
                        <label className='label'>Max Depth</label>
                         <input className='input' 
                            type='number'
                            onChange={(event) => setMaxDepth(event.target.value)}
                            value={ maxDepth }
                            required
                        />
                        <label className='label'>Bottom Time</label>
                         <input className='input' 
                            type='number'
                            onChange={(event) => setBottomTime(event.target.value)}
                            value={ bottomTime }
                            required
                        />
                        <label className='label'>Dive Type</label>
                         <input className='input' 
                            type='text'
                            onChange={(event) => setDiveType(event.target.value)}
                            value={ diveType }
                        />
                        <label className='label'>Weather</label>
                         <input className='input' 
                            type='text'
                            onChange={(event) => setWeather(event.target.value)}
                            value={ weather }
                        />
                        <label className='label'>Water Conditions</label>
                         <input className='input' 
                            type='text'
                            onChange={(event) => setWaterConditions(event.target.value)}
                            value={ waterConditions }
                        />
                        <label className='label'>Water Temperature</label>
                         <input className='input' 
                            type='number'
                            onChange={(event) => setWaterTemperature(event.target.value)}
                            value={ waterTemperature }
                        />
                        <label className='label'>Body Of Water</label>
                         <input className='input' 
                            type='text'
                            onChange={(event) => setBodyOfWater(event.target.value)}
                            value={ bodyOfWater }
                        />
                        <label className='label'>Equipment</label>
                         <input className='input' 
                            type='text'
                            onChange={(event) => setEquipment(event.target.value)}
                            value={ equipment }
                        />
                        <label className='label'>Dive Buddy</label>
                         <input className='input' 
                            type='text'
                            onChange={(event) => setBuddy(event.target.value)}
                            value={ buddy }
                        />
                        <label className='label'>Dive Company</label>
                         <input className='input' 
                            type='text'
                            onChange={(event) => setDiveCompany(event.target.value)}
                            value={ diveCompany }
                        />
                        <label className='label'>Overall Feeling</label>
                        <textarea className='input' 
                            as='textarea'
                            rows={4}
                            onChange={(event) => setOverallFeeling(event.target.value)}
                            value={ overallFeeling }
                        />
                        <div className="button-container">
                        <button className='submit-button'type='submit'>Update</button>
                        <button className='submit-button' id='delete-button' onClick={ _handleDelete }>Delete Dive</button>
                        </div>
                    </form>
            </div>
        
        )
    
}

export default Update_Dive;