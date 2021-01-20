import {ApolloServer, gql} from 'apollo-server-express';
import type from './types';
import { providerMutations, providerQueries} from './resolvers';

const typeDefs = gql`${type}`;

const resolvers = {
	Query: {
		...providerQueries
	},
	Mutation: {
		...providerMutations
	},
};

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
})

export default apolloServer;
