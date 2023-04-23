import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
export const CustomConnectButton = (props: any) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button className='button' onClick={openConnectModal} type='button'>
                    Connect Wallet
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button className='button bg-red-500' onClick={openChainModal} type='button'>
                    Wrong network
                  </button>
                );
              }
              return (
                <div className='flex flex-col gap-4 items-center'>
                  <div className='flex gap-4'>
                    <button className='button flex items-center'
                      onClick={openChainModal}
                      type='button'
                    >
                      {chain.hasIcon && (
                        <div
                          className='rounded-full h-[24px]'
                          style={{
                            background: chain.iconBackground,
                          }}
                        >
                          {chain.iconUrl && (
                            <Image
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              height={24}
                              width={24}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </button>
                    <button onClick={openAccountModal} type='button'>
                      {account.displayName}
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ''}
                    </button>
                  </div>
                  <button className='button button--secondary' onClick={props.handleDisplayCollection}>Display collection</button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};