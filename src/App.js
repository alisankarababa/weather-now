import './App.css';
import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { actionsCitiesAddCity, actionsCitiesRemoveCity } from './store/actions/actionsCities';
import { useSelector } from 'react-redux';

function App() {
    
    const dispatch = useDispatch();
    const cities = useSelector(state => state.cities);
    const [cityInput, setCıtyInput] = useState("");
    const [removeCityInput, setRemoveCityInput] = useState("");

    function hChange(e) {
        setCıtyInput(e.target.value);
    }

    function hRemoveCityChange(e) {
        setRemoveCityInput(e.target.value);
    }

    function hClick() {
        dispatch(actionsCitiesAddCity(cityInput));
    }

    function hClickRemove() {
        dispatch(actionsCitiesRemoveCity(removeCityInput));
    }
  
    return (
    <div className="App">
        
        <input onChange={hChange} value={cityInput}/>
        <button onClick={hClick}>Add City</button>

        <input onChange={hRemoveCityChange} value={removeCityInput}/>
        <button onClick={hClickRemove}>remove city</button>

        {
            cities.map(city => <div>{city}</div>)
        }
    </div>
  );
}

export default App;
