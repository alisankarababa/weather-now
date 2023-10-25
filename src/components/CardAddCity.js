import "./CardAddCity.css"

import svgCity from "../assets/city-dark.svg"
import svgPlus from "../assets/plus-light.svg"

export default function CardAddCity({className}) {
    
    return (
        <div className={`add-city card theme-dark ${className}`}>
            <h2 className="add-city__title">Add City</h2>
            <img className="add-city__button" src={svgPlus} alt="plus-svg"/>
            <img className="add-city__icon" src={svgCity} alt="city-svg"/>
        </div>
    )
}