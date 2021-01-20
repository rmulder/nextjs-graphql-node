import providerType from './provider';

const rootQuery = `
	type Query { 
	 	provider(id: ID): Provider,
		providers: [Provider],
	}
`;

const rootMutation = `
	type Mutation { 
		createProvider(input: ProviderInput): Provider,
		updateProvider(id: ID, input: ProviderInput): Provider,
		deleteProvider(id: ID): ID,
	}
`;

const type = `
	${rootQuery}
	${rootMutation}
	${providerType}
`;

export default type;
