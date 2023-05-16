import { useState, useEffect } from 'react';
import { supabase } from '/src/config/supabaseClient';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form,Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";



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
            props.deleteDive(dive.id)
            navigate('/Dives')
        }

    
        /////////////////////// Displayed Form
    
        return (
            <div>
                <Container>
                    <h3>Update Dive</h3>
                    <Form onSubmit={ _handleSubmitUpdate } >
                        <Form.Label>Dive No.</Form.Label>
                        <Form.Control 
                            type='number'
                            onChange={(event) => setDiveNum(event.target.value)}
                            value={ diveNum }
                            required
                        />
                        <Form.Label>Date</Form.Label>
                        <Form.Control 
                            type='date'
                            onChange={(event) => setDate(event.target.value)}
                            value={ date }
                            required
                        />
                        <Form.Label>Dive Site</Form.Label>
                        <Form.Control 
                            type='text'
                            onChange={(event) => setDiveSite(event.target.value)}
                            value={ diveSite }
                            required
                        />
                        <Form.Label>Max Depth</Form.Label>
                        <Form.Control 
                            type='number'
                            onChange={(event) => setMaxDepth(event.target.value)}
                            value={ maxDepth }
                            required
                        />
                        <Form.Label>Bottom Time</Form.Label>
                        <Form.Control 
                            type='number'
                            onChange={(event) => setBottomTime(event.target.value)}
                            value={ bottomTime }
                            required
                        />
                        <Form.Label>Dive Type</Form.Label>
                        <Form.Control 
                            type='text'
                            onChange={(event) => setDiveType(event.target.value)}
                            value={ diveType }
                        />
                        <Form.Label>Weather</Form.Label>
                        <Form.Control 
                            type='text'
                            onChange={(event) => setWeather(event.target.value)}
                            value={ weather }
                        />
                        <Form.Label>Water Conditions</Form.Label>
                        <Form.Control 
                            type='text'
                            onChange={(event) => setWaterConditions(event.target.value)}
                            value={ waterConditions }
                        />
                        <Form.Label>Water Temperature</Form.Label>
                        <Form.Control 
                            type='number'
                            onChange={(event) => setWaterTemperature(event.target.value)}
                            value={ waterTemperature }
                        />
                        <Form.Label>Body Of Water</Form.Label>
                        <Form.Control 
                            type='text'
                            onChange={(event) => setBodyOfWater(event.target.value)}
                            value={ bodyOfWater }
                        />
                        <Form.Label>Equipment</Form.Label>
                        <Form.Control 
                            type='text'
                            onChange={(event) => setEquipment(event.target.value)}
                            value={ equipment }
                        />
                        <Form.Label>Dive Buddy</Form.Label>
                        <Form.Control 
                            type='text'
                            onChange={(event) => setBuddy(event.target.value)}
                            value={ buddy }
                        />
                        <Form.Label>Dive Company</Form.Label>
                        <Form.Control 
                            type='text'
                            onChange={(event) => setDiveCompany(event.target.value)}
                            value={ diveCompany }
                        />
                        <Form.Label>Overall Feeling</Form.Label>
                        <Form.Control 
                            as='textarea'
                            rows={4}
                            onChange={(event) => setOverallFeeling(event.target.value)}
                            value={ overallFeeling }
                        />
                        <Button type='submit'>Update</Button>
                    </Form>
                </Container>
                <Button onClick={ _handleDelete }>Delete</Button>
            </div>
        
        )
    
}

export default Update_Dive;