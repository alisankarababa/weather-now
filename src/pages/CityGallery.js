import "./CityGallery.css"

import { useSelector } from "react-redux"
import CityCard from "../components/CityCard"

import iconRight from "../assets/chevron-compact-right.svg"
import iconLeft from "../assets/chevron-compact-left.svg"

export default function CityGallery() {
    
    const cities = useSelector((store) => store.reducerCities);


    console.log(cities);
    return (

        <div className="city-gallery">
            <img className="city-gallery__button"src={iconLeft} alt="icon-left"/>
            {
                cities.map(city => <CityCard className="city-gallery__item" key={city.id} city={city}/>)
            }
            <img className="city-gallery__button" src={iconRight} alt="icon-rigth"/>
        </div>
    );



}