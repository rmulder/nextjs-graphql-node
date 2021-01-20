import portfolioType from './portfolio';

const rootQuery = `
	type Query { 
	 	portfolio(id: ID): Portfolio,
		portfolios: [Portfolio],
	}
`;

const rootMutation = `
	type Mutation { 
		createProvider(input: PortfolioInput): Portfolio,
		updateProvider(id: ID, input: PortfolioInput): Portfolio,
		deletePortfolio(id: ID): ID,
	}
`;

const type = `
	${rootQuery}
	${rootMutation}
	${portfolioType}
`;

export default type;
