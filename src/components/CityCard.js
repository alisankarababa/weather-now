import "./CityCard.css"

import iconUp from "../assets/chevron-up.svg"
import iconDown from "../assets/chevron-down.svg"

export default function CityCard({city, className}) {
    
    function getWeatherIcon(city) {
        return `https://openweathermap.org/img/wn/${city.current_weather.weather.icon}@2x.png`
    }

    return (
        
        <div className={`card-city theme-dark ${className}`}>

            <h2 className="card-city__name">{city.name}</h2>
            {
            city.current_weather.weather ?
            (
            <>
            <img className="card-city__icon" src={getWeatherIcon(city)} alt="weather-svg"/>
            <span className="card-city__temp">{Math.trunc(city.current_weather.main.temp)}</span>
            <span className="card-city__weather">{city.current_weather.weather.description}</span>
            <div className="card-city__tempextremas">
                <div className="card-city__tempextrema">
                    <img className="tempextrema__icon tempextrema--min" src={iconDown} alt="svg"/>                        
                    <span className="tempextrema__val tempextrema--min">{Math.floor(city.current_weather.main.temp_min)}</span>
                    <span className="tempextrema__text tempextrema--min">Min</span>
                </div>
                <div className="card-city__tempextrema tempextrema">
                    <img className="tempextrema__icon tempextrema--max" src={iconUp} alt="svg"/>          
                    <span className="tempextrema__val tempextrema--max">{Math.ceil(city.current_weather.main.temp_max)}</span>
                    <span className="tempextrema__text tempextrema--max">Max</span>
                </div>
            </div>
            </>
            ) 
            :
            (
                <div>LOADING</div>
            )
            }
        </div>
    )
}