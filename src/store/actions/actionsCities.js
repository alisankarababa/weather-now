export const CITIES_ADD = "CITIES_ADD";
export const CITIES_REMOVE = "CITIES_REMOVE";


export function actionsCitiesAddCity(city) {
    return {type: CITIES_ADD, payload: city}
}

export function actionsCitiesRemoveCity(city) {
    return {type: CITIES_REMOVE, payload: city}
}




