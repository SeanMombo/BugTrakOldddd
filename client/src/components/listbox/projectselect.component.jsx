import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import { functions } from '../../firebase/firebase.utils';


import NativeSelect from '@material-ui/core/NativeSelect';

import { connect } from 'react-redux'
import { selectCollectionsForPreview } from '../../redux/user-db/user-db.selectors'
import { updateUserRole } from '../../redux/user-db/user-db.actions';


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

function ProjectSelect({collection, updateUserRole}) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    role: '',
    user: '',
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
    

    let user = collection.find(el => {
      return el.displayName === state.user;
    })
    console.log(user);
    updateUserRole(user, state.role)
  }

  return (
    <div className={classes.nativeSelects}>
        <h1>Manage User Roles</h1>
        {/* <h3>Select a Role</h3> */}
        <form onSubmit={handleSubmit}>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="user-native-simple">Select a User</InputLabel>
                <Select
                    
                native
                value={state.user}
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

            <Button 
                variant="contained"
                color="primary"
                className={classes.button}
                type="submit"> 

                Add User
            </Button>
            <Button 
                variant="contained"
                color="secondary"
                className={classes.button}
                type="submit"> 

                Remove User
            </Button>
        </form>
    </div>
  );
}


const mapStateToProps = (state) => ({
    collection: selectCollectionsForPreview(state)
})

const mapDispatchToProps = dispatch => ({
  updateUserRole: (user, role) => dispatch(updateUserRole({ user, role }))
})


export default connect(mapStateToProps, mapDispatchToProps)(ProjectSelect);
