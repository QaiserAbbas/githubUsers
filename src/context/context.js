import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

const GithubProvider = ({children}) =>{
    const [githubUser, setGithubUser] = useState(mockUser)
    const [githubRepos, setGithubRepos] = useState(mockRepos)
    const [githubFollowers, setGithubFollowers] = useState(mockFollowers)

    const [requests, setRequests] = useState(0)
    const [isLoading, setIsloading] = useState(false)

    const [error, setError] = useState({show:false, msg:""})

    const checkRequests = () =>{
        axios(`${rootUrl}/rate_limit`).then(({data})=>{
            let {
                rate: {remaining},
            } = data
            setRequests(remaining)
            if (remaining === 0 ){
                toggleError(true, "sorry, you have exceeded your hourly rate limit!")
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
    function toggleError(show = false,msg = ""){
        setError({show:show, msg:msg})
    }

    // const serachGithunUsers = async (user) => {
    //    const response = await axios(`${rootUrl}/users/${user}`)
    //    .catch((error)=>{
    //         console.log(error)
    //         toggleError(true, "sorry, there is no user with that username!")
    //     })
    //     if (response){
    //         setGithubUser(response.data)
    //     }else{
    //         toggleError(true, "sorry, there is no user with that username!")
    //     }
    // }
    const serachGithunUsers = async (user) => {
        toggleError(false, "")
        setIsloading(true)
        const response = await axios(`${rootUrl}/users/${user}`)
        .catch((error)=>{
            setIsloading(false)
            toggleError(true, "sorry, there is no user with that username!")
         })
            if (response){
                setGithubUser(response.data)
                const {followers_url, repos_url} = response.data
                const followers = axios(`${followers_url}?per_page=100`)

                const repos = axios(`${repos_url}?per_page=100`)

                await Promise.allSettled([followers, repos]).then((resluts)=>{
                    const [followers, repos] = resluts
                    if  (followers.status === 'fulfilled'){
                        setGithubFollowers(followers.value.data)
                    }
                    if  (repos.status === 'fulfilled'){
                        setGithubRepos(repos.value.data)
                    }
                    setIsloading(false)
                })
            }else{
                setIsloading(false)
                toggleError(true, "sorry, there is no user with that username!")
            }
            checkRequests()
     }

    useEffect(()=>{
        checkRequests()
    },[])
    
    return(
        <GithubContext.Provider value={
            {
                githubUser:githubUser,
                githubRepos:githubRepos,
                githubFollowers:githubFollowers,
                requests:requests,
                isLoading:isLoading, 
                error:error,
                serachGithunUsers:serachGithunUsers
            }
            }>
            {children}
        </GithubContext.Provider>
    );
}

export {GithubProvider, GithubContext};