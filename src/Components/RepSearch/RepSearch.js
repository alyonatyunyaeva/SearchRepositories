import React from 'react';
import Repository from '../Repository/Repository';
import gitHub from '../GitSearch/GitSearch'
import { withRouter } from 'react-router-dom';
import PageControls from '../PageControls/PageControls'

class RepSearch extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            repositories: [],
            loading: false,
        };
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
            repositories => {
                this.setState({
                    repositories: repositories,
                    loading: false,
                })
            }
        )
    }

    render(){
        return(
            <div className='rep-list-search'>
                <PageControls />
                {this.state.loading && 'loading'}
                {this.state.repositories.map(
                    repository => {
                        return <Repository key={repository.id} repository={repository} />
                    }
                )
                }
            </div>
        );
    };
};

export default withRouter(RepSearch);