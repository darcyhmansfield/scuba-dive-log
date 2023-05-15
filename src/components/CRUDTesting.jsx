import { useState, useEffect } from 'react'
import { supabase } from '/src/config/supabaseClient'
// import "bootstrap/dist/css/bootstrap.min.css"
import { Navbar, Container, Nav, Form, Row, Col, Button } from 'react-bootstrap'


const CRUDTesting = () => {

/////////// Gets All Dives In DB

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

  const [ dives, setDives ] = useState([])

  async function getAllDives() {
    const { data } = await supabase
        .from('Dive_Log')
        .select()
    setDives(data)
    console.log(data)
  }

  useEffect(() => {
    getAllDives()
    },
    [])

/////////// Adds Dive to DB
    async function addDive() {
        const { data } = await supabase
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
                user_id: user.id
            })
      }

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

    return (
      <div>
        <Navbar>
          <Container>
            <Navbar.Brand>Scuba Dive Log</Navbar.Brand>
            <Nav>
              
            </Nav>
          </Container>
        </Navbar>
        <Container>
            
            <Row>
                <Col >
                    <h3>Add Dive to DB</h3>
                    <Form.Label>Dive No.</Form.Label>
                    <Form.Control 
                        type='number'
                        onChange={(event) => setDiveNum(event.target.value)}
                        required
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
                        onChange={(event) => setOverallFeeling(event.target.value)}
                    />
                    <Form.Label>Overall Feeling</Form.Label>
                    <Form.Control 
                        as='textarea'
                        rows={4}
                        onChange={(event) => setDiveCompany(event.target.value)}
                    />
                    <Button onClick={() => addDive() }>Log Dive</Button>
                </Col>
            </Row>
        </Container>
        
        
      </div>
    )

}

export default CRUDTesting
