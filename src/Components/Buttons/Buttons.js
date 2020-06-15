import React from 'react';
import './Buttons.css';

class Buttons extends React.Component {
    constructor(props){
        super(props);

        this.handleOnClick = this.handleOnClick.bind(this);
    }
handleOnClick(e){
    let direction = e.target.value;
    this.props.paginator(direction);
}

    render() {
        return (
            <div>
                {this.props.pageNum}
                <button onClick={this.handleOnClick} value='minus'> назад </button>
                <button onClick={this.handleOnClick} value='plus'> вперед </button>
            </div>
        )
    }
};
 export default Buttons