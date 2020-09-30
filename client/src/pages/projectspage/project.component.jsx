import React, { useEffect }  from 'react';

import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import TicketTable from '../../components/datagrid/tickets-table.component'

import Divider from '@material-ui/core/Divider';

import Typography from '@material-ui/core/Typography';
import { ProjectsPageContainer, InnerProjectPageContainer } from './projects.styles'
import { makeStyles } from '@material-ui/core/styles';
import {selectSelectedProject } from '../../redux/projects/projects.selectors';
import { updateSearchKey } from '../../redux/projects/projects.actions';

import { fetchTicketsStart } from '../../redux/tickets/tickets.actions'

import TransferList from './transferlist.component'
import { selectIsTicketsFetching } from '../../redux/tickets/tickets.selectors';
import WithSpinner from '../../components/with-spinner/with-spinner.component'

const BasicTableWithSpinner = WithSpinner(TicketTable)

const useStyles = makeStyles((theme) => ({
  button: {
      width:'100%'
  },
  titleCard: {
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
  },
  vert: {
     margin:8 
  },
  titleStyle: {
    fontWeight: 'bold'
  }
}));

const Project = ({fetchTicketsStart,  tickets, updateSearchKey, selectedProject, isLoading }) => {
    
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
        fetchTicketsStart(selectedProject.id);

    //clear search key on unmount
        return () => {
            const e = {
                target: {
                    value: ''
                }
            }
            updateSearchKey(e);
        }

    }, [fetchTicketsStart]);

    

    return (
    <ProjectsPageContainer>
        
            <div>
                <Typography className={classes.titleStyle} variant="h2" component="h2">
                    {title}
                </Typography>
                <Typography variant="h5" component="h3">
                    {body}
                </Typography>
            </div>
        
    
        <Divider/><br/>
        <InnerProjectPageContainer>
            
            <TransferList selectedProject={selectedProject}/>
            <Divider className={classes.vert} orientation="vertical" flexItem />
            <BasicTableWithSpinner isLoading={isLoading} type={0} updateSearchKey={updateSearchKey} selectedProject={selectedProject}/>
            
        </InnerProjectPageContainer>
    </ProjectsPageContainer>
)}

const mapStateToProps = (state) => ({
    selectedProject: selectSelectedProject(state),
    isLoading: selectIsTicketsFetching(state),
  })

const mapDispatchToProps = dispatch => ({
    fetchTicketsStart: (projectId) => 
        dispatch(fetchTicketsStart({projectId})), 

    updateSearchKey: (e) => 
        dispatch(updateSearchKey(e.target.value)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Project);