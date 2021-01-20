import providerType from './portfolio';

const rootQuery = `
	type Query { 
	 	provider(id: ID): Portfolio,
		providers: [Portfolio],
	}
`;

const rootMutation = `
	type Mutation { 
		createProvider(input: PortfolioInput): Portfolio,
		updateProvider(id: ID, input: PortfolioInput): Portfolio,
		deleteProvider(id: ID): ID,
	}
`;

const type = `
	${rootQuery}
	${rootMutation}
	${providerType}
`;

export default type;
