import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const CountryDetails = () => {
  const { countryCode } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`https://restcountries.com/v2/alpha/${countryCode}`)
      .then((res) => {
        setCountry(res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setError('Failed to load country details');
        setLoading(false);
      });
  }, [countryCode]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container">
          <div className="details-loading">Loading...</div>
        </div>
      </>
    );
  }

  if (error || !country) {
    return (
      <>
        <Navbar />
        <div className="container">
          <div className="details-error">
            <p>{error || 'Country not found'}</p>
            <button onClick={() => navigate('/')}>Back to Home</button>
          </div>
        </div>
      </>
    );
  }

  const DetailRow = ({ label, value }) => (
    <tr>
      <td>{label}</td>
      <td>{value || 'N/A'}</td>
    </tr>
  );

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="details-container">
          <div className="details-header">
            <button className="back-btn" onClick={() => navigate('/')}>
              ← Back
            </button>
            <h1>{country.name}</h1>
            {country.nativeName && country.nativeName !== country.name && (
              <small>({country.nativeName})</small>
            )}
          </div>

          <div className="details-content">
            <div className="details-flag">
              <img src={country.flag} alt={`${country.name} flag`} />
            </div>

            <div className="details-info">
              <div className="info-section">
                <h3>General Information</h3>
                <table>
                  <tbody>
                    <DetailRow label="Official Name" value={country.name} />
                    <DetailRow label="Native Name" value={country.nativeName} />
                    <DetailRow label="Capital" value={country.capital} />
                    <DetailRow label="Region" value={country.region} />
                    <DetailRow label="Subregion" value={country.subregion} />
                    <DetailRow 
                      label="Population" 
                      value={country.population?.toLocaleString()} 
                    />
                    <DetailRow 
                      label="Area" 
                      value={country.area ? `${country.area.toLocaleString()} km²` : 'N/A'} 
                    />
                  </tbody>
                </table>
              </div>

              <div className="info-section">
                <h3>Codes & Identifiers</h3>
                <table>
                  <tbody>
                    <DetailRow label="Alpha2 Code" value={country.alpha2Code} />
                    <DetailRow label="Alpha3 Code" value={country.alpha3Code} />
                    <DetailRow 
                      label="Calling Code" 
                      value={country.callingCodes?.[0] ? `+${country.callingCodes[0]}` : 'N/A'} 
                    />
                    <DetailRow label="Top Level Domain" value={country.topLevelDomain?.join(', ')} />
                  </tbody>
                </table>
              </div>

              <div className="info-section">
                <h3>Cultural Information</h3>
                <table>
                  <tbody>
                    <DetailRow 
                      label="Languages" 
                      value={country.languages?.map(lang => lang.name).join(', ')} 
                    />
                    <DetailRow 
                      label="Currencies" 
                      value={country.currencies?.map(curr => `${curr.name} (${curr.symbol})`).join(', ')} 
                    />
                    <DetailRow 
                      label="Timezones" 
                      value={country.timezones?.join(', ')} 
                    />
                    <DetailRow 
                      label="Demonym" 
                      value={country.demonym} 
                    />
                  </tbody>
                </table>
              </div>

              {country.borders && country.borders.length > 0 && (
                <div className="info-section">
                  <h3>Bordering Countries</h3>
                  <div className="borders-list">
                    {country.borders.map((border) => (
                      <button 
                        key={border} 
                        className="border-btn"
                        onClick={() => navigate(`/country/${border}`)}
                      >
                        {border}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {country.regionalBlocs && country.regionalBlocs.length > 0 && (
                <div className="info-section">
                  <h3>Regional Blocs</h3>
                  <table>
                    <tbody>
                      {country.regionalBlocs.map((bloc, index) => (
                        <DetailRow 
                          key={index}
                          label={bloc.acronym} 
                          value={bloc.name} 
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountryDetails;