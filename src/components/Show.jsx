import { useParams } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import { supabase } from '../config/supabaseClient';


const Show = (props) => {

    const [ dive, setDive ] = useState({})
    const params = useParams();
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

    console.log(userDives)

    useEffect(() => { 
        let diveQuery = userDives.find(dive => dive.id == params.diveId)
        console.log(userDives)
        setDive(diveQuery)
    }, [userDives])

    console.log(dive)

    return (
        <div>
            <Table striped bordered hover>
                <tbody>
                    <tr>
                    <th>Dive Number</th>
                    <td>{dive.dive_number}</td>
                    </tr>
                    <tr>
                    <th>Dive Date</th>
                    <td>{dive.date}</td>
                    </tr>
                    <tr>
                    <th>Dive Site</th>
                    <td>{dive.dive_site}</td>
                    </tr>
                    <tr>
                    <th>Max Depth</th>
                    <td>{dive.max_depth} m</td>
                    </tr>
                    <tr>
                    <th>Bottom Time</th>
                    <td>{dive.bottom_time} minutes</td>
                    </tr>
                
                    <tr>
                    <th>Dive Type</th>
                    <td>{dive.dive_type}</td>
                    </tr>
                    <tr>
                    <th>Weather</th>
                    <td>{dive.weather}</td>
                    </tr>
                    <tr>
                    <th>Water Conditions</th>
                    <td>{dive.water_conditions}</td>
                    </tr>
                    <tr>
                    <th>Water Temperature</th>
                    <td>{dive.water_temperature}</td>
                    </tr>
                    <tr>
                    <th>Body of Water</th>
                    <td>{dive.body_of_water}</td>
                    </tr>
                    <tr>
                    <th>Equipment</th>
                    <td>{dive.equipment}</td>
                    </tr>
                    <tr>
                    <th>Dive Buddy</th>
                    <td>{dive.dive_buddy}</td>
                    </tr>
                    <tr>
                    <th>Overall Feeling</th>
                    <td>{dive.overall_feeling}</td>
                    </tr>
                    <tr>
                    <th>Dive Company</th>
                    <td>{dive.dive_company}</td>
                    </tr>
                </tbody>
            </Table>
            <Link to={`/update/${params.diveId}`}>Edit Dive</Link>
        </div>
    
    )
}

export default Show;