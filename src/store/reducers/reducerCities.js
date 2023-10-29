import { nanoid } from 'nanoid'

import { actionsOfCities } from "../actions/actionsCities";


const initialState = {
    cityList: [
        { id: 1, name: "Sivas Merkez", lat: 39.7503572, lon: 37.0145185, country: "TR", current_weather: {}, main: null },
        { id: 2, name: "Istanbul", lat: 41.0091982, lon: 28.9662187, country: "TR", current_weather: {}, main: null },
        { id: 3, name: "Balıkesir", lat: 39.6473917, lon: 27.8879787, country: "TR", current_weather: {}, main: null },
        { id: 4, name: "London", lat: 51.5073219, lon: -0.1276474, country: "GB", state: "England", current_weather: {}, main: null },
    ],

    searchResult: [],

    isBusy: false,
    error: null,
};

export default function reducerCities(state=initialState, action) {

    let retState;

    switch (action.type) {

        case actionsOfCities.FETCHING_CITY_CURRENT_WEATHER:
            return {...state, isBusy: true, error: null };

        case actionsOfCities.FETCH_SUCCESS_CITY_CURRENT_WEATHER:

            const cityId = action.payload.city_id;
            const currentWeather = action.payload.response.data;

            const stateAfterFetchCurrentData = {...state, isBusy: false};
            const idxCity = stateAfterFetchCurrentData.cityList.findIndex(city => city.id === cityId);
            if(idxCity !== -1) {
                stateAfterFetchCurrentData.cityList[idxCity].current_weather.weather = currentWeather.weather[0];
                stateAfterFetchCurrentData.cityList[idxCity].current_weather.main = currentWeather.main;
                stateAfterFetchCurrentData.cityList[idxCity].current_weather.dt = currentWeather.dt;
            }

            return stateAfterFetchCurrentData;

        case actionsOfCities.FETCHING_CITY_SEARCH:
            return {...state, isBusy: true, error: null, searchResult: [] };

        case actionsOfCities.FETCH_SUCCESS_CITY_SEARCH:
            return { ...state, isBusy: false, searchResult: action.payload };

        case actionsOfCities.FETCH_FAIL_CITY_SEARCH:
            return { ...state, isBusy: false, error: action.payload };
        
        case actionsOfCities.ADD_CITY:
            
            const cityToBeAdded = action.payload;

            const isCityInState = state.cityList.find(city => city.lat === cityToBeAdded.lat && city.lon === cityToBeAdded.lon );
            if ( isCityInState )
                return state; // TODO add an error to say that city is already in the list

            const newCity = {
                
                id: nanoid(),
                name: cityToBeAdded.name,
                lat: cityToBeAdded.lat,
                lon: cityToBeAdded.lon,
                country: cityToBeAdded.country,
                current_weather: {},
                main: null,
            }

            console.log(newCity);

            if ( cityToBeAdded.state )
                newCity.state = cityToBeAdded.state;

            console.log({...state, cityList: [...state.cityList, newCity]});
            return {...state, cityList: [...state.cityList, newCity]};

        default:
            retState = state;
            break;
    }

    return retState;
}