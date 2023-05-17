import Table from 'react-bootstrap/Table';
import { Link, useNavigate } from "react-router-dom";

const Index = (props) => {

    const navigate = useNavigate()

    console.log(props.userDives)


    const _handleRowClick = (diveId) => {
        navigate(`/Dives/${diveId}`);
    }

    return (
        <table>
        <thead>
          <tr>
            <th>Dive No.</th>
            <th>Date</th>
            <th>Dive Site</th>
            <th>Max Depth</th>
            <th>Bottom Time</th>
          </tr>
        </thead>
        <tbody>
            { props.userDives ? (
                props.userDives.map((dive) => (
                    // <Link to={ `/Dives/${dive.id}` }>
                    <tr key={dive.id} onClick = { () => _handleRowClick(dive.id) } className='divelog-index-row'> 
                        <td>{ dive.dive_number }</td>
                        <td>{ dive.date }</td>
                        <td>{ dive.dive_site }</td>
                        <td>{ dive.max_depth } m</td>
                        <td>{ dive.bottom_time } mins</td>   
                    </tr>
                  
                ))
            ) : ( 
                <tr>
                    <td colSpan="5">No dives found.</td>
                </tr>
            )}
        </tbody>
      </table>
  
    );
};

export default Index;