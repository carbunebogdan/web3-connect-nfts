import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../../components/header';
import { getSession, signOut } from 'next-auth/react';
import { useEvmWalletNFTs } from '@moralisweb3/next';
import { NftCard } from '@/components/nftCard';
import { useState } from 'react';
import { NftModal } from '@/components/nftModal';
import { User } from 'next-auth';
import { NFTDATA } from '@/types/nftData.type';

// gets a prop from getServerSideProps
const Collection: NextPage<{ user: User }> = ({ user }: { user: User }) => {
    const [modal, setModal] = useState<NFTDATA | null>(null);
    const { data: NFTList } = useEvmWalletNFTs({ address: "0xAf8d40f5d5Ec8054d8dEf099493F1Dc574EA680D" }); // we use the hardcoded address, in a normal scenario we would've use the user object here

    const viewMetaData = (nftData: NFTDATA) => {
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
                    {/* Not sure if I was supposed to fetch the name but I couldn't find a way */}
                    <h5 className='mb-1'>Mark McKenzie</h5>
                    <h1>MegaKongs Collection</h1>
                </div>
                <div className='flex flex-wrap items-center justify-center gap-5'>
                    {NFTList?.map((nftData) => (
                        <NftCard nftData={nftData as NFTDATA} key={nftData.tokenHash} viewMetaData={viewMetaData}></NftCard>
                    ))}
                </div>
                <button onClick={() => signOut({ redirect: true })}>Sign out</button>
            </div>
            {modal && <NftModal nftData={modal} viewMetaData={viewMetaData} />}
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