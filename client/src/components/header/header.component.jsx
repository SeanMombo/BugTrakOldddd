import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
  HeaderContainerWrapper
} from './header.styles';

const Header = ({ currentUser, hidden, signOutStart }) => (
  <HeaderContainerWrapper>

  <HeaderContainer>
    
      <h1>BugTrak</h1>
    
      <OptionsContainer>
        <OptionLink to='/shop'>SHOP</OptionLink>
        <OptionLink to='/shop'>CONTACT</OptionLink>
        {currentUser ? (
          <OptionLink as='div' onClick={signOutStart}>
            SIGN OUT
          </OptionLink>
        ) : (
          <OptionLink to='/signin'>SIGN IN</OptionLink>
        )}
      
      </OptionsContainer>
          
  </HeaderContainer>
  <Divider/>
  </HeaderContainerWrapper>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
