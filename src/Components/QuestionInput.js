import React, { useState } from "react";
import { graphql } from "react-apollo";

import MutationCreateQuestions from "../GraphQL/MutationCreateQuestions";
import QueryAllQuestions from "../GraphQL/QueryAllQuestions";
import QueryGetQuestion from "../GraphQL/QueryGetQuestion";
import '../Styles/QuestionInput.scss'

const QuestionInput = (props) => {

	const [question, setQuestion] = useState('')

  const handleSave = async (e) => {
    e.preventDefault();
		const { createQuestion } = props;
		try {
			await question.length && createQuestion(question);
		}
		catch(e) {
			console.log(e)
		}
		setQuestion('')
  }

    return (
      <section className="question-section">
        <input className="question-section--input" placeholder="What's on your mind?"type="text" id="name" value={question} onChange={e => setQuestion(e.target.value)} />
        <button className="question-section--button" onClick={handleSave}>Give</button>
      </section>
    );
  }

export default graphql(
  MutationCreateQuestions,
  {
    props: (props) => ({
			update: (proxy, { data: { createQuestion } }) => {
				
				// Update QueryAllEvents
				const query = QueryAllQuestions;
				const data = proxy.readQuery({ query });

				data.listQuestions.items = [...data.listQuestions.items.filter(e => e.id !== createQuestion.id), createQuestion];

				proxy.writeQuery({ query, data });

				// Create cache entry for QueryGetEvent
				const query2 = QueryGetQuestion;
				const variables = { id: createQuestion.id };
				const data2 = { getQuestion: { ...createQuestion } };

				proxy.writeQuery({ query: query2, variables, data: data2 });
		},
      createQuestion: (question) => {
        return props.mutate({
          variables: {createquestioninput: {question}},
        })
      }
    })
  }
)(QuestionInput);
