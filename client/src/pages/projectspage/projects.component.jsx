import React, { useEffect }  from 'react';

import { connect } from 'react-redux'

import NativeSelects from '../../components/listbox/select.component' 
import DataGridBox from '../../components/datagrid/datagrid.component'
import { ProjectsPageContainer } from './projects.styles'

import { fetchProjectsStart} from '../../redux/projects/projects.actions';
import { selectFilteredProjects } from '../../redux/projects/projects.selectors';
import { updateSearchKey } from '../../redux/projects/projects.actions';
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
        { field: "title",  headerName: "Project Title",  width: 200},
        { field: "body", headerName: "Project Description",      width: 250},
        { field: "actions",  headerName: "Actions",       width: 150,}
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
   
        <Button 
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"> 

            Create New Project
        </Button>
        <DataGridBox collection={projects} columns={columns} updateSearchKey={updateSearchKey}/>
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
});



export default connect(mapStateToProps, mapDispatchToProps)(Projects);