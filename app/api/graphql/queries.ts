import { gql } from "@apollo/client";

export const GET_TODOS = gql`
query Query {
  todos {
    id
    text
    completed
    createdAt
    updatedAt
  }
}
`;