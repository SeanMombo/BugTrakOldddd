import React, { useEffect }  from 'react';

import { connect } from 'react-redux'
import { fetchCollectionsStart} from '../../redux/user-db/user-db.actions';
import NativeSelects from '../../components/listbox/select.component' 
import DataGridBox from '../../components/datagrid/datagrid.component'
import { UserPageContainer } from './users.styles'

const Users = ({ fetchCollectionsStart, match }) => {

    useEffect(() => {
        fetchCollectionsStart();
    }, [fetchCollectionsStart]);

    return (
    <UserPageContainer>
   
        <NativeSelects></NativeSelects>
        <DataGridBox/>
    </UserPageContainer>
)}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () =>  
        dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(Users);