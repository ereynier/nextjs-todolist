import { gql } from "@apollo/client";

export const CREATE_TODO = gql`
mutation Mutation($text: String!) {
    createTodoItem(text: $text) {
        id
        createdAt
        updatedAt
        text
        completed
    }
}
`;

export const UPDATE_TODO = gql`
mutation Mutation($id: ID!, $text: String!, $completed: Boolean!) {
    updateTodoItem(id: $id, text: $text, completed: $completed) {
        id
        createdAt
        updatedAt
        text
        completed
    }
}
`;

export const DELETE_TODO = gql`
mutation Mutation($id: ID!) {
    deleteTodoItem(id: $id) {
        id
        createdAt
        updatedAt
        text
        completed
    }
}
`;