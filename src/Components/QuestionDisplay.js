import React, { useState } from 'react';
import { graphql } from "react-apollo";
import { API, graphqlOperation } from 'aws-amplify';

import QueryAllQuestions from "../GraphQL/QueryAllQuestions";

const QuestionDisplay = ({data}) => {
	const [questions, setQuestions] = useState(data.listQuestions.items)
	const [randomQ, setRandomQ] = useState(questions[Math.floor(Math.random() * questions.length)].question)

	const getQuestion = async () => {
		setRandomQ(questions[Math.floor(Math.random() * questions.length)].question)
		const newQuestions = await API.graphql(graphqlOperation(QueryAllQuestions));
		setQuestions(newQuestions.data.listQuestions.items)
	}

	return ( 
		<div>
			<p>Question: {randomQ}</p>
			<button onClick={getQuestion}>
				Get Question
			</button>
		</div>
	 );
}


const QuestionDisplayWithData = graphql(
		QueryAllQuestions,
		{
			options: {
				fetchPolicy: 'cache-and-network',
			},
		}
)(QuestionDisplay);

export default QuestionDisplayWithData;
