import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux'


import { createStructuredSelector } from 'reselect';



//TODO implement search/filter functionality using redux 
function DataGridBox({collection, updateSearchKey, columns}) {
  console.log('DataGridBox')
  console.log(collection)

  return (
    <div style={{ minWidth:'260px', width: '80%', margin: '64px', marginTop:'0px'}}>
      <h1>All Users</h1>
      <TextField 
        type="text" 
        class="search form-control" 
        placeholder="What you looking for?" 
        value={''}
        onChange={updateSearchKey}
    />
        <DataGrid rows={collection} columns={columns} colSpan={3} pageSize={5} autoHeight={true} hideFooterSelectedRowCount={true}/>
        
    </div>
  );
}

// const mapStateToProps = (state) => ({
//   collection: selectFilteredUsers(state)
// })

// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch,
//     updateSearchKey: (e) => dispatch(updateSearchKey(e.target.value)),
//   };
// }

// export default connect(null, mapDispatchToProps)(DataGridBox);
export default DataGridBox;
