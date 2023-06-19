import React from 'react';
import { TableCell, Table, TableHead, TableBody, TableRow, TableContainer } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';



const useStyle = makeStyles((theme) => ({
    table: {
        '& .MuiTableCell-root': {
            color: '#666',
            borderBottom: `1px solid ${theme.palette.common.mainLight}`,
            fontSize: '12px',
            whiteSpace: 'nowrap'
        }
    }
}))

const ClaimTable = () => {

    const classes = useStyle();

    return (
        <React.Fragment>
            <TableContainer>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Transaction Hash</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Claim Amount</TableCell>
                            <TableCell>Total Rewards To Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}

export default ClaimTable;