import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';

import NativeSelect from '@material-ui/core/NativeSelect';

import { connect } from 'react-redux'
import { selectCollectionsForPreview } from '../../redux/user-db/user-db.selectors'

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
      width:'100%'
  }
}));

function NativeSelects({collection}) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    role: '',
    user: 'hai',
    name: 'hai',
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
    console.log( state); 


}

  return (
    <div>
        <h1>Manage User Roles</h1>
        {/* <h3>Select a Role</h3> */}
        <form onSubmit={handleSubmit}>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="user-native-simple">Select a User</InputLabel>
                <Select
                    
                native
                value={state.age}
                onChange={handleChange}
                inputProps={{
                    name: 'user',
                    id: 'user-native-simple',
                }}
                >
                <option aria-label="None" value="" />
                {collection.map((col, i) => (
                    <option value={col['displayName']}>{col['displayName']}</option>
                ))}
                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="role-native-simple">Select a Role</InputLabel>
                <Select
                    
                native
                value={state.age}
                onChange={handleChange}
                inputProps={{
                    name: 'role',
                    id: 'role-native-simple',
                }}
                >
                    <option aria-label="None" value="" />
                    <option value={'Admin'}>Admin</option>
                    <option value={'Developer'}>Developer</option>
                    <option value={'Project Manager'}>Project Manager</option>
                    <option value={'Submitter'}>Submitter</option>
                    <option value={'No role'}>No Role</option>
                </Select>
            </FormControl>
            <Button 
                variant="contained"
                color="Primary"
                className={classes.button}
                type="submit"> 

                Apply Role To User 
            </Button>
        </form>
    </div>
  );
}


const mapStateToProps = (state) => ({
    collection: selectCollectionsForPreview(state)
})

export default connect(mapStateToProps)(NativeSelects);
