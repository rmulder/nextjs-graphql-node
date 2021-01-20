import providerType from './provider';

const rootQuery = `
	type Query { 
	 	provider(id: ID): Provider,
		providers: [Provider],
	}
`;

const rootMutation = `
	type Mutation { 
		createProvider(input: PortfolioInput): Provider,
		updateProvider(id: ID, input: PortfolioInput): Provider,
		deleteProvider(id: ID): ID,
	}
`;

const type = `
	${rootQuery}
	${rootMutation}
	${providerType}
`;

export default type;
