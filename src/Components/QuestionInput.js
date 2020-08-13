import React, { useState } from "react";
import { graphql } from "react-apollo";

import MutationCreateQuestions from "../GraphQL/MutationCreateQuestions";
import QueryAllQuestions from "../GraphQL/QueryAllQuestions";
import QueryGetQuestion from "../GraphQL/QueryGetQuestion";

const QuestionInput = (props) => {

	const [question, setQuestion] = useState('')

  const handleSave = async (e) => {
    e.preventDefault();
		const { createQuestion } = props;
		try {
			await createQuestion(question);
		}
		catch(e) {
			console.log(e)
		}
		setQuestion('')
  }

    return (
      <div >
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={question} onChange={e => setQuestion(e.target.value)} />
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
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