import React from 'react';
import './RepList.css';
import gitHub from '../GitSearch/GitSearch'
import Repository from '../Repository/Repository';

class RepList extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            repositories: [],
        };
    }
    componentDidMount(){
        gitHub.searchTop().then(
            repositories => {
                this.setState({
                    repositories: repositories,
                })
            }
        )
    }
    render(){
        return(
            <div className='rep-list'>
                GitHub Top 10
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

export default RepList;