import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux'
import { selectFilteredUsers, selectCollectionsForPreview } from '../../redux/user-db/user-db.selectors'
import { updateSearchKey } from '../../redux/user-db/user-db.actions';
import { createStructuredSelector } from 'reselect';

const columns = [
  { field: "displayName",  headerName: "Full Name",  width: 200},
  { field: "email", headerName: "Email",      width: 250},
  { field: "userType",  headerName: "Role",       width: 150,}
];

//TODO implement search/filter functionality using redux 
function DataGridBox({collection, updateSearchKey, searchKey}) {
  console.log('DataGridBox')
  console.log(collection)

  return (
    <div style={{ height: '500', width: '80%', margin: '64px', marginTop:'0px'}}>
      <h1>All Users</h1>
      <TextField 
        type="text" 
        class="search form-control" 
        placeholder="What you looking for?" 
        value={searchKey}
        onChange={updateSearchKey}
    />
        <DataGrid rows={collection} columns={columns} colSpan={3} pageSize={5} autoHeight={true} />
        
    </div>
  );
}

const mapStateToProps = (state) => ({
  collection: selectFilteredUsers(state)
})

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    updateSearchKey: (e) => dispatch(updateSearchKey(e.target.value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DataGridBox);
