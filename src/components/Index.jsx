import Table from 'react-bootstrap/Table';
import { Link, useNavigate } from "react-router-dom";
import { supabase } from '../config/supabaseClient';
import { useState, useEffect } from 'react';

const Index = (props) => {

    const [ userDives, setUserDives ] = useState([])
    const navigate = useNavigate()

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
            { userDives ? (
                userDives.map((dive) => (
                
                    <tr key={dive.id} class='divelog-index-row' onClick={ () => _handleRowClick(dive.id) }> 
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