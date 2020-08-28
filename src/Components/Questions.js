import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import QueryAllQuestions from "../GraphQL/QueryAllQuestions";

import '../Styles/Questions.scss'

const Questions = () => {
	const [questions, setQuestions] = useState()

	useEffect(() => {
		const getQuestions = async () => {
			const questions = await API.graphql(graphqlOperation(QueryAllQuestions))
			setQuestions(questions)
		}
		getQuestions();
	}, [])

	console.log({questions})

	const allQuestions = questions?.data.listQuestions.items

	return ( 
		<section className="questions">
			<ul className="questions--list">
				{allQuestions?.map(q => <li className="questions--list--item">{q.question}</li>)}
			</ul>
		</section>
	 );
}

export default Questions
