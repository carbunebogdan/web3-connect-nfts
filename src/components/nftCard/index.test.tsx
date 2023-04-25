import { render, screen } from '@testing-library/react';
import { NftCard } from './index';
import '@testing-library/jest-dom';

const mockViewMetaData = jest.fn();

describe('NftCard', () => {
  const nftData = {
    metadata: {
      name: 'Test NFT',
      image: 'ipfs://QmN1GT3qAayF5ABKPdp5H5G5qqRg5Pp6A35ZKjPmc6FzaU',
    },
    tokenId: 1,
  };
  
  test('renders the NFT image', () => {
    render(<NftCard nftData={nftData} viewMetaData={mockViewMetaData} />);
    const nftImage = screen.getByAltText('NFT image');
    expect(nftImage).toBeInTheDocument();
    expect(nftImage.getAttribute('src')).toContain(encodeURIComponent('https://ipfs.io/ipfs/QmN1GT3qAayF5ABKPdp5H5G5qqRg5Pp6A35ZKjPmc6FzaU'));
  });

  test('renders the NFT name', () => {
    render(<NftCard nftData={nftData} viewMetaData={mockViewMetaData} />);
    expect(screen.getByText('Test NFT')).toBeInTheDocument();
  });

  test('renders the default NFT name when metadata is not available', () => {
    const nftDataWithoutMetadata = { tokenId: 2 };
    render(<NftCard nftData={nftDataWithoutMetadata} viewMetaData={mockViewMetaData} />);
    expect(screen.getByText('NFT #2')).toBeInTheDocument();
  });

  test('calls viewMetaData function when "View Metadata" button is clicked', () => {
    render(<NftCard nftData={nftData} viewMetaData={mockViewMetaData} />);
    const viewMetadataButton = screen.getByText('View Metadata');
    viewMetadataButton.click();
    expect(mockViewMetaData).toHaveBeenCalledWith(nftData);
  });
});
