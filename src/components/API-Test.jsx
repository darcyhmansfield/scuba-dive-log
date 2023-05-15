// //const axios = require('axios');
// import axios from "axios";

// const options = {
//     method: 'GET',
//     url: 'https://world-scuba-diving-sites-api.p.rapidapi.com/api/divesite/gps',
//     headers: {
//         'X-RapidAPI-Key': 'ee43d266d5msh859f5e60609b6a1p1be89ajsn929f35453d99',
//         'X-RapidAPI-Host': 'world-scuba-diving-sites-api.p.rapidapi.com'
//     }
// };


// async function apiCALL() {
//     try {
//         const response = await axios.request(options);
//         console.log(response.data);
//     } catch (error) {
//         console.error(error);
//     }


// }
// useEffect(() => {
//     apiCALL()
// },
//     [])

import axios from 'axios';
import { useState } from 'react';
import SearchBar from './Search_Bar';
import SearchResults from './Search_Results';


const APItest = () => {

    const [results, setResults] = useState({});

    const _handleSearch = () => {

        console.log("Searching");

        const options = {
            method: 'GET',
            url: 'https://world-scuba-diving-sites-api.p.rapidapi.com/api/divesite',
            params: {
                country: 'Sydney'
              },    
            headers: {
                'X-RapidAPI-Key': '5f19ae380fmsh4d27eefa4a39e09p1e7e57jsne8215947bc70',
                'X-RapidAPI-Host': 'world-scuba-diving-sites-api.p.rapidapi.com'
            }
        };

        axios.request(options).then((response) => {
            console.log(response.data)
            setResults(response.data);
        });
    }

    return (
        <div>
            <h1>Search function coming soon</h1>
            <SearchBar onSubmit={ _handleSearch } />
            {Object.keys(results).length > 0 && <SearchResults results={results} />}
        </div>
    );
};

export default APItest;


