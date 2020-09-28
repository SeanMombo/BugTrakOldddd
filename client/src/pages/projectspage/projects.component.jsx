import React, { useEffect }  from 'react';

import { connect } from 'react-redux'

import CreateProject from '../../components/listbox/createproject.component' 
import DataGridBox from '../../components/datagrid/datagrid.component'
import BasicTable from '../../components/datagrid/dg.component'


import { ProjectsPageContainer } from './projects.styles'

import { fetchProjectsStart} from '../../redux/projects/projects.actions';
import { selectFilteredProjects } from '../../redux/projects/projects.selectors';
import { updateSearchKey, createProject } from '../../redux/projects/projects.actions';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
      width:'100%'
  },
}));

const Projects = ({ fetchProjectsStart, projects, updateSearchKey }) => {
    const classes = useStyles();
    const columns = [
        { field: "title",  headerName: "Project Title", width: 200},
        { field: "body", headerName: "Project Description", width: 250},
        { field: "actions",  headerName: "Manage", width: 250, 
            renderCell: (params) => (
            <strong>
            <Button  
                variant="contained"
                color="primary"
                className={classes.button}
                type="submit"> Manage Project
            </Button>
              {/* {`${params.getValue('title')}`} */}
            </strong>
          ),}
      ];
    
    useEffect(() => {
        fetchProjectsStart();

    //clear search key on unmount
        return () => {
            const e = {
                target: {
                    value: ''
                }
            }
            updateSearchKey(e);
        }

    }, [fetchProjectsStart]);

    return (
    <ProjectsPageContainer>
        <CreateProject/>
        <BasicTable/>
        {/* <DataGridBox collection={projects} columns={columns} updateSearchKey={updateSearchKey}/> */}
    </ProjectsPageContainer>
)}

const mapStateToProps = (state) => ({
    projects: selectFilteredProjects(state)
  })

const mapDispatchToProps = dispatch => ({
    fetchProjectsStart: () =>  
        dispatch(fetchProjectsStart()),

    updateSearchKey: (e) => 
        dispatch(updateSearchKey(e.target.value)),

    // createProject: ({title, body}) =>
    //     dispatch(createProject({title, body}))
});



export default connect(mapStateToProps, mapDispatchToProps)(Projects);