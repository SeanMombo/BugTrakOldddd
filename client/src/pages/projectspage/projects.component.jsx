import React, { useEffect }  from 'react';

import { connect } from 'react-redux'
import { fetchCollectionsStart} from '../../redux/user-db/user-db.actions';
import NativeSelects from '../../components/listbox/select.component' 
import DataGridBox from '../../components/datagrid/datagrid.component'
import { ProjectsPageContainer } from './users.styles'

const Projects = ({ fetchCollectionsStart }) => {

    useEffect(() => {
        fetchCollectionsStart();
    }, [fetchCollectionsStart]);

    return (
    <ProjectsPageContainer>
   
        <NativeSelects></NativeSelects>
        <DataGridBox/>
    </ProjectsPageContainer>
)}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () =>  
        dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(Projects);