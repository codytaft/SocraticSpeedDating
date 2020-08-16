import gql from "graphql-tag";

export default gql(`
query listQuestions {
  listQuestions (limit: 64) {
    items {
      id
      question
    }
  }
}`);
