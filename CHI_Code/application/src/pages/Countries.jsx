/**
 * Countries page
 * 
 * This is the page for searching the countries
 * 
 * @author Jake McCarthy
 */
import { useState, useEffect } from 'react';
import Country from '../components/Country';

function Countries() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [errors, setErrors] = useState([]);

  // Gets countries from API
  const getCountries = () => {
    fetch('https://w20043974.nuwebspace.co.uk/kf6012/api/country')
    .then( response => response.json() )
    .then(json => {
      setCountries(json);
      setFilteredCountries(json);
    })
    .catch( err => { setErrors(err.message) })
  };

  useEffect(() => {
      getCountries();
  }, []);

  useEffect(() => {
      handleSearch();
  }, [searchTerm]);

  // Returns specific countries based on search term
  const handleSearch = () => {

    const filtered = countries.filter(country =>
      country.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  // Shows country list or 'No countries found' if there are no countries returned
  const countriesList =
  filteredCountries.length > 0 && errors.length === 0 ? (
    <section className="max-w-lg mx-auto">
      <input
        type="text"
        placeholder="Search for a country"
        className="w-full p-2 mb-4 rounded-md"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ul className="space-y-4">
        {filteredCountries.map((country, index) => (
          <Country key={index} country={country.country} />
        ))}
      </ul>
    </section>
  ) : (
    <section className="max-w-lg mx-auto">
      <input
        type="text"
        placeholder="Search for a country"
        className="w-full p-2 mb-4 rounded-md"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <p className="text-red-500 text-center">
        {filteredCountries.length === 0 ? 'No countries found.' : 'Error loading countries.'}
      </p>
    </section>
  );

  return (
    <div className="my-8">
      <h1 className="text-3xl font-bold mb-4 text-center">List of Countries</h1>
      <img className="max-w-36 mx-auto mt-2 mb-2" src="./CHIGlobe.png" alt="Placeholder Globe Text" />
      {countriesList}
    </div>
  );
}
 
export default Countries