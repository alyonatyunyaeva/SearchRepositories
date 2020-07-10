
const gitHub = {
    searchTop(){
        return fetch(`https://api.github.com/search/repositories?sort=stars&q=stars:%3E=1`,
        ).then(
            response=>{
                return response.json();
            }
        ).then(
            jsonResponse => {
                if (!jsonResponse.items) {
                    return [];
                }

                return jsonResponse.items.map(
                    item => {
                        return  {
                            id: item.id,
                            reposName: item.name,
                            reposUrl: item.html_url,
                            stars: item.stargazers_count,
                            lastCommitDate: item.pushed_at,
                            icon: item.owner.avatar_url,
                            ownerName: item.owner.login,
                            ownerPage: item.owner.html_url,
                            language: item.language,
                            reposDesc: item.description,
                            contributors: item.contributors_url,
                        };
                    }
                ).slice(0, 10);            
            }
        ).catch(
            () => {
                console.log('--  Error  --')
                return [];
            }
        );
    },

    searchReposByName(queryText, pageNum){
        return fetch(`https://api.github.com/search/repositories?sort=stars&q=${queryText}+in:name&per_page=10&page=${pageNum}`, 
        ).then(
            response=>{
                return response.json();
            }
        ).then(
            jsonResponse => {
                if (!jsonResponse.items) {
                    return {totalCount: 0, repositories: []};
                }
                return {
                    totalCount: jsonResponse.total_count,
                    repositories: jsonResponse.items.map(
                        item => {
                            return  {
                                id: item.id,
                                reposName: item.name,
                                reposUrl: item.html_url,
                                stars: item.stargazers_count,
                                lastCommitDate: item.updated_at,
                                icon: item.owner.avatar_url,
                                ownerName: item.owner.login,
                                ownerPage: item.owner.html_url,
                                language: item.language,
                                reposDesc: item.description,
                                contributors: item.contributors_url,
                            };
                        }
                    ) 
                }
            }
        ).catch(
            () => {
                console.log('--  Error  --')
                return [];
            }
        );
    },
    
    searchCertainRepos(owner, name){
        return fetch(`https://api.github.com/search/repositories?q=repo:${owner}/${name}`, 
        ).then(
            response=>{
                return response.json();
            }
        ).then(
            jsonResponse => {
                if (!jsonResponse.items) {
                    return [];
                }
                return {
                        id: jsonResponse.items[0].id,
                        reposName: jsonResponse.items[0].name,
                        reposUrl: jsonResponse.items[0].html_url,
                        stars: jsonResponse.items[0].stargazers_count,
                        lastCommitDate: jsonResponse.items[0].updated_at,
                        icon: jsonResponse.items[0].owner.avatar_url,
                        ownerName: jsonResponse.items[0].owner.login,
                        ownerPage: jsonResponse.items[0].owner.html_url,
                        language: jsonResponse.items[0].language,
                        reposDesc: jsonResponse.items[0].description,
                        contributors: jsonResponse.items[0].contributors_url,
                        };        
            }
        ).catch(
            () => {
                console.log('--  Error  --')
                return [];
            }
        );
    },

    searchContributors(url){
        return fetch(url).then(
            response=>{
                return response.json();
            }
        ).then(
            jsonResponse => {
                return jsonResponse.map(
                    contributor => {
                        return  {
                            id: contributor.id,
                            contributorName: contributor.login,
                            contributorImg: contributor.avatar_url,
                            contributorLink: contributor.html_url,
                            contributions: contributor.contributions,
                        }
                    }
                ).slice(0, 10);             
            }    
        ).catch(
            () => {
                console.log('--  Error  --')
                return [];
            }
        );
    },


};

export default gitHub;