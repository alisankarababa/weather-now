import { combineReducers } from 'redux';

import reducerCities from "../reducers/reducerCities"

export const reducers = combineReducers({
    cities: reducerCities,
});
