import React from "react";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const HeaderComponent = (props) => {
  return (
    <div className="header-texts">
      <h1>{props.title}</h1>
      <h3>{props.subtitle}</h3>
      <h5>{props.language}</h5>
      <p>{props.name}</p>
      <p>{props.date}</p>
      <p>{props.prompt}</p>
    </div>
  )
}

//name, capital, population, timezone, continent

const CountriesComponent = () => {
  let countryObject = {}
  let countryArray = []
  let generatedCountry;
  let theCountry;
  const [mode, setMode] = useState("light");
  const [post, setPost] = useState([]);
  const [country, setCountry] = useState({
    flag: "https://countryflagsapi.com/png/ng",
    name: "Nigeria",
    capital: "Abuja",
    population: "215,000,000",
    timezone: "UTC+1",
    continent: "Africa"
  })

  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/all`).then((data) => {
      setPost(data?.data);
    });
  }, []);

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };
  useEffect(() => {
    document.body.className = mode;
  }, [mode]);

  const generateCountry = () => {
    post.map((item) => {
      countryArray.push(item)
      generatedCountry = Math.floor(Math.random() * countryArray.length)
      theCountry = countryArray[generatedCountry]
      countryObject = {
        flag: theCountry.flags.png,
        countryName: Object.values(theCountry.name)[0],
        capital: theCountry.capital,
        population: (theCountry.population).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        timezone: theCountry.timezones[0],
        continent: theCountry.continents
      }
      return countryObject
    })
  }
  generateCountry()

  return (
    <div className="country-wrapper">
      <div className="country-box">
        <div className="country-flag">
          <img src={country.flag} alt="flag_image" />
        </div>
        <h3 className="country-name">{country.name}</h3>
        <p><strong>Capital:</strong> {country.capital}</p>
        <p><strong>Population:</strong> {country.population}</p>
        <p><strong>Timezone:</strong> {country.timezone}</p>
        <p><strong>Continent:</strong> {country.continent}</p>
      </div>
      <div className="button-box">
        <button className="country-button" type="button" onClick={() => {
          setCountry({
            flag: countryObject.flag,
            name: countryObject.countryName,
            capital: countryObject.capital,
            population: countryObject.population,
            timezone: countryObject.timezone,
            continent: countryObject.continent
          })
        }}> Select Country </button>
        <button className="background-button" type="button" onClick={toggleMode}> Change Background </button>
      </div>
    </div>
  );
}

const header = (
  <section className="header-container">
    <HeaderComponent 
      title = "30 Days of React"
      subtitle = "Getting Started React"
      language = "Javascript Library"
      name = "Osinaya Oludare"
      date = "Oct 27, 2022"
      prompt = "Select a country for your next holiday"
    />
  </section>
);

const main = (
  <>
    <CountriesComponent />
  </>
)

const footer = (
  <footer>
    <h4>Copyright 2022</h4>
  </footer>
)

const app = (
  <div>
    {header} 
    {main}
    {footer}
  </div>
);

const rootElement = document.getElementById("root");

ReactDOM.render(app, rootElement);
