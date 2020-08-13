import React, { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';

import QueryAllQuestions from "../GraphQL/QueryAllQuestions";

const QuestionDisplay = () => {
	const [randomQ, setRandomQ] = useState('')

	const getQuestion = async () => {
		const newQuestions = await API.graphql(graphqlOperation(QueryAllQuestions));
		const questions = newQuestions.data.listQuestions.items
		setRandomQ(questions[Math.floor(Math.random() * questions.length)].question)
	}

	return ( 
		<div>
			<p>Question Display: {randomQ}</p>
			<button onClick={getQuestion}>
				Get Question
			</button>
		</div>
	 );
}

export default QuestionDisplay;
