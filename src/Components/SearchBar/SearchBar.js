import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            queryText: '',
        };
        this.handleQueryText=this.handleQueryText.bind(this);
        this.handleSearch=this.handleSearch.bind(this);

    }

    handleQueryText(event){
        this.setState({
            queryText: event.target.value
        })
    }

    handleSearch(event){
        if (!(event.type === 'keydown' && event.keyCode !== 13)){
            this.props.searchReposByName(this.state.queryText);
            event.preventDefault();
        }
        
    }


    render() {
        return (
            <div>
                <div className="SearchBar-fields">
                    <input 
                        onChange={this.handleQueryText} 
                        onKeyDown={this.handleSearch}
                        placeholder="Search Repositories" 
                    />
                </div>
                <div className="SearchBar-submit" >
                    <a onClick={this.handleSearch}>Let's Go</a>
                </div>
            </div>
        )
    }
};

export default SearchBar;