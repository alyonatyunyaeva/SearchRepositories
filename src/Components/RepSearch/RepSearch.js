import React from 'react';
import Repository from '../Repository/Repository';
import gitHub from '../GitSearch/GitSearch'
import { withRouter } from 'react-router-dom';
import PageControls from '../PageControls/PageControls';
import '../loader-animation/loader-animation.css';
import './RepSearch.css';

class RepSearch extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            repositories: [],
            loading: false,
            totalPages: 0,
            noResult: false,
        };
        this.goBack = this.goBack.bind(this);
    }
    componentDidMount(){
        this.search();
    }
    componentDidUpdate(prevProps){
        if (this.props.match.params.query !== prevProps.match.params.query 
            || this.props.match.params.pagenumber !== prevProps.match.params.pagenumber ){
            this.search();
        }
        
    }
    search(){
        let query = this.props.match.params.query,
            pagenumber = this.props.match.params.pagenumber;
        this.setState({
            loading: true
        });
        gitHub.searchReposByName(query, pagenumber).then(
            ({totalCount, repositories}) => {
                const totalPages = Math.ceil(totalCount/10);

                if (totalPages === 0){
                    this.setState({
                        noResult: true,
                        loading: false,
                    })
                    return;
                }

                if (totalPages < 100) {
                    this.setState({
                        totalPages: totalPages,
                        repositories: repositories,
                        loading: false,
                        noResult: false,
                    })
                } else {
                    this.setState({
                        totalPages: 100,
                        repositories: repositories,
                        loading: false,
                        noResult: false,
                    })
                }
            }
        )
    }

    goBack(){
        if (this.props.match.params.pagenumber !== "1"){
            this.props.history.push({
                pathname: `/search/${this.props.match.params.query}/1`,
            });
        }  else {
            this.props.history.push({
                pathname: "/",
            });
        }
        
    }

    render(){
        return(
            <div className='rep-list-search'>
                {this.state.loading && (
                    <div>
                    <div>Loading</div>
                    <div className ='loader-container'>
                        <div className='triangle'></div>
                        <div className='triangle'></div>
                        <div className='triangle'></div>
                        <div className='triangle'></div>
                        <div className='triangle'></div>
                    </div>
                    </div>
                )}
                {
                    (!this.state.noResult && !this.state.loading) && 
                    (<div>
                        <PageControls totalPages = {this.state.totalPages}/> 
                        
                        <div  onClick={this.goBack}> 
                        {(this.props.match.params.pagenumber === "1") && (<div className="repoDetails__back" >← back to TOP!</div>)}
                        {(this.props.match.params.pagenumber !== "1") && (<div className="repoDetails__back" >← to the begining</div>)}
                        </div>
                        <div>
                            RESULTS FOR "{this.props.match.params.query.toUpperCase()}" QUERY
                        </div>
                        {this.state.repositories.map(
                            repository => {
                                return <Repository key={repository.id} repository={repository} />
                            }
                        )}
                    </div>
                    )
                }
                {
                    (this.state.noResult && !this.state.loading) && (
                        <div>
                            <div onClick={this.goBack}>← back to TOP!</div>
                            <br/>
                            Sorry, no matches were found for your query. <br/>
                            <img className='noResultImg' src='/catcrying.gif'/>
                        </div>
                    )
                }
            </div>
        );
    };
};

export default withRouter(RepSearch);