import React from 'react';
import { Button, useMediaQuery, useTheme } from "@material-ui/core";
import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles((theme) => ({
    button: {
        color: theme.palette.common.main,
        backgroundColor: theme.palette.common.mainLight,
        boxShadow: 0,
        '&:hover': {
            backgroundColor: theme.palette.common.mainLight
        }
    }
}));

export function InPageConnectButton() {

    const theme = useTheme();
    const classes = useStyle();
    const upXs = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <RainbowConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                mounted
            }) => {
                return (
                    <div
                        {...(!mounted && {
                            'aria-hidden': true,
                            'style': {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none'
                            }
                        })}
                    >
                        {(() => {
                            if (!mounted || !account || !chain) {
                                return (
                                    <Button className={classes.button} onClick={openConnectModal} variant='contained'>
                                        Connect Wallet
                                    </Button>
                                );
                            }

                            if (chain.unsupported) {
                                return (
                                    <Button className={classes.button} onClick={openChainModal} variant="contained">
                                        Wrong network
                                    </Button>
                                );
                            }

                            return (
                                <div style={{ display: 'flex', gap: 12 }}>
                                    <Button
                                        onClick={openChainModal}
                                        style={{ display: 'flex', alignItems: 'center' }}
                                        className={classes.button}
                                        variant='contained'
                                    >
                                        {/* {chain.hasIcon && (
                                            <div
                                                style={{
                                                    background: chain.iconBackground,
                                                    width: 12,
                                                    height: 12,
                                                    borderRadius: 999,
                                                    overflow: 'hidden',
                                                    marginRight: 4,
                                                }}
                                            >
                                                {chain.iconUrl && (
                                                    <img
                                                        alt={chain.name ?? 'Chain icon'}
                                                        src={chain.iconUrl}
                                                        style={{ width: 16, height: 16 }}
                                                    />
                                                )}
                                            </div>
                                        )} */}
                                        {chain.name}
                                    </Button>

                                    <Button onClick={openAccountModal} className={classes.button} variant='contained'>
                                        {account.displayName}
                                        {account.displayBalance && upXs
                                            ? ` (${account.displayBalance})`
                                            : ''}
                                    </Button>
                                </div>
                            );
                        })()}
                    </div>
                );
            }}
        </RainbowConnectButton.Custom>
    )
}

