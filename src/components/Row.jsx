import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, Modal } from '@mui/material';

export default function Row(props) {
    const {key, name, star, coms} = props;
    const [open, setOpen] = React.useState(false);
	const [isModal, setModal] = React.useState(false);

	const toggleModal = () => {
		/* setModal(
		  isModal === true ? isModal = false : isModal = true
		); */
		setModal(!isModal)
	  }
	const handleClose = () => setModal(false);
  
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {name}
          </TableCell>
          <TableCell align="right">{star}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                    Comments 
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Comment</TableCell>
                      <TableCell align="right">Star</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {coms.map((commentRow) => (
                      <TableRow key={commentRow.date}>
                        <TableCell component="th" scope="row">
                          {commentRow.date}
                        </TableCell>
                        <TableCell>{commentRow.comment}</TableCell>
                        <TableCell align="right">{commentRow.star}</TableCell>
                      </TableRow>
                    ))}
                    <button>
                      Yorum Ekle
                    </button>
                    <button>
                      Yorum Sil
                    </button>
                   </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  ;