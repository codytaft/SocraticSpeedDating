import gql from "graphql-tag";


export default gql(`
  subscription {
    onCreateQuestion {
      id
      question
    }
  } 
`)
