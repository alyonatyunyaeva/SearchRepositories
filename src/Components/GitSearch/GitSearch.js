
const gitHub = {
    searchTop(){
        return fetch(`https://api.github.com/search/repositories?sort=stars&q=stars:%3E=1`,
        ).then(
            response=>{
                return response.json();
            }
        ).then(
            jsonResponse => {
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
                return jsonResponse.items.map(
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
                );            
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