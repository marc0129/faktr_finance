import React from 'react';
import { TableCell, Table, TableHead, TableBody, TableRow, TableContainer } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
// import { ethers } from 'ethers';
import { timestampToDate } from '../../helpers/formatTimeStamp';


const useStyle = makeStyles((theme) => ({
    table: {
        '& .MuiTableCell-root': {
            color: '#666',
            borderBottom: `1px solid ${theme.palette.common.mainLight}`,
            fontSize: '12px',
            whiteSpace: 'nowrap',
            textAlign: 'center'
        }
    }
}))

const CoverTable = ({ protocols }) => {

    const classes = useStyle();

    const coverList = useSelector(state => state.account.chainData.covers);

    return (
        <React.Fragment>
            <TableContainer>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>TX_HASH</TableCell>
                            <TableCell>PORJECT</TableCell>
                            <TableCell>COVER AMOUNT</TableCell>
                            <TableCell>TOKEN TYPE</TableCell>
                            <TableCell>START DATE</TableCell>
                            <TableCell>PERIOD</TableCell>
                            <TableCell>STATUS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {coverList?.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>TX_HASH</TableCell>
                                <TableCell>
                                    {(() => {
                                        let productDetail = (protocols.filter(protocol => protocol.product_id === Number(item.productId)))[0];
                                        return productDetail.name
                                    })()}
                                </TableCell>
                                <TableCell>{Number(item.amount)}</TableCell>
                                <TableCell>MATIC</TableCell>
                                <TableCell>{timestampToDate(Number(item.createAt))}</TableCell>
                                <TableCell>{Number(item.period)}</TableCell>
                                <TableCell>ACTIVE</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment >
    )
}

export default CoverTable;