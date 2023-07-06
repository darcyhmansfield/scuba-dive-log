import GMap from './Google_Map copy';
import { useState, useEffect } from 'react';
// import GMap from './Google_Map';

const Search_Results = ({results}) => {

    console.log(results.data)

    return (
        <div>
            { results.data ?
                <>
                <GMap results={results} />
                <table style={{ width: 500 }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Region</th>
                            <th>Ocean</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.data.map((location, index) => (
                            <tr key={index}>
                                <td>{location.name.replace('&#039;',"'")}</td>
                                <td>{location.region}</td>
                                <td>{location.ocean}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </>
                :
                <p>Please enter a valid search term above</p>
            }
        </div>
    );
};

export default Search_Results;