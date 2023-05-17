
import { useState, useEffect } from 'react';
import GMap from './Google_Map';

const Search_Results = ({results}) => {

    useEffect(() => { 
        // setResults(results)
        console.log("In Use Effect: ", results)
    }, [results]);

    return (
        <div>
            <GMap results={results} />
            {Object.keys(results).length > 0 && 
            <table style={{ width: 500 }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Region</th>
                        <th>Ocean</th>
                    </tr>
                </thead>
                <tbody>
                    {results.data.map((location) => (
                        <tr key={location.id}>
                            <td>{location.name.replace('&#039;',"'")}</td>
                            <td>{location.region}</td>
                            <td>{location.ocean}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            }
        </div>
    );
};

export default Search_Results;


