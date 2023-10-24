import './App.css';

import { Route, Switch, Redirect } from "react-router-dom";

import CityGallery from './pages/CityGallery';
import Header from './layout/Header';

function App() {
    
    return (
    <div className="App">
        
        <Header/>

        <div className='container'>
        <Switch>
            <Route path="/city-gallery">
              <CityGallery />
            </Route>

            <Route path="/">
              <Redirect to="/city-gallery" />
            </Route>
        </Switch>
        </div>
    </div>
  );
}

export default App;
