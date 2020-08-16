import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { API, graphqlOperation } from 'aws-amplify';
import '../Styles/QuestionDisplay.scss'

import QueryAllQuestions from "../GraphQL/QueryAllQuestions";

const QuestionDisplay = () => {
	const [randomQ, setRandomQ] = useState('Click to get Question')

	const getQuestion = async () => {
		const newQuestions = await API.graphql(graphqlOperation(QueryAllQuestions));
		const questions = newQuestions.data.listQuestions.items.filter(q => q.question.length)
		setRandomQ(questions[Math.floor(Math.random() * questions.length)].question)
	}

	return ( 
		<section className="question-display">
			<p className="question-display--question">{randomQ}</p>
			<section className="question-display--buttons">
				<Link className="question-display--buttons__link" to="/questions">
						<button className="question-display--buttons__get-all">All</button>
				</Link>
				<div>
					<button className="question-display--buttons__get" onClick={getQuestion}>
						One
					</button>
				</div>
			</section>
		</section>
	 );
}

export default QuestionDisplay;
