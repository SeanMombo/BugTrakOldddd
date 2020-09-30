import React, { useEffect }  from 'react';

import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import CreateProject from '../../components/listbox/createproject.component' 
import DataGridBox from '../../components/datagrid/datagrid.component'
import BasicTable from '../../components/datagrid/dg.component'
import ProjectSelect from '../../components/listbox/projectselect.component' 
import Divider from '@material-ui/core/Divider';

import Typography from '@material-ui/core/Typography';
import { ProjectsPageContainer, InnerProjectPageContainer } from './projects.styles'
import { makeStyles } from '@material-ui/core/styles';
import { fetchProjectsStart} from '../../redux/projects/projects.actions';
import { selectFilteredProjects, selectSelectedProject, selectUsersProjects } from '../../redux/projects/projects.selectors';
import { updateSearchKey, fetchUsersProjectsStart, createProject } from '../../redux/projects/projects.actions';

import { selectFilteredUsers } from '../../redux/user-db/user-db.selectors';
import { fetchCollectionsStart } from '../../redux/user-db/user-db.actions'

import TransferList from './transferlist.component'

const useStyles = makeStyles((theme) => ({
  button: {
      width:'100%'
  },
  titleCard: {
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',

  }
}));

const Project = ({ fetchProjectsStart, fetchUsersProjectsStart, projects, collection, updateSearchKey, selectedProject, users_projects }) => {
    const classes = useStyles();
    const title = selectedProject.title;
    const body = selectedProject.body;
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
        // fetchProjectsStart();

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
        
            <div>
                <Typography variant="h2" component="h2">
                    {title}
                </Typography>
                <Typography variant="h5" component="h3">
                    {body}
                </Typography>
            </div>
        
    
        <Divider/><br/>
        <InnerProjectPageContainer>
            
            <TransferList selectedProject={selectedProject}/>
            <BasicTable collection={projects} updateSearchKey={updateSearchKey}/>
            
        </InnerProjectPageContainer>
    </ProjectsPageContainer>
)}

const mapStateToProps = (state) => ({
    projects: selectFilteredProjects(state),
    selectedProject: selectSelectedProject(state),
    collection: selectFilteredUsers(state),

  })

const mapDispatchToProps = dispatch => ({
    fetchProjectsStart: () =>  
        dispatch(fetchProjectsStart()),
    
        
    updateSearchKey: (e) => 
        dispatch(updateSearchKey(e.target.value)),

});


export default connect(mapStateToProps, mapDispatchToProps)(Project);