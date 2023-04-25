import { render, fireEvent, screen } from '@testing-library/react';
import { NftModal } from './index';
import '@testing-library/jest-dom';

const mockViewMetaData = jest.fn();

const nftData = {
    name: 'Test NFT',
    metadata: {
        name: 'Test NFT',
        image: 'ipfs://QmN1GT3qAayF5ABKPdp5H5G5qqRg5Pp6A35ZKjPmc6FzaU',
        attributes: [
            {
                trait_type: 'Test Attribute',
                value: 'Test Value',
            },
        ],
    },
    tokenId: '123',
};

describe('NftModal', () => {
    beforeAll(() => {
        HTMLDialogElement.prototype.show = jest.fn();
        HTMLDialogElement.prototype.showModal = jest.fn();
        HTMLDialogElement.prototype.close = jest.fn();
    });
    it('renders the NFT name', () => {
        render(<NftModal nftData={nftData} viewMetaData={mockViewMetaData} />);
        expect(screen.getByText('Test NFT')).toBeInTheDocument();
    });

    it('renders the attributes', () => {
        render(<NftModal nftData={nftData} viewMetaData={mockViewMetaData} />);
        expect(screen.getByText('Test Attribute')).toBeInTheDocument();
        expect(screen.getByText('Test Value')).toBeInTheDocument();
    });

    it('calls viewMetaData when close button is clicked', () => {
        render(<NftModal nftData={nftData} viewMetaData={mockViewMetaData} />);
        const closeButton = screen.getByAltText('close_icon');
        fireEvent.click(closeButton);
        expect(mockViewMetaData).toHaveBeenCalledTimes(1);
    });
});
