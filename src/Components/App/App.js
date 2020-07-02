import React from 'react';
import './App.css';
import RepList from '../RepList/RepList';
import RepSearch from '../RepSearch/RepSearch';
import SearchBar from '../SearchBar/SearchBar';
import Details from '../Details/Details';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";


class App extends React.Component {

  render(){
    return (
      <Router>
        <div className="App">
          <div className="App-main">
            <Switch>
              <Route path="/details/:username/:reponame">
                <Details/>
              </Route>
              <Route path="/search/:query/:pagenumber?">
                <>
                  <SearchBar/>
                  <RepSearch/> 
                </>
              </Route>

              <Route path="/">
                <div>
                  <SearchBar/>
                  <br/>
                  <RepList/>
                </div>
              </Route>

            </Switch>
          </div>
        </div>
      </Router>
    );
  }

}

export default App;
