export const typeDefs = `#graphql
    type TodoItem {
        id: ID!
        text: String!
        completed: Boolean!
        createdAt: String!
        updatedAt: String!
    }

    type Query {
        todo(id: ID!): TodoItem
        todos: [TodoItem]
    }

    type Mutation {
        createTodoItem(text: String!): TodoItem
        updateTodoItem(id: ID!, text: String, completed: Boolean): TodoItem
        deleteTodoItem(id: ID!): TodoItem
    }
`;