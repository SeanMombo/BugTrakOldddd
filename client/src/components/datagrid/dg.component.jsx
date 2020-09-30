import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { useHistory } from "react-router-dom";

import { connect } from 'react-redux'
import { selectProject } from '../../redux/projects/projects.actions'

import { Switch } from 'react-router-dom'
import { MemoryRouter as Router } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    minWidth: 900,
    height:'100%',
  },
  wrapper: {
    
    height:'552px',

  }
});

function BasicTable({ collection, searchKey, updateSearchKey, selectProject }) {

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  let rows = collection;
  let history = useHistory();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const LinkBehavior = React.forwardRef((props, ref) => (
    <RouterLink ref={ref} to="/getting-started/installation/" {...props} />
  ));
  
  const handleClick = (event) => {
    console.log('clickecl')
    
    const proj = rows.find(row => 
      row.id === event.currentTarget.value
    )
    console.log(proj)
    selectProject(proj)
    history.push("/project");
  }

  function truncateString(str, num) {
    if (str.length <= num) {
      return str
    }
    return str.slice(0, num) + '...'
  }
  


  return (
    
    <Paper className={classes.wrapper}>
       
      <Divider/>
      <TableContainer >
      <TextField 
          type="text" 
          class="search form-control" 
          placeholder="What you looking for?" 
          value={searchKey}
          onChange={updateSearchKey}
      />
  
        <Table className={classes.table} size="small" aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell align="left">Description</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
     
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {truncateString(row.title, 20)}
                </StyledTableCell>
                <StyledTableCell align="left">{truncateString(row.body, 20)}</StyledTableCell>
                <StyledTableCell align="right">

                  <Button  
                    variant="contained" color="primary" size="small" 
                    className={classes.button}
                    value={row.id}
                    onClick={handleClick}
                    >
                    
                  
                    Manage Project
                  </Button>

                  

                </StyledTableCell> 
              </StyledTableRow>
            ))}
  
            {/* {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell  align='right'>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })} */}
          </TableBody>
        </Table>
        
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      
    </Paper>
   
  );
}


const mapDispatchToProps = dispatch => ({
  selectProject: (proj) => 
    dispatch(selectProject(proj))
})

export default connect(null, mapDispatchToProps)(BasicTable);