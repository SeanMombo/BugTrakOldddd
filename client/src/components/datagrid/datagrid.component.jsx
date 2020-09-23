import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { connect } from 'react-redux'
import { selectCollectionsForPreview } from '../../redux/user-db/user-db.selectors'

const columns = [
  { field: "displayName",  headerName: "Full Name",  width: 250},
  { field: "email", headerName: "Email",      width: 250},
  { field: "userType",  headerName: "Role",       width: 150,}
];


function DataGridBox({collection}) {
  console.log(collection)
  return (
    <div style={{ height: '500', width: '100%', margin: '64px', marginTop:'0px'}}>
      <h1>All Users</h1>

          <DataGrid rows={collection} columns={columns} pageSize={5} autoHeight={true} />

    </div>
  );
}

const mapStateToProps = (state) => ({
  collection: selectCollectionsForPreview(state)
})

export default connect(mapStateToProps)(DataGridBox);
