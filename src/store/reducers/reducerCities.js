import { CITIES_ADD, CITIES_REMOVE } from "../actions/actionsCities";

const initialState = [
	{ name: "İstanbul", max: 15, min: 0, weather: "cloudy" },
    { name: "Sivas", max: 7, min: -3, weather: "snowy" },
    { name: "Bursa", max: 12, min: 4, weather: "rainy" },
    { name: "Adana", max: 22, min: 17, weather: "sunny" },
];

export default function reducerCities(state=initialState, action) {

    let retState;

    switch (action.type) {
        case CITIES_ADD:
            const isCityInState = state.find(city => city === action.payload);
            retState = isCityInState ? state : [...state, action.payload];
            break;

        case CITIES_REMOVE:
            retState = state.filter(city => city !== action.payload);
            break;
        default:
            retState = state;
            break;
    }

    return retState;
}