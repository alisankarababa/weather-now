import "./CityGallery.css"

import { useSelector } from "react-redux"
import CityCard from "../components/CityCard"
import CardAddCity from "../components/CardAddCity"

import iconRight from "../assets/chevron-compact-right.svg"
import iconLeft from "../assets/chevron-compact-left.svg"
import { useState, useEffect, useRef } from "react"

import { arrSliceCircular, arrIncrementIdxCircularly, arrDecrementIdxCircularly } from "../utils/utils"

export default function CityGallery() {
    
    const cities = useSelector((store) => store.reducerCities);
    const [idxStart, setIdxStart] = useState(0);
    const [citiesToShow, setCitiesToShow] = useState([]);
    const [cntCityCardToShow, setCntCityCardToShow] = useState(0);

    const cityGalleryCards = useRef(null);
    const [widthCityGalleryCards, setWidthCityGalleryCards] = useState(0);
    
    useEffect(() => {

        if(widthCityGalleryCards >= 1000) {
            setCntCityCardToShow(4);
        }
        else if(widthCityGalleryCards >= 800) {
            setCntCityCardToShow(3);

        } else if(widthCityGalleryCards >= 650) {
            setCntCityCardToShow(2);
        }
        else {
            setCntCityCardToShow(1);
        }
    }, [widthCityGalleryCards])

    useEffect(() => {
        setCitiesToShow(arrSliceCircular(cities, idxStart, cntCityCardToShow));
    }, [idxStart, cities, cntCityCardToShow])

    useEffect(() => {
        const updateComponentWidth = () => {
            if (cityGalleryCards.current) {
            const width = cityGalleryCards.current.getBoundingClientRect().width;
            setWidthCityGalleryCards(width);
            }
        };
    
        updateComponentWidth();
    
        window.addEventListener('resize', updateComponentWidth);
    
        return () => {
            window.removeEventListener('resize', updateComponentWidth);
        };
    }, []);

    return (
        <>
        <div className="city-gallery">
            <img onClick={() => setIdxStart(arrDecrementIdxCircularly(cities, idxStart))} className="city-gallery__button"src={iconLeft} alt="icon-left"/>
            <div ref={cityGalleryCards} className="city-gallery__cards">
                {
                    citiesToShow.map(city => <CityCard className="city-gallery__card" key={city.id} city={city}/>)
                }
                { widthCityGalleryCards >= 320 && <CardAddCity className="city-gallery__card"/> }
            </div>
            <img onClick={() => setIdxStart(arrIncrementIdxCircularly(cities, idxStart))} className="city-gallery__button" src={iconRight} alt="icon-rigth"/>
        </div>
        { widthCityGalleryCards < 320 && <button className="btn btn-pill bg-purple">ADD CITY</button>}
        </>

    );
}