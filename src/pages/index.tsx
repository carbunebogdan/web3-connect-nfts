import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/header';
import { CustomConnectButton } from '../components/connectButton';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useAccount, useNetwork, useSignMessage } from 'wagmi';
import { useAuthRequestChallengeEvm } from '@moralisweb3/next';

const Connect: NextPage = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { signMessageAsync } = useSignMessage();
  const { push } = useRouter();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();

  const handleAuth = async () => {
    const { message } = await requestChallengeAsync({
      address: address,
      chainId: chain.id,
    });

    const signature = await signMessageAsync({ message });

    // redirect user after success authentication to '/collection' page
    const { url } = await signIn('moralis-auth', {
      message,
      signature,
      redirect: false,
      callbackUrl: '/collection',
    });
    /**
     * instead of using signIn(..., redirect: '/collection')
     * we get the url from callback and push it to the router to avoid page refreshing
     */
    push(url);
  };
  return (
    <div>
      <Head>
        <title>Connect</title>
      </Head>
      <Header />
      <main className='min-h-screen flex flex-col gap-10 items-center justify-center text-center'>
        <div className='flex flex-col gap-5'>
          <h1>Connect</h1>
          <span className='text-sm text-[#5C6067]'>Please connect your Ethereum wallet to view the collection.</span>
        </div>
        <CustomConnectButton handleDisplayCollection={handleAuth}/>
      </main>
    </div>
  );
};

export default Connect;
