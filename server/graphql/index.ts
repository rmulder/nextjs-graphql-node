import {ApolloServer, gql} from 'apollo-server-express';
import type from './types';
import { portfolioMutations, providerQueries} from './resolvers';

const typeDefs = gql`${type}`;

const resolvers = {
	Query: {
		...providerQueries
	},
	Mutation: {
		...portfolioMutations
	},
};

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
})

export default apolloServer;
