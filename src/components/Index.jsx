import { useState, useEffect } from 'react'
import { supabase } from '/src/config/supabaseClient'
import Table from 'react-bootstrap/Table';

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
                <tr>
                    <td>{ dive.dive_number }</td>
                    <td>{ dive.date }</td>
                    <td>{ dive.dive_site }</td>
                    <td>{ dive.max_depth }</td>
                    <td>{ dive.bottom_time }</td>
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