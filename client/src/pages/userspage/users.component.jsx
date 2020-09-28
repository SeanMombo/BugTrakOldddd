import React, { useEffect }  from 'react';

import { connect } from 'react-redux'
import { fetchCollectionsStart} from '../../redux/user-db/user-db.actions';
import NativeSelects from '../../components/listbox/select.component' 
import DataGridBox from '../../components/datagrid/datagrid.component'
import { UserPageContainer } from './users.styles'
import { selectFilteredUsers } from '../../redux/user-db/user-db.selectors'
import { updateSearchKey } from '../../redux/user-db/user-db.actions';
const Users = ({ fetchCollectionsStart, updateSearchKey, collection }) => {
    const columns = [
        { field: "displayName",  headerName: "Full Name",  width: 200},
        { field: "email", headerName: "Email",      width: 250},
        { field: "userType",  headerName: "Role",       width: 150,}
      ];

    useEffect(() => {
        fetchCollectionsStart();

        //clear search key on unmount
        return () => {
            const e = {
                target: {
                    value: ''
                }
            }
            updateSearchKey(e);
        }

    }, [fetchCollectionsStart]);

    return (
    <UserPageContainer>
   
        <NativeSelects></NativeSelects>
        <DataGridBox collection={collection} columns={columns} updateSearchKey={updateSearchKey}/>
    </UserPageContainer>
)}


const mapStateToProps = (state) => ({
    collection: selectFilteredUsers(state)
})


const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () =>  
        dispatch(fetchCollectionsStart()),

    updateSearchKey: (e) => 
        dispatch(updateSearchKey(e.target.value)),
});



export default connect(mapStateToProps, mapDispatchToProps)(Users);