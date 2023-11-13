import "./CityGallery.css"

import { useSelector } from "react-redux"
import CityCard from "../components/CityCard"
import CardAddCity from "../components/CardAddCity"

import iconRight from "../assets/chevron-compact-right.svg"
import iconLeft from "../assets/chevron-compact-left.svg"
import { useState, useEffect, useRef } from "react"

import { arrSliceCircular, arrIncrementIdxCircularly, arrDecrementIdxCircularly } from "../utils/utils"

import { citiesGetCityWeather, citiesSearchCity, actionsCitiesAddCity, actionsCitiesDeleteCity, actionCitiesClearSearchResults } from "../store/actions/actionsCities"

import { useDispatch } from "react-redux"
import PopUpSearch from "../components/PopUpSearch"

export default function CityGallery() {
    
    const dispatch = useDispatch();
    const cities = useSelector((store) => store.cities.cityList);
    const searchResult = useSelector( store => store.cities.searchResult);
    const isBusy = useSelector( store => store.cities.isBusy);

    const [idxStart, setIdxStart] = useState(0);
    const [citiesToShow, setCitiesToShow] = useState([]);
    const [cntCityCardToShow, setCntCityCardToShow] = useState(0);

    const refCityGallery = useRef(null);
    const refPopup = useRef(null);
    
    const [widthCityGallery, setWidthCityGallery] = useState(0);


    function hDeleteCity ( cityId ) {
        dispatch(actionsCitiesDeleteCity(cityId));
    }

    function renderSearchResult( city ) {

        if ( city.state ) {
            return `${city.name}, ${city.state}/${city.country}`;
        }

        return `${city.name}, ${city.country}`;
    }
    
    useEffect(() => {

        if(widthCityGallery >= 1100) {
            setCntCityCardToShow(3);
        }
        else if(widthCityGallery >= 900) {
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

    }, [ citiesToShow, isBusy ]);

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

        function hKeyDown (e) {

            if ( "Escape" === e.key ) {
                setIsCitySearchOpen(false);
            }
        }
    
        function hMouseDown (e) {

            if(refPopup.current && !refPopup.current.contains(e.target)) {
                console.log("here");
                setIsCitySearchOpen(false);
            }
        }

        updateComponentWidth();

        window.addEventListener('resize', updateComponentWidth);
        document.addEventListener("keydown", hKeyDown);
        document.addEventListener("mousedown", hMouseDown);

    
        return () => {
            window.removeEventListener('resize', updateComponentWidth);
            document.removeEventListener("keydown", hKeyDown);
            document.removeEventListener("mousedown", hMouseDown);
        };
    }, []);

    useEffect(() => {
        if(!isCitySearchOpen)
    		dispatch(actionCitiesClearSearchResults());

    }, [isCitySearchOpen])

    function hClickResult(idx) {
		dispatch(actionsCitiesAddCity(searchResult[idx]));
		setIsCitySearchOpen(false);
	}


    return (
        <div ref={refCityGallery} className="city-gallery">
            <div className="gallery">
                <img onClick={() => setIdxStart(arrDecrementIdxCircularly(cities, idxStart))} className="gallery__button"src={iconLeft} alt="icon-left"/>
                <div  className="gallery__cards">
                    {
                        citiesToShow.map(city => <CityCard hDelete={hDeleteCity} className="gallery__card" key={city.id} city={city}/>)
                    }
                    { widthCityGallery >= 600 && <CardAddCity onClick={ () => setIsCitySearchOpen(true) } className="gallery__card"/> }
                </div>
                <img onClick={() => setIdxStart(arrIncrementIdxCircularly(cities, idxStart))} className="gallery__button" src={iconRight} alt="icon-rigth"/>
            </div>
            { widthCityGallery < 600 && <button onClick={() => setIsCitySearchOpen(true)} className="btn btn-pill bg-purple">ADD CITY</button> }

            {
                isCitySearchOpen &&
            
                <PopUpSearch
                    hSearch={ (searchValue) => dispatch( citiesSearchCity( searchValue ) ) }
                    hClickResult={ hClickResult }
                    placeholder="Search a city..."
                    results={ searchResult }
                    renderResult={ renderSearchResult }
                    reference={refPopup}
                />
            }
        </div>
    );
}