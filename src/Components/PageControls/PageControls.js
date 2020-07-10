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
        if (this.props.match.params.pagenumber < this.props.totalPages)
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
                <button value='minus' className = "pageControls" onClick={this.handleSearchMinus}>&#8249;</button>
                {this.props.match.params.pagenumber} из {this.props.totalPages}
                <button value='plus' className = "pageControls" onClick={this.handleSearchPlus}>&#8250;</button>
            </div>
        )
    }
};

 export default withRouter(PageControls);