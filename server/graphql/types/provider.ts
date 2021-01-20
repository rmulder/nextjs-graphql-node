const providerFields = `
	title: String,
	company: String,
	companyWebsite: String,
	location: String,
	jobTitle: String,
	description: String,
	startDate: String,
	endDate: String,
`;

const providerType = `
	type Portfolio {
		_id: ID,
		${providerFields}
	}
	
	input PortfolioInput {
		${providerFields}
	}
`;

export default providerType;
