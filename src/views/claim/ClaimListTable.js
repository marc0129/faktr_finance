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

const ClaimListTable = () => {

    const classes = useStyle();

    return (
        <React.Fragment>
            <TableContainer>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>PORJECT</TableCell>
                            <TableCell>COVER AMOUNT</TableCell>
                            <TableCell>COVER PERIOD</TableCell>
                            <TableCell>STATUS</TableCell>
                            <TableCell>ACTION</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}

export default ClaimListTable;