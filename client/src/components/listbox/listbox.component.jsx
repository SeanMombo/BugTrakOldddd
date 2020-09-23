import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List'
import Paper from '@material-ui/core/Paper'
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import { connect } from 'react-redux'
import { selectCollectionsForPreview } from '../../redux/user-db/user-db.selectors'
import NativeSelects from './select.component'

import './listbox.styles.scss';

const useStyles = makeStyles((theme) => ({
  users: {
    width: '100%',
    height: 200,
    maxWidth: 300,

    backgroundColor: theme.palette.background.paper,
    overflowY: 'scroll',
  },

  roles: {
    width: '100%',
    height: 200,
    maxWidth: 300,

    backgroundColor: theme.palette.background.paper,
    overflowY: 'scroll',
  },
}));




function ListBox({collection}) {

  const classes = useStyles();

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  
  console.log(collection)
  return (
      <div className = "listbox">
        <h3>Select a User</h3>
          <List component="nav" className={classes.users} aria-label="users" dense disablePadding > 
          {collection.map((col, i) => (
            
            
              <ListItem 
              
                button 
                key={`item-${col['displayName']}`}
                selected={selectedIndex === i}
                onClick={(event) => handleListItemClick(event, i)}
                >
                <ListItemText primary={`${col['displayName']}`} />
              </ListItem>
  
  
          ))}
          </List>

            <NativeSelects/>
          {/* <List component="nav" className={classes.roles} aria-label="contacts" dense disablePadding> 
          {collection.map((col, i) => (
            
            
              <ListItem 
              
                button 
                key={`item-${col['displayName']}`}
                selected={selectedIndex === i}
                onClick={(event) => handleListItemClick(event, i)}
                >
                <ListItemText primary={`${col['displayName']}`} />
              </ListItem>
  
  
          ))}
          </List> */}

          
          <Button
            variant="contained"
            color="Primary"
            className={classes.button}
           
            >
            Apply Role to User
          </Button>

      </div>
          

  )

}


// import React from 'react';

// import CollectionItem from '../../components/collection-item/collection-item.component'


// import "./collection.styles.scss"


const mapStateToProps = (state) => ({
    collection: selectCollectionsForPreview(state)
})

export default connect(mapStateToProps)(ListBox);

