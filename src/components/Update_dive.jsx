import { useState, useEffect } from 'react';
import { supabase } from '/src/config/supabaseClient';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form,Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'

const Update_Dive = (props) => {

    const [ dive, setDive ] = useState({})
    const [ userDive, setUserDive ] = useState([])
    const navigate = useNavigate()

    const params = useParams();
    
    const diveId = params.diveId

    async function getUserDive() {
        const { data } = await supabase
            .from('Dive_Log')
            .select()
            .eq('id', diveId)
        setUserDive(data)
    }

    useEffect(() => { 
        getUserDive()
        console.log(userDive, diveId)
    }, [diveId]);
    
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
        if (userDive.length > 0) {
        setDiveNum(userDive[0].dive_number)
        setDate(userDive[0].date)
        setDiveSite(userDive[0].dive_site)
        setMaxDepth(userDive[0].max_depth)
        setBottomTime(userDive[0].bottom_time)
        setDiveType(userDive[0].dive_type)
        setWeather(userDive[0].weather)
        setWaterConditions(userDive[0].water_conditions)
        setWaterTemperature(userDive[0].water_temperature)
        setBodyOfWater(userDive[0].body_of_water)
        setEquipment(userDive[0].equipment)
        setBuddy(userDive[0].dive_buddy)
        setOverallFeeling(userDive[0].overall_feeling)
        setDiveCompany(userDive[0].dive_company)
    }
    }, [userDive])
    
    ////////// Submit function for Log Dive form (turns all returned data into an object to be passed to parent)
    
    async function _handleSubmitUpdate(event) {
        event.preventDefault();
        const { data, error } = await supabase
            .from('Dive_Log')
            .update({
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
            .eq('id', userDive[0].id)
            
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
        ////// Delete a dive

        async function deleteDive(diveId) {
            const { data, error } = await supabase
                .from('Dive_Log')
                .delete()
                .eq('id', diveId)
    
                if (error) {
                console.log(error)
                }
        }

        const _handleDelete = () => {
            const confirmDelete = window.confirm(
                'Are you sure you want to delete this dive?'
              );
              if (confirmDelete) {

                deleteDive(userDive[0].id)

                navigate('/Dives');
              }
        }

    
        /////////////////////// Displayed Form
    
        return (
            <div>

            { userDive.length > 0 ? (
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

            ) : (
                          
                <p>Loading</p>
                
                ) }

            </div>
        
        )
    
}

export default Update_Dive;