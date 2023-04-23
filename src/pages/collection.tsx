import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/header';
import { getSession, signOut } from 'next-auth/react';
import { useEvmWalletNFTs } from '@moralisweb3/next';
import { NftCard } from '@/components/nft-card/nftCard';
import { useState } from 'react';
import { NftModal } from '@/components/nft-modal/nftModal';

// gets a prop from getServerSideProps
const Collection: NextPage = ({ user }) => {
    const [modal, setModal] = useState(null);
    const { data: NFTList } = useEvmWalletNFTs({ address: "0xAf8d40f5d5Ec8054d8dEf099493F1Dc574EA680D" });

    const viewMetaData = (nftData) => {
        setModal(nftData);
    }

    return (
        <div>
            <Head>
                <title>Collection</title>
            </Head>
            <Header />
            <div className='flex flex-col py-10 gap-20 bg-[#EDEFF3]'>
                <div className='flex flex-col items-center'>
                    <h5 className='mb-1'>Mark McKenzie</h5>
                    <h1>MegaKongs Collection</h1>
                </div>
                <div className='flex flex-wrap items-center justify-center gap-5'>
                    {NFTList?.map((NFT) => (
                        <NftCard nftData={NFT} key={NFT.tokenHash} viewMetaData={viewMetaData}></NftCard>
                    ))}
                </div>
                <button onClick={() => signOut({ redirect: '/' })}>Sign out</button>
            </div>
            <NftModal nftData={modal} viewMetaData={viewMetaData}/>
        </div>
    );
}

export async function getServerSideProps(context: any) {
    const session = await getSession(context);

    // redirect if not authenticated
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: { user: session.user },
    };
}

export default Collection;