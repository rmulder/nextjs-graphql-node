import Head from 'next/head'
import {useQuery} from '@apollo/client';
import {GET_PROVIDER, GET_PROVIDERS} from '../../client/apollo/queries';
import {initializeApollo} from '../../client/lib/apollo';

export default function Provider({id}) {
	const {data} = useQuery(GET_PROVIDER, {variables: {id}});

	const provider = data && data.portfolio || {};

	return (
    <>
      <Head>
        <title>Providers | {provider.title}</title>
      </Head>
      <section>
        <h1>{provider.title}</h1>
        <div>{provider.company}</div>
        <div>{provider.companyWebsite}</div>
        <div>{provider.location}</div>
        <div>{provider.jobTitle}</div>
				<div>{provider.description}</div>
      </section>
    </>
  );
}

export async function getStaticProps({params: {id}}) {
	const apolloClient = initializeApollo()

	await apolloClient.query({
		query: GET_PROVIDER,
		variables: {id}
	})

	return {
		props: {
			initialApolloState: apolloClient.cache.extract(),
			id
		},
		revalidate: 1,
	}
}

export async function getStaticPaths() {
	const apolloClient = initializeApollo()

	const {data: {portfolios}} = await apolloClient.query({
		query: GET_PROVIDERS,
	})

	return {
		paths: portfolios.map(p => ({
			params: {id: p._id},
		})),
		fallback: false, // redirect to 404 when id not found
	};
}
