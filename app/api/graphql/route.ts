import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { PrismaClient } from '@prisma/client';
import { prisma } from '../../../prisma/db';
import { NextRequest } from 'next/server';
import { resolvers } from './resolvers';
import { typeDefs } from './schemas';


export type Context = {
    prisma: PrismaClient
} 

const apolloServer = new ApolloServer<Context>({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(apolloServer, {
    context: async(req, res) => ({req, res, prisma})
});

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}