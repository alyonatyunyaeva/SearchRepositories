import React from 'react';
import './Repository.css';

class Repository extends React.Component {
    render(){
        return(
            <div className="repository">

                <div className="repository__line-1">
                    <div className="repository__image-container">
                        <img src={this.props.repository.icon} className="repository__image-container-img" alt='Some picture'/>
                    </div>
                    <div className="repository__reposName">
                        {this.props.repository.reposName}
                    </div>
                </div>

                <div className="repository__line-2">
                    <div className="repository__stars-img">
                    </div>
                    <p className="repository__stars">
                        {this.props.repository.stars}
                    </p>
                    <p className="repository__last-commit">
                        Last commit was <br/> {this.props.repository.lastCommitDate}
                    </p>
                    <a href={this.props.repository.reposUrl} className="repository__link" target="blank">
                        Go to repository
                    </a>
                </div>

            </div>
        );
    };
};

export default Repository;

