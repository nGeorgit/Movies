import React, { useState, useEffect, useReducer } from 'react'


import Search from '../components/Search'
import TitleList from '../components/TitleList'

import Loader from '../components/Loader'


import TMDB from '../API'

const initialTitlesState = { 
  page: 0,
  data: [],
  totalPages: 0,
  totalTitles: 0,
}

const titlesReducer = (state, {type, payload}) => {
  switch(type) {
    case 'SET_INITIAL':
      return initialTitlesState

    case 'ADD_TITLES':
      return {
        page: state.page + 1,
        totalPages: payload.total_pages,
        totalTitles: payload.total_results,
        // data: [...state.data, ...payload],

        // Handle duplicates? So that react doesn't complain about same keys
        data: [
          ...new Map(
            [...state.data, ...payload.results].map(el => [el.id, el])
          ).values()
        ],
      }

    default:
      throw new Error()
  }
}


function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [titles, dispatch] = useReducer(titlesReducer, initialTitlesState)
  let heroTitle = titles.data && titles.data[0]
 

  useEffect(() => {
    dispatch({ type: 'SET_INITIAL' })
    fetchTitles(1, searchQuery)
  }, [searchQuery])

  const fetchTitles = async (page, searchTerm="") => {
    setLoading(true)
    const newTitles = await TMDB.getMoviesAndTV(page, searchQuery)
    dispatch({ type: 'ADD_TITLES', payload: newTitles}) 
    setLoading(false)
  }

  const handlePagination = () => {
    fetchTitles(titles.page + 1)
  }

	return (
		<>

      <Search setSearch={setSearchQuery} />
      {titles.data && 
        <TitleList 
          loadMore={handlePagination}
          hasMore={titles.totalPages > titles.page}
          header={searchQuery ? "Search Results" : "Popular Today"}
          titles={titles.data}
        />
      }
      {loading && <Loader/>}
      {!(loading || titles.totalPages > titles.page) && null}

		</>
	)
}

export default Home