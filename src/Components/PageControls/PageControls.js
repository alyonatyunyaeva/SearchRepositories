import React from 'react';
import './PageControls.css';
import { withRouter } from 'react-router-dom';

class PageControls extends React.Component {
    constructor(props){
        super(props);
         
    this.handleSearchPlus = this.handleSearchPlus.bind(this);
    this.handleSearchMinus = this.handleSearchMinus.bind(this);
    }

    handleSearchPlus(){
        this.props.history.push({
            pathname: `/search/${this.props.match.params.query}/${+this.props.match.params.pagenumber + 1}`,
        });
    }

    handleSearchMinus(){
        if (this.props.match.params.pagenumber > 1){
            this.props.history.push({
                pathname: `/search/${this.props.match.params.query}/${+this.props.match.params.pagenumber - 1}`,
            });
        }
    }
    

    render() {
        return (
            <div>               
                <button value='minus' onClick={this.handleSearchMinus}> назад </button>
                {this.props.match.params.pagenumber}
                <button value='plus' onClick={this.handleSearchPlus}> вперед </button>
            </div>
        )
    }
};

 export default withRouter(PageControls);