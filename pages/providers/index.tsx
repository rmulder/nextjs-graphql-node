import Head from 'next/head'
import {Box, Button, Card, CardContent, Typography} from '@material-ui/core';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import ButtonError from '../../client/components/shared/ButtonError';
import {NetworkStatus} from '@apollo/client';
import {initializeApollo} from '../../client/lib/apollo';
import {
  useCreateProvider,
  useDeleteProvider,
  useGetProviders,
  useUpdateProvider,
} from "../../client/apollo/actions";
import {GET_PROVIDERS} from '../../client/apollo/queries';

export default function Providers() {
	const { data, networkStatus } = useGetProviders();
	const [createProvider] = useCreateProvider();
	const [deleteProvider] = useDeleteProvider();
	const [updateProvider] = useUpdateProvider();

	const providers = data && data.portfolios || [];

	useEffect(() => {
		console.log('networkStatus', networkStatus, NetworkStatus[networkStatus]);
	}, [networkStatus]);


	const handleCreateProvider = async () => {
		await createProvider();
	}

	const handleUpdateProvider = async (id: string) => {
		await updateProvider({variables: {id}});
	}

	const handleDeleteProvider = async (id: string) => {
    await deleteProvider({ variables: { id } });
  };

	return (
    <>
      <Head>
        <title>Providers</title>
      </Head>
      <section>
        <h2>Providers</h2>
        <Button
          variant='contained'
          color='primary'
          onClick={handleCreateProvider}
        >
          Create provider
        </Button>
        <Box display='flex' flexWrap='wrap'>
          {providers.map((provider) => (
            <Box key={provider._id} m={1}>
              <Card>
                <CardContent>
                  <Typography variant='h5' component='h2'>
                    {provider.title}
                  </Typography>
                  <Typography color='textSecondary' gutterBottom>
                    {provider.company}
                  </Typography>
                  <Link href={`/providers/${provider._id}`}>
                    <Button color='primary'>show</Button>
                  </Link>
                  <Button
                    color='primary'
                    onClick={() => handleUpdateProvider(provider._id)}
                  >
                    edit
                  </Button>
                  <ButtonError
                    onClick={() => handleDeleteProvider(provider._id)}
                  >
                    delete
                  </ButtonError>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </section>
    </>
  );
}

export async function getStaticProps() {
	const apolloClient = initializeApollo()

	await apolloClient.query({
		query: GET_PROVIDERS,
	})

	return {
		props: {
			initialApolloState: apolloClient.cache.extract(),
		},
		revalidate: 1,
	}
}
