import React from 'react';
import './RepList.css';
import gitHub from '../GitSearch/GitSearch';
import Repository from '../Repository/Repository';
import '../loader-animation/loader-animation.css';
type Props = {
}

type RepositoryType = {
    id: string,
    reposName: string,
    reposUrl: string,
    stars: string,
    lastCommitDate: string,
    icon: string,
    ownerName: string,
    ownerPage: string,
    language: string,
    reposDesc: string,
    contributors: string,
}

type State = {
    repositories: Array<RepositoryType>,
    isLoading: boolean,
}

class RepList extends React.Component<Props, State> {

    constructor(props: Props){
        super(props);

        this.state = {
            repositories: [],
            isLoading: false,
        };
    }
    componentDidMount(){
        this.setState({
            isLoading: true,
        })
        gitHub.searchTop().then(
            repositories => {
                this.setState({
                    repositories: repositories,
                    isLoading: false,
                })
            }
        )
    }
    render(){
        return(
            <div className='rep-list'>
                GitHub Top 10
                {this.state.isLoading && (
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
                {!this.state.isLoading && (
                    this.state.repositories.map(
                        repository => {
                            return <Repository key={repository.id} repository={repository} />
                        }
                    )
                ) 
                }
                
            </div>
        );
    };
};

export default RepList;