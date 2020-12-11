import React, {useContext} from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const { githubRepos } = useContext(GithubContext)
  let languages = githubRepos.reduce((total, item)=>{
    const { language } = item
    if (!language) return total
    if (!total[language]){
      total[language] = {"label":language, "value":1}
    }else{
      total[language] = {"label":language, "value":total[language].value + 1}
    }
    return total
  },{})
  languages = Object.values(languages).sort((a,b)=>{
    return b.value - a.value
  }).slice(0,5)

  let starsPerLanguage = githubRepos.reduce((total, item)=>{
    const { stargazers_count, language } = item
    if (!stargazers_count) return total
    if (!language) return total
    if (!total[language]){
      total[language] = {"label":language, "value":stargazers_count}
    }else{
      total[language] = {"label":language, "value":total[language].value + stargazers_count}
    }
    return total
  },{})
  starsPerLanguage = Object.values(starsPerLanguage).sort((a,b)=>{
    return b.value - a.value
  }).slice(0,5)

  const starsPerRepo = githubRepos.reduce((total, item)=>{
    const { stargazers_count, name, forks_count } = item
    if (!stargazers_count) return total
    if (!name) return total
    if (!total[name]){
      total[name] = {"label":name, "value":stargazers_count, "forks_count":forks_count}
    }else{
      total[name] = {"label":name, "value":total[name].value + stargazers_count, "forks_count":total[name].forks_count + forks_count}
    }
    return total
  },{})
  let starsCountPerRepo = Object.values(starsPerRepo).sort((a,b)=>{
    return b.value - a.value
  }).slice(0,5)

  let forkCountPerRepo = Object.values(starsPerRepo).sort((a,b)=>{
    return b.forks_count - a.forks_count
  }).map((item)=>{
    return {...item, "value":item.forks_count}
  }).slice(0,5)
  return (
      <section className="section">
            <Wrapper className="section-center">
            <Pie3D chartData={languages}/>
            <Column3D chartData={starsCountPerRepo}/>
            <Doughnut2D chartData={starsPerLanguage}/>
            <Bar3D chartData={forkCountPerRepo}/>
            </Wrapper>

      </section>
  )
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
