import fakeData from '../../../db/fakeData';

const portfolioQueries = {
	portfolio: (root, { id }) => fakeData.providers.find(p => p._id === id),
	portfolios: () => fakeData.providers,
};

const portfolioMutations = {
	createPortfolio: (root, {input}) => {
		const portfolio = {
			...input,
			_id: Math.floor(Math.random() * 16777215).toString(16)
		}

		fakeData.providers.push(portfolio);
		return portfolio;
	},
	updatePortfolio: (root, {id, input}) => {
		const idx = fakeData.providers.findIndex(p => p._id === id);
		const portfolioToUpdate = fakeData.providers[idx];
		const portfolio = {
			...portfolioToUpdate,
			...input,
		}

		fakeData.providers[idx] = portfolio;
		return portfolio;
	},
	deletePortfolio: (root, {id}) => {
		const idx = fakeData.providers.findIndex(p => p._id === id);
		fakeData.providers.splice(idx, 1);

		return id;
	}
}

export {portfolioQueries, portfolioMutations};
