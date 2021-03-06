import fakeData from '../../../db/fakeData';

const providerQueries = {
	provider: (root, { id }) => fakeData.providers.find(p => p._id === id),
	providers: () => fakeData.providers,
};

const providerMutations = {
	createProvider: (root, {input}) => {
		const provider = {
			...input,
			_id: Math.floor(Math.random() * 16777215).toString(16)
		}

		fakeData.providers.push(provider);
		return provider;
	},
	updateProvider: (root, {id, input}) => {
		const idx = fakeData.providers.findIndex(p => p._id === id);
		const providerToUpdate = fakeData.providers[idx];
		const provider = {
			...providerToUpdate,
			...input,
		}

		fakeData.providers[idx] = provider;
		return provider;
	},
	deleteProvider: (root, {id}) => {
		const idx = fakeData.providers.findIndex(p => p._id === id);
		fakeData.providers.splice(idx, 1);

		return id;
	}
}

export { providerQueries, providerMutations};
