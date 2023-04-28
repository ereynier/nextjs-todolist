import { Context } from "./route";

export const resolvers = {
    Query: {
      todos: async(parent: any, args: any, context: Context) => {
          return await context.prisma.todoItem.findMany();
      },
      todo: async(parent: any, args: any, context: Context) => {
          return await context.prisma.todoItem.findUnique({
              where: {
                  id: parseInt(args.id, 10)
              }
          });
      }
    },
      Mutation: {
          createTodoItem: async(parent: any, args: any, context: Context) => {
              return await context.prisma.todoItem.create({
                  data: {
                      text: args.text,
                      completed: false
                  }
              });
          },
          updateTodoItem: async(parent: any, args: any, context: Context) => {
              return await context.prisma.todoItem.update({
                  where: {
                      id: parseInt(args.id, 10)
                  },
                  data: {
                      text: args.text,
                      completed: args.completed
                  }
              });
          },
          deleteTodoItem: async(parent: any, args: any, context: Context) => {
              return await context.prisma.todoItem.delete({
                  where: {
                      id: parseInt(args.id, 10)
                  }
              });
          },
      }
  };