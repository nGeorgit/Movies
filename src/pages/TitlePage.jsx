import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import TitleDetails from '../components/TitleDetails'


import TMDB from '../API'

function TitlePage() {
	const { type, id } = useParams()
	const title = TMDB.getTitle(type, id)
	console.log(title.data)
	const vidsrcLink = 'https://vidsrc.to/embed/movie/'+ id



	return (
		<>
			<h1>{id}</h1>
			{title.data && <TitleDetails title={title.data} id={id}/>}
			
		</>
	)
}
export default TitlePage