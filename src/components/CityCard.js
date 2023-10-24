import "./CityCard.css"

import svgCloudy from "../assets/cloudy.svg";
import svgRainy from "../assets/rainy.svg";
import svgSnowy from "../assets/snowy.svg";
import svgSunny from "../assets/sunny.svg";


export default function CityCard({city, className}) {
    
    function getWeatherIcon() {
        let icon = null;
        switch (city.weather) {
            case "cloudy": icon = svgCloudy; break;
            case "rainy": icon = svgRainy; break;
            case "snowy": icon = svgSnowy; break;
            case "sunny": icon = svgSunny; break;
            default:
                break;
        }
        return icon;
    }

    return (

        <div className={`card-city theme-dark ${className}`}>
            <h2 className="card-city__name">{city.name}</h2>
            <img className="card-city__icon" src={getWeatherIcon(city)} alt="weather-svg"/>
            <div className="card-city__temperature">
                <span className="card-city__max">{city.max}</span>
                <span className="card-city__min">{city.min}</span>
            </div>
            <span className="card-city__weather">{city.weather}</span>
        </div>
    )
}