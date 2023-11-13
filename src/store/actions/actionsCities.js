import axios from "axios";

export const actionsOfCities = {
    ADD_CITY: "cities / got coordinates of a city to add to cityList",
    DELETE_CITY: "cities / got id of a city to remove from cityList",
    GET_CITY_CURRENT_WEATHER: "cities/ got an order to get current city weather",
    FETCHING_CITY_CURRENT_WEATHER: "cities/ getting current weather",
    FETCH_SUCCESS_CITY_CURRENT_WEATHER: "cities/ got current weather",
    FETCH_FAIL_CITY_CURRENT_WEATHER: "cities/ got current weather",
    GET_CITY_SEARCH: "cities/ got an order to search for a city",
    FETCHING_CITY_SEARCH: "cities/ searching for a city",
    FETCH_SUCCESS_CITY_SEARCH: "cities/ search for a city name succeded",
    FETCH_FAIL_CITY_SEARCH: "cities/ search for a city name failed",
    SEARCH_RESULTS_CLEARED: "cities /search results cleared"
}


export function actionsCitiesAddCity( city ) {
    return {type: actionsOfCities.ADD_CITY, payload: city }
}

export function actionsCitiesDeleteCity( cityId ) {
    return {type: actionsOfCities.DELETE_CITY, payload: cityId }
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

export function actionCitiesClearSearchResults() {
    return { type: actionsOfCities.SEARCH_RESULTS_CLEARED };
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