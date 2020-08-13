import gql from "graphql-tag";

export default gql(`
mutation createQuestion($createquestioninput: CreateQuestionInput!) {
  createQuestion(input: $createquestioninput) {
    id
    question
  }
}`);
