import React, { useState, useEffect } from 'react'
import PokemonList from './PokemonList'
import Pagination from './Pagination'
import axios from 'axios'

function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() =>{
    setIsLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
    .then(res => {
      setIsLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p => p.name))
    })

    return () => cancel()
  }, [currentPageUrl])

  function gotoNextPage(){
    setCurrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage(){
    setCurrentPageUrl(prevPageUrl)
  }

  if(isLoading) return "Loading..."

  return (
    <>
      <PokemonList pokemon = {pokemon} />
      <Pagination
        gotoNextPage = {nextPageUrl ? gotoNextPage : null}
        gotoPrevPage = {prevPageUrl ? gotoPrevPage : null}
      />
    </>
  );
}

export default App;
