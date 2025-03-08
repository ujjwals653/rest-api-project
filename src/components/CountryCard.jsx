import axios from 'axios';
import glass from '../assets/magnifying-glass-solid.svg'
import { useEffect, useState, useRef } from 'react';

const CountryCard = ({searchTerm}) => {
  const [countries, setCountries] = useState([]);
  const allCountries = useRef([]);

  useEffect(() => {
    axios.get('https://restcountries.com/v2/all?fields=name,alpha3Code,callingCodes,currencies,alpha2Code')
    .then((res) => {
      allCountries.current = res.data;
      setCountries(res.data);
    })
    .catch(e => console.log(e));
  }, [])

  useEffect(() => {
    if (searchTerm !== '') {
      // Filter countries based on searchTerm
      const filteredCountries = allCountries.current.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCountries(filteredCountries);
    } else {
      setCountries(allCountries.current);
    }
  }, [searchTerm])
  
  // ?fields=name,alpha3Code,callingCodes,currencies,alpha2Code

  const Card = (props) => {
    const {name, alpha2Code, alpha3Code, callingCodes, currencies} = props.country;
    const countryData = [
      {title: 'Country code(Alpha2)', value: alpha2Code},
      {title: 'Country code(Alpha3)', value: alpha3Code},
      {title: 'Dial code', value: callingCodes[0]},
      {title: 'Currency', value: currencies ? currencies[0].name : 'N/A'},
    ]
    return(
        <div className="card">
      <div className="head">
        <div className="heading">
            <h2>{name}</h2>
            <small>{"(فغانستان)"}</small>
        </div>
        <div className="btn">
            <button><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg></button>
        </div>
      </div>
      <table>
        <tbody>
            {countryData.map((data, index) => (
                <tr key={index}>
                    <td>{data.title}</td>
                    <td>{data.value}</td>
                </tr>
            ))}
        </tbody>
      </table>
      
    </div>
    )
  }

  return (
    <div className='countries-display'>
      {countries.map((country, index) => <Card key={index} country={country}/>)}
    </div>
  )
}

export default CountryCard;
