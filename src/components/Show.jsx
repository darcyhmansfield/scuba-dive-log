import { useParams, useNavigate } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import { supabase } from '../config/supabaseClient';


const Show = (props) => {

    const params = useParams();
    const [ userDive, setUserDive ] = useState({})
    const diveId = params.diveId
    const navigate = useNavigate()

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


    const _handleEdit = () => {
        navigate(`/update/${params.diveId}`);
    }

    return (

        <div>
            { userDive.length > 0 ? (
        <div>
            <table>
                <tbody>
                    <tr>
                    <th >Dive Number</th>
                    <td>{userDive[0].dive_number}</td>
                    </tr>
                    <tr className='show-row-index'>
                    <th>Dive Date</th>
                    <td>{userDive[0].date}</td>
                    </tr>
                    <tr className='show-row-index'>
                    <th>Dive Site</th>
                    <td>{userDive[0].dive_site}</td>
                    </tr>
                    <tr className='show-row-index'>
                    <th>Max Depth</th>
                    <td>{userDive[0].max_depth} m</td>
                    </tr>
                    <tr className='show-row-index'>
                    <th>Bottom Time</th>
                    <td>{userDive[0].bottom_time} minutes</td>
                    </tr>

                    {userDive[0].dive_type && 
                    <tr className='show-row-index'>
                    <th>Dive Type</th>
                    <td>{userDive[0].dive_type}</td>
                    </tr>
                    }

                    {userDive[0].weather && 
                    <tr className='show-row-index'>
                    <th>Weather</th>
                    <td>{userDive[0].weather}</td>
                    </tr>
                    }

                    {userDive[0].water_conditions && 
                    <tr className='show-row-index'>
                    <th>Water Conditions</th>
                    <td>{userDive[0].water_conditions}</td>
                    </tr>
                    }

                    {userDive[0].water_temperature && 
                    <tr className='show-row-index'>
                    <th>Water Temperature</th>
                    <td>{userDive[0].water_temperature}</td>
                    </tr>
                    }

                    {userDive[0].body_of_water && 
                    <tr className='show-row-index'>
                    <th>Body of Water</th>
                    <td>{userDive[0].body_of_water}</td>
                    </tr>
                    }

                    {userDive[0].equipment && 
                    <tr className='show-row-index'>
                    <th>Equipment</th>
                    <td>{userDive[0].equipment}</td>
                    </tr>
                    }

                    {userDive[0].dive_buddy && 
                    <tr className='show-row-index'>
                    <th>Dive Buddy</th>
                    <td>{userDive[0].dive_buddy}</td>
                    </tr>
                    }

                    {userDive[0].overall_feeling && 
                    <tr className='show-row-index'>
                    <th>Overall Feeling</th>
                    <td>{userDive[0].overall_feeling}</td>
                    </tr>
                    }

                    {userDive[0].dive_company && 
                    <tr className='show-row-index'>
                    <th>Dive Company</th>
                    <td>{userDive[0].dive_company}</td>
                    </tr>
                    }
                </tbody>

            </table>

            <button className='submit-button' id='edit-button' onClick={ _handleEdit }>Edit Dive</button>
            
        </div>

            ) : (
        
            <p>Loading</p> ) }

        </div>
    
    )
}

export default Show;