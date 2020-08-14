import React, { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import '../Styles/QuestionDisplay.scss'

import QueryAllQuestions from "../GraphQL/QueryAllQuestions";

const QuestionDisplay = () => {
	const [randomQ, setRandomQ] = useState('Click to get Question')

	const getQuestion = async () => {
		const newQuestions = await API.graphql(graphqlOperation(QueryAllQuestions));
		const questions = newQuestions.data.listQuestions.items
		setRandomQ(questions[Math.floor(Math.random() * questions.length)].question)
	}

	return ( 
		<section className="question-display">
			<p className="question-display--question">{randomQ}</p>
			<button className="question-display--button" onClick={getQuestion}>
				Get
			</button>
		</section>
	 );
}

export default QuestionDisplay;
