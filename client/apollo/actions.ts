import {useMutation, useQuery} from '@apollo/client';
import { CREATE_PROVIDER, DELETE_PROVIDER, GET_PROVIDERS, UPDATE_PROVIDER} from './queries';

const onProviderCreated = (cache, {data: {createProvider}}) => {
	const {portfolios: cachedPortfolios} = cache.readQuery({query: GET_PROVIDERS});
	const portfolios = [...cachedPortfolios, createProvider];

	cache.writeQuery({
		query: GET_PROVIDERS,
		data: {portfolios},
	});
}

const onProviderDeleted = (cache, {data: {deleteProvider}}) => {
	const {portfolios: cachedPortfolios} = cache.readQuery({query: GET_PROVIDERS})
	const portfolios = cachedPortfolios.filter(p => p._id !== deleteProvider);

	cache.writeQuery({
		query: GET_PROVIDERS,
		data: { portfolios }
	});
}

export const useGetProviders = () => useQuery(
	GET_PROVIDERS,
	{
		// Setting this value to true will make the component rerender when
		// the "networkStatus" changes, so we are able to know if it is fetching
		// more data
		notifyOnNetworkStatusChange: true,
	}
);

export const useCreateProvider = () => useMutation(CREATE_PROVIDER, { update: onProviderCreated});

// todo: warning Cache data may be lost when replacing the portfolios field of a Query object
export const useDeleteProvider = () => useMutation(DELETE_PROVIDER, {update: onProviderDeleted});

export const useUpdateProvider = () => useMutation(UPDATE_PROVIDER);
