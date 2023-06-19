import React from 'react';
import { TableCell, Table, TableHead, TableBody, TableRow, TableContainer, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { ethers } from 'ethers';
import { trim } from '../../helpers/trim';


const useStyle = makeStyles((theme) => ({
    table: {
        '& .MuiTableCell-root': {
            color: '#666',
            borderBottom: `1px solid ${theme.palette.common.mainLight}`,
            fontSize: '12px',
            whiteSpace: 'nowrap',
            textAlign: 'center'
        },
        '& .MuiButton-root': {
            padding: '2px',
            color: theme.palette.common.main,
            backgroundColor: theme.palette.common.mainLight
        }
    }
}))

const UnderwritingTable = ({ protocols }) => {

    const classes = useStyle();
    const underwritings = useSelector(state => state.account.chainData.underwritings);

    return (
        <React.Fragment>
            <TableContainer>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>TX_HASH</TableCell>
                            <TableCell>PORJECT</TableCell>
                            <TableCell>STAKE AMOUNT</TableCell>
                            <TableCell>STAKED AT</TableCell>
                            <TableCell>ACTION</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            underwritings?.map((item, key) => (
                                <TableRow key={key}>
                                    <TableCell>{key + 1}</TableCell>
                                    <TableCell>TX_HASH</TableCell>
                                    <TableCell>
                                        {(() => {
                                            let productDetail = (protocols.filter(protocol => protocol.product_id === Number(item.productId)))[0];
                                            return productDetail.name;
                                        })()}
                                    </TableCell>
                                    <TableCell>{trim(item.amount, 2)} FAKTR</TableCell>
                                    <TableCell>4/10/2022</TableCell>
                                    <TableCell><Button>Withdraw</Button></TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}

export default UnderwritingTable;