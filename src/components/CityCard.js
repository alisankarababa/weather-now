import "./CityCard.css"

import iconUp from "../assets/chevron-up.svg"
import iconDown from "../assets/chevron-down.svg"

export default function CityCard({city, className, hDelete }) {
    
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

            <button onClick={ () => hDelete(city.id) } className="card-city__btndelete">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"></path>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"></path>
                </svg>
            </button>
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