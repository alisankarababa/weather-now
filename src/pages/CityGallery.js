import "./CityGallery.css"

import { useSelector } from "react-redux"
import CityCard from "../components/CityCard"
import CardAddCity from "../components/CardAddCity"

import iconRight from "../assets/chevron-compact-right.svg"
import iconLeft from "../assets/chevron-compact-left.svg"
import { useState, useEffect, useRef } from "react"
import { useForm } from 'react-hook-form';

import { arrSliceCircular, arrIncrementIdxCircularly, arrDecrementIdxCircularly } from "../utils/utils"

import { citiesGetCityWeather, citiesSearchCity, actionsCitiesAddCity } from "../store/actions/actionsCities"

import { useDispatch } from "react-redux"

export default function CityGallery() {
    
    const dispatch = useDispatch();
    const cities = useSelector((store) => store.cities.cityList);
    const searchResult = useSelector( store => store.cities.searchResult);
    const isBusy = useSelector( store => store.cities.isBusy);

    const [idxStart, setIdxStart] = useState(0);
    const [citiesToShow, setCitiesToShow] = useState([]);
    const [cntCityCardToShow, setCntCityCardToShow] = useState(0);

    const refCityGallery = useRef(null);
    const [widthCityGallery, setWidthCityGallery] = useState(0);

    function hAddCity( city ) {
        dispatch(actionsCitiesAddCity(city));
    }
    
    useEffect(() => {

        if(widthCityGallery >= 1000) {
            setCntCityCardToShow(3);
        }
        else if(widthCityGallery >= 800) {
            setCntCityCardToShow(2);
        }
        else {
            setCntCityCardToShow(1);
        }
    }, [widthCityGallery])

    useEffect(() => {
    
        if (isBusy)
            return;
    
        const citiesToFetch = citiesToShow.filter(city => Object.keys(city.current_weather).length === 0);
    
        if (citiesToFetch.length > 0) {
            citiesToFetch.forEach(city => {
                dispatch(citiesGetCityWeather(city));
            });
        }

    }, [citiesToShow, isBusy]);


    const [isCitySearchOpen, setIsCitySearchOpen] = useState();

    


    useEffect(() => {
        setCitiesToShow(arrSliceCircular(cities, idxStart, cntCityCardToShow));
    }, [idxStart, cities, cntCityCardToShow])

    useEffect(() => {
        const updateComponentWidth = () => {
            if (refCityGallery.current) {
            const width = refCityGallery.current.getBoundingClientRect().width;
            setWidthCityGallery(width);
            }
        };
    
        updateComponentWidth();
    
        window.addEventListener('resize', updateComponentWidth);
    
        return () => {
            window.removeEventListener('resize', updateComponentWidth);
        };
    }, []);

    function toggleCitySearch() {
        setIsCitySearchOpen(!isCitySearchOpen);
    }

    const onSubmit = data => {
        dispatch(citiesSearchCity(data.city_name));
    };

    const { register, handleSubmit, formState: { errors } } = useForm();


    return (
        <>
        <div ref={refCityGallery} className="city-gallery">
            <img onClick={() => setIdxStart(arrDecrementIdxCircularly(cities, idxStart))} className="city-gallery__button"src={iconLeft} alt="icon-left"/>
            <div  className="city-gallery__cards">
                {
                    citiesToShow.map(city => <CityCard className="city-gallery__card" key={city.id} city={city}/>)
                }
                { widthCityGallery >= 480 && <CardAddCity onClick={toggleCitySearch} className="city-gallery__card"/> }
            </div>
            <img onClick={() => setIdxStart(arrIncrementIdxCircularly(cities, idxStart))} className="city-gallery__button" src={iconRight} alt="icon-rigth"/>
        </div>
        { widthCityGallery < 480 && <button onClick={toggleCitySearch} className="btn btn-pill bg-purple">ADD CITY</button> }
        
        <div className={`city-search ${isCitySearchOpen ? "disp-block" : "disp-none"}`}>

            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="input-search-city">City:</label>
                <input id="input-search-city" type="search" className="input-field" placeholder="Search cities..." {...register("city_name", {required: true, maxLength: 80})} />
                <input type="submit" className="btn" value="Search"/>

                <div className="search-results">
                    <ul>
                        
                    </ul>
                </div>

            </form>
        </div>
        </>

    );
}