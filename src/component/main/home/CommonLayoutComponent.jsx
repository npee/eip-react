import React, { Component } from 'react';
import ApiService from "../../../ApiService";

import Table from '@material-ui/core/Table';
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';

const useStyles = () => ({
    typoGraphy: {
        display: 'flex',
        justifyContent: 'center'
    }
});

class CommonLayoutComponent extends Component {
    render() {
        return (
            <>
                <pre>Common Layout Component(nested router test)</pre>
            </>
        );
    }
}

export default withStyles(useStyles)(CommonLayoutComponent);
