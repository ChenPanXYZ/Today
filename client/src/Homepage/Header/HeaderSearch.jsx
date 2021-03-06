import React, { useState } from "react";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import {toggleDrawer} from '../../actions/drawers'
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles(theme => ({
  root: {
    // padding: '2px 4px',
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));


export default function HeaderSearch(props) {
  const classes = useStyles();
  const [searchKey, setSearchKey] = useState('');
  const state = props.state;
  const setState = props.setState;

  const searchButtonClickHandler = (e) => {
    e.preventDefault();
    const searchUrl = "https://www.google.com/search?q=" + searchKey
    window.open(searchUrl)
  }

  const searchTextChangeHandler = (e) => {
    setSearchKey(e.target.value)
  }



  return (
  <div className="headerSearch">
    <Paper component="form" className={classes.root}>
      <TextField
      className={classes.input}
      placeholder="Search Google"
      inputProps={{ 'aria-label': 'search google' }}
      onChange={searchTextChangeHandler}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={searchButtonClickHandler}>
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton 
      className={classes.iconButton} 
      aria-label="menu"
      onClick={()=>toggleDrawer('right', state, setState, true)}
      >
        <SettingsIcon />
      </IconButton>
    </Paper>
  </div>
  );
}