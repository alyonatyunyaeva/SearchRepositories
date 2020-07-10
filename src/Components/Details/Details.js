import React from 'react';
import './Details.css';
import gitHub from '../GitSearch/GitSearch'
import { withRouter } from 'react-router-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class Details extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            repository: {},
            contributors: [],
            loading: false,
        };

        this.goBack = this.goBack.bind(this);
        this.renderContriList = this.renderContriList.bind(this);
    }
    componentDidMount(){
        this.setState({
            loading: true
        });
        let username = this.props.match.params.username,
            reponame = this.props.match.params.reponame;
        console.log(username, reponame)
        gitHub.searchCertainRepos(username, reponame).then(
            repository => {
                this.setState({
                  repository: repository,
                  loading: false,
                })
                return repository.contributors
            }
        ).then( 
            contributorUrl => {
                return gitHub.searchContributors(contributorUrl)
            }
        ).then(
            contributors => {
                this.setState({
                    contributors: contributors,
                });
            }
        )
    }
    goBack(){
        this.props.history.goBack();
    }
    renderContriList(){
        return this.state.contributors.map(
            contributor => {
                return(
                    <div className="contributors-top__list__contributor" key={contributor.id}>
                        <div>
                            <img src={contributor.contributorImg} className="contributors-top__list__contributor-img"/>
                        </div>
                        <div className="contributors-top__list__contributor-name">
                            <a className="contributors-top__list__contributor-name" href={contributor.contributorLink} target='blank'>
                                {contributor.contributorName}
                            </a>
                        </div>
                        <div className="contributors-top__list__contributor-count">
                            {contributor.contributions}
                        </div>
                    </div>
                )
            }
        )
    }

    render(){
        console.log('det>>> ', this.props.match.params)
        return (
            <div className = 'repoDetails'>
                <div className="repoDetails__pointer">
                    DETAILS
                </div>
                <div className="repoDetails__back" onClick={this.goBack}> 
                    ← back
                </div>

                {this.state.loading && 'loading'}
                {!this.state.loading &&
                <div>
                    <div className="repo-header">
                        <div className="repo-header__names">
                            <div className="repo-header__names-repository">
                                <div className="repo-header__names-repository-image-container">
                                    <img src={this.state.repository.icon} className="repo-header__names-repository-image-container-img" alt='Owner Picture'/>
                                </div>
                                <div className="repo-header__names-repository-name">
                                    {this.state.repository.reposName} 
                                </div>
                            </div>
                            <div className = "repo-header__names-owner">
                                by <br/>
                                <a href={this.state.repository.ownerPage} className="repo-header__names-owner-link" target="blank">
                                    {this.state.repository.ownerName}
                                </a>
                            </div>
                        </div>
                        <div className="repo-header__details">
                            <div className="repo-header__details-stars-img">
                            </div>
                            <p className="repo-header__details-stars">
                                {this.state.repository.stars}
                            </p>
                            <p className="repo-header__details-last-commit">
                                Last commit was <br/> {this.state.repository.lastCommitDate}
                            </p>                   
                        </div>
                    </div>

                    <div className="main-info">

                        <div className = "main-info__language">
                            LANGUAGE <br/>
                            {this.state.repository.language}
                        </div>
                        <div className = "main-info__desc">
                            DESCRIPTION <br/>
                            {this.state.repository.reposDesc}
                        </div>
                    </div>

                    <div className = "contributors-top">
                        <div className="contributors-top__pointer">
                            CONTRIBUTORS TOP 
                        </div>      
                        <div className="contributors-top__list">               
                            {this.renderContriList()}   
                        </div>              
                    </div>
                </div>
                }
            </div>
        )
    }

}
export default withRouter(Details);