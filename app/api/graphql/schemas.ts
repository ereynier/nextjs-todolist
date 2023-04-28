export const typeDefs = `#graphql
    type TodoItem {
        id: ID!
        title: String!
        completed: Boolean!
        createdAt: String!
        updatedAt: String!
    }

    type Query {
        todo(id: ID!): TodoItem
        todos: [TodoItem]
    }

    type Mutation {
        createTodoItem(title: String!): TodoItem
        updateTodoItem(id: ID!, title: String, completed: Boolean): TodoItem
        deleteTodoItem(id: ID!): TodoItem
    }
`;