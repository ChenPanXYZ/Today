import React, { useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from '@material-ui/core/styles';

import ReplyIcon from '@material-ui/icons/Reply';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
  content: {
    witdh: '30%',
    wordBreak: "break-all",
    color: 'white',
    borderTop: "0.7px solid rgba(52, 52, 52, 0.5)",
    borderBottom: "none",
    paddingLeft: "5px",
    paddingRight: "5px"
  },
  date: {
    width: '18%',
    wordBreak: "break-all",
    color: 'white',
    borderTop: "0.7px solid rgba(52, 52, 52, 0.5)",
    borderBottom: "none",
    paddingLeft: "5px",
    paddingRight: "5px"
  },
  subject: {
    width: '20%',
    wordBreak: "break-all",
    color: 'white',
    borderTop: "0.7px solid rgba(52, 52, 52, 0.5)",
    borderBottom: "none",
    paddingRight: "5px"
  },
  sender: {
    width: '20%',
    wordBreak: "break-all",
    color: 'white',
    borderTop: "0.7px solid rgba(52, 52, 52, 0.5)",
    borderBottom: "none",
    paddingLeft: "5px",
    paddingRight: "5px"
  },
  icons: {
    width: '10%',
    wordBreak: "break-all",
    color: 'white',
    borderTop: "0.7px solid rgba(52, 52, 52, 0.5)",
    borderBottom: "none",
    paddingRight: "5px"
  },
  icon: {
    color: 'white'
  }

}));
const log = console.log

const dateFormat = dateStr => {
  const date = new Date(dateStr)
  const today = new Date()
  log(date)
  if (date.getDate() === today.getDate()) {
    log(date.toLocaleTimeString())
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  else {
    log(date.toLocaleDateString())
    return date.toLocaleDateString()
  }
}

export default function Message({ setTo, message, index, deleteMessage }) {
  const classes = useStyles();
  return (
    <TableRow className={classes.message} key={message.content}>
      <TableCell className={classes.subject} component="th" scope="row">
        {message.subject}
      </TableCell>
      <TableCell className={classes.content} component="th" scope="row">
        {message.content}
      </TableCell>
      <TableCell className={classes.sender} component="th" scope="row">
        {message.sender}
      </TableCell>
      <TableCell className={classes.date} component="th" scope="row">
        {dateFormat(message.date)}
      </TableCell>
      <TableCell className={classes.icons}>
        <IconButton className={classes.icon}>
          <ReplyIcon fontSize="small" onClick={()=>setTo(message.sender)}/>
        </IconButton>
        <IconButton className={classes.icon}>
          <DeleteIcon fontSize="small" onClick={() => deleteMessage(index)}/>
        </IconButton>
      </TableCell>
    </TableRow>
  )

}