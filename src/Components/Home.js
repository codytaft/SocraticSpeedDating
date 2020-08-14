import React from 'react';

import QuestionInput from './QuestionInput'
import QuestionDisplay from './QuestionDisplay'
import '../Styles/Home.scss'

export const Home = () => ( 
		<div className="home">
			<QuestionInput />
			<QuestionDisplay />
		</div>
	 );
