import {useMutation, useQuery} from '@apollo/client';
import { CREATE_PROVIDER, DELETE_PROVIDER, GET_PROVIDERS, UPDATE_PROVIDER} from './queries';

const onProviderCreated = (cache, {data: {createProvider}}) => {
	const {providers: cachedProviders} = cache.readQuery({query: GET_PROVIDERS});
	const providers = [...cachedProviders, createProvider];

	cache.writeQuery({
		query: GET_PROVIDERS,
		data: {providers},
	});
}

const onProviderDeleted = (cache, {data: {deleteProvider}}) => {
	const {providers: cachedProviders} = cache.readQuery({query: GET_PROVIDERS})
	const providers = cachedProviders.filter(p => p._id !== deleteProvider);

	cache.writeQuery({
		query: GET_PROVIDERS,
		data: { providers }
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

// todo: warning Cache data may be lost when replacing the providers field of a Query object
export const useDeleteProvider = () => useMutation(DELETE_PROVIDER, {update: onProviderDeleted});

export const useUpdateProvider = () => useMutation(UPDATE_PROVIDER);
