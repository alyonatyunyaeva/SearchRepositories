import React from 'react';
import './App.css';
import RepList from '../RepList/RepList';
import gitHub from '../GitSearch/GitSearch'
import SearchBar from '../SearchBar/SearchBar';
import Buttons from '../Buttons/Buttons';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      repositories: [],
      isLoading: false,
      pageNum: 1,
      query: '',
    };
    this.searchReposByName = this.searchReposByName.bind(this);
    this.paginator = this.paginator.bind(this)
  }
  componentDidMount(){
    this.setState({
      isLoading: true,
    });
    gitHub.searchTop().then(
      repositories => {
          this.setState({
            repositories: repositories,
            isLoading: false,
          });
      }
    )
  }

  searchReposByName(queryText){
    this.setState({
      isLoading: true,
      query: queryText,
    });
    if(queryText === ''){
      gitHub.searchTop().then(
        repositories => {
            this.setState({
              repositories: repositories,
              pageNum: 1,
              isLoading: false,
            });
        }
      )
    } else {
      gitHub.searchReposByName(queryText, this.state.pageNum).then(
        repositories => {
          this.setState({
            repositories: repositories,
            isLoading: false,
          });
        }
      )
    }
  }

  paginator(direction){

    if(direction === 'plus'){
      this.setState({
        pageNum: ++this.state.pageNum
      });
    };
    if (this.state.pageNum !== 1 && direction === 'minus'){
      this.setState({
        pageNum: --this.state.pageNum
      });
    }

    if(this.state.query !== ''){
      this.setState({
        isLoading: true,
      });

      gitHub.searchReposByName(this.state.query, this.state.pageNum).then(
        repositories => {
          this.setState({
            repositories: repositories,
            isLoading: false,
          });
        }
      )
    };
  }


  render(){
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            {this.state.isLoading && 'Загрузка...'}
            <div>

              <Buttons  
                paginator={this.paginator}
                pageNum={this.state.pageNum}
              />
              <SearchBar searchReposByName={this.searchReposByName}/>
              <RepList list={this.state.repositories} />
              
            </div>
          </header>
        </div>

        <Link to="/users">Users</Link>

        <Switch>
          <Route path="/about">
            <div>about about about</div>
          </Route>
          <Route path="/users">
            <div>users users users</div>
          </Route>
          <Route path="/">
            <div>home home home</div>
          </Route>
        </Switch>

      </Router>
    );
  }

}

export default App;
