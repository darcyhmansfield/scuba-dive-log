import { useParams } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'


const Show = (props) => {

    const [ dive, setDive ] = useState({})
    const [ userDives, setUserDives ] = useState([])
    const params = useParams();

    useEffect(() => { 
        let diveQuery = props.userDives.find(dive => dive.id == params.diveId)
        setUserDives(props.userDives)
        setDive(diveQuery)

    }, [])

    console.log(dive)

    return (
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
    )
}

export default Show;