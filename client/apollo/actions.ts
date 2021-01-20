import {useMutation, useQuery} from '@apollo/client';
import {CREATE_PROVIDER, DELETE_PORTFOLIO, GET_PROVIDERS, UPDATE_PROVIDER} from './queries';

const onPortfolioCreated = (cache, {data: {createProvider}}) => {
	const {portfolios: cachedPortfolios} = cache.readQuery({query: GET_PROVIDERS});
	const portfolios = [...cachedPortfolios, createProvider];

	cache.writeQuery({
		query: GET_PROVIDERS,
		data: {portfolios},
	});
}

const onPortfolioDeleted = (cache, {data: {deletePortfolio}}) => {
	const {portfolios: cachedPortfolios} = cache.readQuery({query: GET_PROVIDERS})
	const portfolios = cachedPortfolios.filter(p => p._id !== deletePortfolio);

	cache.writeQuery({
		query: GET_PROVIDERS,
		data: { portfolios }
	});
}

export const useGetPortfolios = () => useQuery(
	GET_PROVIDERS,
	{
		// Setting this value to true will make the component rerender when
		// the "networkStatus" changes, so we are able to know if it is fetching
		// more data
		notifyOnNetworkStatusChange: true,
	}
);

export const useCreatePortfolio = () => useMutation(CREATE_PROVIDER, {update: onPortfolioCreated});

// todo: warning Cache data may be lost when replacing the portfolios field of a Query object
export const useDeletePortfolio = () => useMutation(DELETE_PORTFOLIO, {update: onPortfolioDeleted});

export const useUpdatePortfolio = () => useMutation(UPDATE_PROVIDER);
