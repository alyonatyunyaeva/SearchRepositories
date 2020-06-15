import React from 'react';
import './RepList.css';
import Repository from '../Repository/Repository';

class RepList extends React.Component {
    render(){
        return(
            <div className='rep-list'>
                {this.props.list.map(
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