import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
import CommonLayoutComponent from "./CommonLayoutComponent";

const useStyles = () => ({
    typoGraphy: {
        display: 'flex',
        justifyContent: 'center'
    }
});

class HomeComponent extends Component {

    render() {

        const classes = useStyles();

        return (
            <>
                {/*<pre>{this.props.match.path}</pre>*/}
                <Route exact path={this.props.match.path} component={CommonLayoutComponent}/>
                <ul>
                    <li>1</li>
                    <li>2</li>
                </ul>
                <Typography style={classes.typoGraphy}>home component(container)</Typography>
            </>
        );
    }
}

export default withStyles(useStyles)(HomeComponent);
