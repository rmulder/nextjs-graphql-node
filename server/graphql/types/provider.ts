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
	type Provider {
		_id: ID,
		${providerFields}
	}
	
	input ProviderInput {
		${providerFields}
	}
`;

export default providerType;
