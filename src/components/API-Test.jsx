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

const APItest = () => {

    return (
        <div>
            <h1>New_Entry coming soon</h1>
        </div>
    );
};

export default APItest;




const options = {
    method: 'GET',
    url: 'https://world-scuba-diving-sites-api.p.rapidapi.com/api/divesite',
    params: {
        country: 'camp cove'
      },    
    headers: {
        'X-RapidAPI-Key': '5f19ae380fmsh4d27eefa4a39e09p1e7e57jsne8215947bc70',
        'X-RapidAPI-Host': 'world-scuba-diving-sites-api.p.rapidapi.com'
    }
};

try {
    const response = await axios.request(options);
    console.log(response.data);
} catch (error) {
    console.error(error);
}