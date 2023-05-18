import { useParams } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import { supabase } from '../config/supabaseClient';


const Show = (props) => {

    const params = useParams();
    const [ userDive, setUserDive ] = useState({})
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

    return (

        <div>
            { userDive.length > 0 ? (
        <div>
            <table>
                <tbody>
                    <tr>
                    <th>Dive Number</th>
                    <td>{userDive[0].dive_number}</td>
                    </tr>
                    <tr>
                    <th>Dive Date</th>
                    <td>{userDive[0].date}</td>
                    </tr>
                    <tr>
                    <th>Dive Site</th>
                    <td>{userDive[0].dive_site}</td>
                    </tr>
                    <tr>
                    <th>Max Depth</th>
                    <td>{userDive[0].max_depth} m</td>
                    </tr>
                    <tr>
                    <th>Bottom Time</th>
                    <td>{userDive[0].bottom_time} minutes</td>
                    </tr>
                
                    <tr>
                    <th>Dive Type</th>
                    <td>{userDive[0].dive_type}</td>
                    </tr>
                    <tr>
                    <th>Weather</th>
                    <td>{userDive[0].weather}</td>
                    </tr>
                    <tr>
                    <th>Water Conditions</th>
                    <td>{userDive[0].water_conditions}</td>
                    </tr>
                    <tr>
                    <th>Water Temperature</th>
                    <td>{userDive[0].water_temperature}</td>
                    </tr>
                    <tr>
                    <th>Body of Water</th>
                    <td>{userDive[0].body_of_water}</td>
                    </tr>
                    <tr>
                    <th>Equipment</th>
                    <td>{userDive[0].equipment}</td>
                    </tr>
                    <tr>
                    <th>Dive Buddy</th>
                    <td>{userDive[0].dive_buddy}</td>
                    </tr>
                    <tr>
                    <th>Overall Feeling</th>
                    <td>{userDive[0].overall_feeling}</td>
                    </tr>
                    <tr>
                    <th>Dive Company</th>
                    <td>{userDive[0].dive_company}</td>
                    </tr>
                </tbody>
            </table>

            <Link to={`/update/${params.diveId}`}>Edit Dive</Link>

        </div>

            ) : (
        
            <p>Loading</p> ) }

        </div>
    
    )
}

export default Show;