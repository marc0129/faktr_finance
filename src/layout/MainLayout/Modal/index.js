import { Modal, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

const TransactionModal = () => {


    const txPending = useSelector(state => state.account.isPendingTx);

    return (
        <React.Fragment>
            <Modal open={txPending}>
                <Typography>
                    Waiting transaction to be confirmed.
                </Typography>
            </Modal>
        </React.Fragment>
    )
}

export default TransactionModal;