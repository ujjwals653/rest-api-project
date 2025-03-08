import loader from '../assets/Loader.gif'
import axios from 'axios'
import { useState, useEffect } from 'react'

const Cat = () => {
  const [breeds, setBreeds] = useState(0);
  const [avgwht, setAvgWht] = useState('');
  const [avglife, setAvgLife] = useState('');
  const [highestBreedCon, sethighestBreedCon] = useState('');
  const [countries, setCountries] = useState([]);
  const [catImage, setcatImage] = useState(loader);

  function findMostFrequent(arr) {
    const frequency = {};
    let maxFreq = 0;
    let maxFreqItem = '';
    arr.forEach(element => {
      frequency[element] = (frequency[element] || 0) + 1;

      if (frequency[element] > maxFreq) {
        maxFreq = frequency[element];
        maxFreqItem = element;
      }
    });
    return maxFreqItem;
  }

  useEffect(() => {
    axios.get('https://api.thecatapi.com/v1/breeds').then(response => {
      const data = response.data;
      setBreeds(data.length);
      const totalWeight = data.reduce((acc, breed) => acc + parseInt(breed.weight.metric.split(' - ')[1]), 0);
      const totalLife = data.reduce((acc, breed) => acc + parseInt(breed.life_span.split(' - ')[1]), 0);
      setAvgWht((totalWeight / data.length).toFixed(2));
      setAvgLife((totalLife / data.length).toFixed(2));
      const countryCodes = data.map(breed => breed.country_code);
      setCountries(countryCodes);
      sethighestBreedCon(findMostFrequent(countryCodes));
    }).catch(error => console.error('Error fetching cat data:', error));
    axios.get('https://api.thecatapi.com/v1/images/search').then(response => {
      setcatImage(response.data[0].url);
    }).catch(error => console.log(error));
  }, []);
  return <div className="cats-container">
      <h1>30 Days of React</h1>
      <h3>Cats Paradise</h3>
      <p>There are {breeds} cat breeds.</p>
      <p>On average a cat can weight about <span>{avgwht}</span> kg and live <span>{avglife}</span> years.</p>
      <p>Total <span>{countries.length}</span> have cats.</p>
      <p>The highest number of breed are found in {highestBreedCon}</p>
      <img src={catImage} alt="Not Found" />
    </div>;
};
  
export default Cat