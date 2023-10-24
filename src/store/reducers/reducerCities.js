import { CITIES_ADD, CITIES_REMOVE } from "../actions/actionsCities";

const initialState = [];

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