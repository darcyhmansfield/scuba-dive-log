import { useState } from 'react';
import SearchBar from './Search_Bar';
import SearchResults from './Search_Results';

const APItest = () => {
  const [results, setResults] = useState({});

  const _handleSearch = (q) => {
    const options = {
      method: 'GET',
      url: 'https://world-scuba-diving-sites-api.p.rapidapi.com/api/divesite',
      params: {
        country: q,
      },
      headers: {
        'X-RapidAPI-Key': '5f19ae380fmsh4d27eefa4a39e09p1e7e57jsne8215947bc70',
        'X-RapidAPI-Host': 'world-scuba-diving-sites-api.p.rapidapi.com',
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        setResults(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };

  return (
    <div>
      <SearchBar onSubmit={_handleSearch} />
      {Object.keys(results).length > 0 && <SearchResults results={results} />}
    </div>
  );
};

export default APItest;
