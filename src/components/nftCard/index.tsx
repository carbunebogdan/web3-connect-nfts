import Image from 'next/image';

export function NftCard({ nftData, viewMetaData }) {
    return (
        <article className='flex flex-col rounded-lg bg-white overflow-hidden max-w-[280px] relative'>
            <Image priority src={nftData.metadata?.image.replace('ipfs://', 'https://ipfs.io/ipfs/') || '/nft-image-not-found.png'} alt='NFT image' height={280} width={280}></Image>
            <div className='p-5 overflow-hidden'>
                <h2 className='font-semibold text-xl truncate mb-5'>{nftData.metadata?.name || `NFT #${nftData.tokenId}`}</h2>
                <button className='button button--secondary' type='button' onClick={()=>viewMetaData(nftData)}>
                    <span>View Metadata</span>
                    <Image src='/plus.svg' alt='plus_icon' width={16} height={16}></Image>
                </button>
            </div>
        </article>
    );
}