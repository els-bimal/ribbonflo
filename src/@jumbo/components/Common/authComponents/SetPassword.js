import { connect, useSelector } from 'react-redux';
import React, { useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import IntlMessages from '../../../utils/IntlMessages';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import { AuhMethods } from '../../../../services/auth';
//import * as mutations from '../../../../redux/store/mutations';
import ContentLoader from '../../ContentLoader';
import { alpha, makeStyles } from '@material-ui/core/styles';
import CmtImage from '../../../../@coremat/CmtImage';
import { fetchError, fetchStart, fetchSuccess } from '../../../../redux/actions';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { CurrentAuthMethod } from '../../../constants/AppConstants';
import { NavLink } from 'react-router-dom';
import AuthWrapper from './AuthWrapper';
import usePrevious from './usePrevious';

const useStyles = makeStyles(theme => ({
  authThumb: {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50%',
      order: 2,
    },
  },
  authContent: {
    padding: 30,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: props => (props.variant === 'default' ? '50%' : '100%'),
      order: 1,
    },
    [theme.breakpoints.up('xl')]: {
      padding: 50,
    },
  },
  titleRoot: {
    marginBottom: 14,
    color: theme.palette.text.primary,
  },
  textFieldRoot: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: alpha(theme.palette.common.dark, 0.12),
    },
  },
  formcontrolLabelRoot: {
    '& .MuiFormControlLabel-label': {
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    },
  },
}));
//variant = 'default', 'standard'
const SetPassword = ({ method = CurrentAuthMethod, variant = 'default', wrapperVariant = 'default' }) => {
  const [isResetOk, setisResetOk] = useState(false);
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const dispatch = useDispatch();
  const classes = useStyles({ variant });
  //const previsResetOk = usePrevious(isResetOk)
  //const authUser = useSelector(state => state.authUser)
  useEffect(() => {
      setisResetOk(getActionState('isResetOk'));
  },[]);
  const onSubmit = () => {
    if(username.trim() === ''){
        dispatch(fetchError("Please enter User Name"))
    }
    if(password.trim() === ''){
        dispatch(fetchError("Please enter current password"))
    }
    if(!isResetOk){
      if(newPassword.trim() === ''){
          dispatch(fetchError("Please enter new password"))
      }
      if(newPassword !== confirmPassword){
          dispatch(fetchError("Please makesure new password and confirm match"))
      }
      dispatch(AuhMethods[method].onSetPassword({ username :username, password : password, newpassword : newPassword }));
      console.log('-----1here-----');
      let value = getActionState('isResetOk');
      if(value){
        setisResetOk(true)
        dispatch(AuhMethods[method].onLogout());
      }
      console.log('-----3here-----');

    }
    else{
          
          dispatch(AuhMethods[method].onLogin({ username :username, password }));
          let value = getActionState('isLogin');
          if(value){
            localStorage.removeItem('isResetOk');
          }

    }
  };

  function getActionState(item_name) {
      let jsonObj = localStorage.getItem(item_name);
      console.log('-----2here-----');
      let timer = setTimeout(function () {
        console.log('waiting');

      }, 5000);
      jsonObj = localStorage.getItem(item_name);
      console.log(jsonObj);
      let authUser1 = null;
      if(jsonObj !== null){
        authUser1 = JSON.parse(jsonObj);
        console.log('-----3here-----');

        return authUser1.isOperationSuccess;
      }
            console.log('-----4here-----');

      return false;
      

  }
  return (
    <AuthWrapper variant={wrapperVariant}>
      {variant === 'default' ? (
        <Box className={classes.authThumb}>
          <CmtImage src={'/images/auth/login-img.png'} />
        </Box>
      ) : null}
      <Box className={classes.authContent}>
        <Box mb={7}>
          <CmtImage src={'/images/logo.png'} />
        </Box>
        <Typography component="div" variant="h1" className={classes.titleRoot}>
          {isResetOk? "Login" : "Set Password" } - { !isResetOk? "Set password": "done!!"}
        </Typography>
        <form>
          <Box mb={2}>
            <TextField
              label={<IntlMessages id="appModule.email" />}
              fullWidth
              onChange={event => setusername(event.target.value)}
              defaultValue={username}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Box>
          <Box mb={2}>
            <TextField
              type="password"
              label={<IntlMessages id="appModule.password" />}
              fullWidth
              onChange={event => setpassword(event.target.value)}
              defaultValue={password}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Box>
        {
          !isResetOk?(
            <div>
            <Box mb={2}>
              <TextField
                type="password"
                label={<IntlMessages id="appModule.new_password" />}
                fullWidth
                onChange={event => setnewPassword(event.target.value)}
                defaultValue={newPassword}
                margin="normal"
                variant="outlined"
                className={classes.textFieldRoot}
              />
            </Box>
            <Box mb={2}>
              <TextField
                type="password"
                label={<IntlMessages id="appModule.confirm_password" />}
                fullWidth
                onChange={event => setconfirmPassword(event.target.value)}
                defaultValue={confirmPassword}
                margin="normal"
                variant="outlined"
                className={classes.textFieldRoot}
              />
            </Box>

            </div>

          ):
          null

        }

          <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
            <FormControlLabel
              className={classes.formcontrolLabelRoot}
              control={<Checkbox name="checkedA" />}
              label="Remember me"
            />
            <Box component="p" fontSize={{ xs: 12, sm: 16 }}>
              <NavLink to="/forgot-password">
                <IntlMessages id="appModule.forgotPassword" />
              </NavLink>
            </Box>
          </Box>

          <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
            <Button onClick={onSubmit} variant="contained" color="primary">
              <IntlMessages id={isResetOk?"appModule.signIn": "appModule.signInReset"} />
            </Button>

            <Box component="p" fontSize={{ xs: 12, sm: 16 }}>
              <NavLink to="/signup">
                <IntlMessages id="signIn.signUp" />
              </NavLink>
            </Box>
          </Box>
        </form>


        <ContentLoader />
      </Box>
    </AuthWrapper>
  );
};

export default connect(null,null)(SetPassword);
