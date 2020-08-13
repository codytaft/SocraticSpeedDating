import gql from "graphql-tag";

export default gql(`
query($id: ID!) {
  getQuestion(id: $id) {
    id
    question
  }
}`);
