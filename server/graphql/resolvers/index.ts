import fakeData from '../../../db/fakeData';

const providerQueries = {
	portfolio: (root, { id }) => fakeData.providers.find(p => p._id === id),
	portfolios: () => fakeData.providers,
};

const providerMutations = {
	createPortfolio: (root, {input}) => {
		const provider = {
			...input,
			_id: Math.floor(Math.random() * 16777215).toString(16)
		}

		fakeData.providers.push(provider);
		return provider;
	},
	updatePortfolio: (root, {id, input}) => {
		const idx = fakeData.providers.findIndex(p => p._id === id);
		const portfolioToUpdate = fakeData.providers[idx];
		const provider = {
			...portfolioToUpdate,
			...input,
		}

		fakeData.providers[idx] = provider;
		return provider;
	},
	deletePortfolio: (root, {id}) => {
		const idx = fakeData.providers.findIndex(p => p._id === id);
		fakeData.providers.splice(idx, 1);

		return id;
	}
}

export { providerQueries, providerMutations};
