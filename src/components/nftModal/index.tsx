import Image from 'next/image';
import { useEffect, useRef } from 'react';

export function NftModal({ nftData, viewMetaData }) {
    const modal = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        if (modal.current) {
            !modal.current.open && modal.current.showModal();
        }
    }, [nftData])
    return (
        <dialog ref={modal} className='flex flex-col rounded-lg bg-white w-[560px] max-h-[80vh] px-8 py-6 gap-6'>
            <div className='flex justify-between items-center'>
                <h2 className='font-bold text-2xl truncate mb-5'>{nftData.metadata?.name || `NFT #${nftData.tokenId}`}</h2>
                <button className='button button--secondary button--fab' onClick={() => viewMetaData(null)}>
                    <Image src='/close.svg' alt='close_icon' width={12} height={12}></Image>
                </button>
            </div>
            <div>
                <Image className='rounded-lg' src={nftData.metadata?.image.replace('ipfs://', 'https://ipfs.io/ipfs/') || '/nft-image-not-found.png'} alt='NFT image' height={496} width={496}></Image>
                <div className='p-5 flex flex-wrap gap-2'>
                    {nftData.metadata?.attributes ?
                        nftData.metadata.attributes.map((attribute, index) => (
                            <div className='border border-[#D0D5DD] rounded-lg py-3 text-center basis-1/4 grow shrink' key={index}>
                                <p className='text-[#101828]'>{attribute.trait_type}</p>
                                <p className='font-semibold text-[#6941C6]'>{attribute.value ? attribute.value : 'N/A'}</p>
                            </div>
                        ))
                        : (<span className='font-semibold'>This NFT does not have any attributes :/</span>)
                    }
                </div>
            </div>
        </dialog>
    );
}