import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";

const Index = (props) => {

    console.log(props.userDives)

    return (
        <Table striped bordered hover>
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
                
                    <tr key={dive.id}> 
                        <td><Link to={ `/Dives/${dive.id}` }>{ dive.dive_number }</Link></td>
                        <td>{ dive.date }</td>
                        <td>{ dive.dive_site }</td>
                        <td>{ dive.max_depth } m</td>
                        <td>{ dive.bottom_time } minutes</td>   
                    </tr>
                ))
            ) : ( 
                <tr>
                    <td colSpan="5">No dives found.</td>
                </tr>
            )}
        </tbody>
      </Table>
  
    );
};

export default Index;