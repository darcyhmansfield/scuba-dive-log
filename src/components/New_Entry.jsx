import { useState, useEffect } from 'react'
import { supabase } from '/src/config/supabaseClient'
import "bootstrap/dist/css/bootstrap.min.css"
import { Container, Form,Button } from 'react-bootstrap'

const New_Entry = (props) => {

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
            user_id: user.id,
        }

        ////////////// Passes object to App.jsx
        
        console.log(diveLogObject)
        props.onSubmit(diveLogObject)
        
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
       
    }

    /////////////////////// Displayed Form

    return (
        <div>
            <Container>
                <h3>Add Dive to DB</h3>
                <Form onSubmit={ _handleSubmit } >
                    <Form.Label>Dive No.</Form.Label>
                    <Form.Control 
                        type='number'
                        onChange={(event) => setDiveNum(event.target.value)}
                    />
                    <Form.Label>Date</Form.Label>
                    <Form.Control 
                        type='date'
                        onChange={(event) => setDate(event.target.value)}
                    />
                    <Form.Label>Dive Site</Form.Label>
                    <Form.Control 
                        type='text'
                        onChange={(event) => setDiveSite(event.target.value)}
                    />
                    <Form.Label>Max Depth</Form.Label>
                    <Form.Control 
                        type='number'
                        onChange={(event) => setMaxDepth(event.target.value)}
                    />
                    <Form.Label>Bottom Time</Form.Label>
                    <Form.Control 
                        type='number'
                        onChange={(event) => setBottomTime(event.target.value)}
                    />
                    <Form.Label>Dive Type</Form.Label>
                    <Form.Control 
                        type='text'
                        onChange={(event) => setDiveType(event.target.value)}
                    />
                    <Form.Label>Weather</Form.Label>
                    <Form.Control 
                        type='text'
                        onChange={(event) => setWeather(event.target.value)}
                    />
                    <Form.Label>Water Conditions</Form.Label>
                    <Form.Control 
                        type='text'
                        onChange={(event) => setWaterConditions(event.target.value)}
                    />
                    <Form.Label>Water Temperature</Form.Label>
                    <Form.Control 
                        type='number'
                        onChange={(event) => setWaterTemperature(event.target.value)}
                    />
                    <Form.Label>Body Of Water</Form.Label>
                    <Form.Control 
                        type='text'
                        onChange={(event) => setBodyOfWater(event.target.value)}
                    />
                    <Form.Label>Equipment</Form.Label>
                    <Form.Control 
                        type='text'
                        onChange={(event) => setEquipment(event.target.value)}
                    />
                    <Form.Label>Dive Buddy</Form.Label>
                    <Form.Control 
                        type='text'
                        onChange={(event) => setBuddy(event.target.value)}
                    />
                    <Form.Label>Dive Company</Form.Label>
                    <Form.Control 
                        type='text'
                        onChange={(event) => setDiveCompany(event.target.value)}
                    />
                    <Form.Label>Overall Feeling</Form.Label>
                    <Form.Control 
                        as='textarea'
                        rows={4}
                        onChange={(event) => setOverallFeeling(event.target.value)}
                    />
                    <Button type='submit'>Log Dive</Button>
                </Form>
            </Container>
        </div>
    
    )
};

export default New_Entry;