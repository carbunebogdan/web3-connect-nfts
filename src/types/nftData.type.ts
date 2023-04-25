import { EvmNft, EvmNftData } from "moralis/common-evm-utils"

export type NFTDATA = Omit<EvmNftData, 'metadata'> & {
    metadata?: {
        name: string,
        image: string,
        attributes: {
            trait_type: string,
            value: string,
        }[]
    }
}