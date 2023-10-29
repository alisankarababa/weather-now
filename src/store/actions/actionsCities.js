import axios from "axios";


export const CITIES_ADD = "CITIES_ADD";
export const CITIES_REMOVE = "CITIES_REMOVE";

export const actionsOfCities = {
    GET_CITY_CURRENT_WEATHER: "cities/ got an order to get current city weather",
    FETCHING_CITY_CURRENT_WEATHER: "cities/ getting current weather",
    FETCH_SUCCESS_CITY_CURRENT_WEATHER: "cities/ got current weather",
    FETCH_FAIL_CITY_CURRENT_WEATHER: "cities/ got current weather",
    GET_CITY_SEARCH: "cities/ got an order to search for a city",
    FETCHING_CITY_SEARCH: "cities/ searching for a city",
    FETCH_SUCCESS_CITY_SEARCH: "cities/ search for a city name succeded",
    FETCH_FAIL_CITY_SEARCH: "cities/ search for a city name failed",
}


export function actionsCitiesAddCity(city) {
    return {type: CITIES_ADD, payload: city}
}

export function actionsCitiesRemoveCity(city) {
    return {type: CITIES_REMOVE, payload: city}
}

export const citiesGetCityWeather = ( city ) => (dispatch) => {

    dispatch(citiesGettingCityCurrentWeather());

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?appid=044352fbcf42eca0fb4e322f1140c447&units=metric&lat=${city.lat}&lon=${city.lon}`)
      .then((res) => {
        dispatch(citiesFecthSuccessCityCurrentWeather(city.id, res));
    })
      .catch((err) => {
        dispatch(citiesFecthFailCityCurrentWeather(err.message));
    });
}

function citiesGettingCityCurrentWeather() {
    return { type: actionsOfCities.FETCHING_CITY_CURRENT_WEATHER };
}

function citiesFecthSuccessCityCurrentWeather(city_id, response) {
    return { type: actionsOfCities.FETCH_SUCCESS_CITY_CURRENT_WEATHER, payload: {city_id, response}};
}

function citiesFecthFailCityCurrentWeather() {
    return { type: actionsOfCities.FETCH_FAIL_CITY_CURRENT_WEATHER };
}

export const citiesSearchCity = ( searchedName ) => (dispatch) => {

    dispatch(citiesFetchingCitySearch());

    axios
      .get(`https://api.openweathermap.org/geo/1.0/direct?appid=044352fbcf42eca0fb4e322f1140c447&limit=5&q=${searchedName}`)
      .then((res) => {
        dispatch(citiesFetchSuccessCitySearch(res.data));
    })
      .catch((err) => {
        dispatch(citiesFetchFailureCitySearch(err.message));
    });
}

const citiesFetchingCitySearch = () => {
    return  {type: actionsOfCities.FETCHING_CITY_SEARCH };
}

const citiesFetchSuccessCitySearch = (res) => {
    return { type: actionsOfCities.FETCH_SUCCESS_CITY_SEARCH, payload:res };
}

const citiesFetchFailureCitySearch = (err) => {
    return { type: actionsOfCities.FETCH_FAIL_CITY_SEARCH, payload: err };
}