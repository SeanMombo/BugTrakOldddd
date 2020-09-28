import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import { functions } from '../../firebase/firebase.utils';

import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';

import { connect } from 'react-redux'
import { selectCollectionsForPreview } from '../../redux/user-db/user-db.selectors'
import { createProject } from '../../redux/projects/projects.actions';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    marginLeft:0,
    marginRight:0,
    minWidth: 250,
 
    width:"100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: 8,
    marginLeft: 0,
    marginRight: 0,
    width:'100%'
  },
  nativeSelects: {
    maxWidth: 250,
  }
}));

function CreateProject({collection, createProject}) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    title: '',
    body: '',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  function handleSubmit(event) {
    event.preventDefault();

    createProject(state.title, state.body)
  }

  return (
    <div className={classes.nativeSelects}>
        <h1>Create New Project</h1>
        {/* <h3>Select a Role</h3> */}
        <form onSubmit={handleSubmit}>
          <TextField 
            type="text" 
            className={`search ${classes.formControl}`}
            placeholder="Project Title" 
            value={state.title}
            onChange={handleChange}
            inputProps={{
              name: 'title',
              id: 'project-title-field',
            }}
          />
          <TextField 
            type="text" 
            className={`search ${classes.formControl}`}
            placeholder="Project Description" 
            value={state.body}
            onChange={handleChange}
            inputProps={{
              name: 'body',
              id: 'project-body-field',
            }}
          />
            
          <Button 
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"> 

            Create Project
          </Button>
        </form>
    </div>
  );
}


const mapStateToProps = (state) => ({
    collection: selectCollectionsForPreview(state)
})

const mapDispatchToProps = dispatch => ({
  createProject: (title, body) => dispatch(createProject({ title, body }))
})


export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
