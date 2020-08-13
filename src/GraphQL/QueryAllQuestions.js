import gql from "graphql-tag";

export default gql(`
query listQuestions {
  listQuestions {
    items {
      id
      question
    }
  }
}`);
