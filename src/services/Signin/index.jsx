/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, reducer as formReducer } from 'redux-form';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import * as signin from './actions';
import { useInjectReducer } from '../../Utils/injectReducer';
import { useInjectSaga } from '../../Utils/injectSaga';
import signinSaga from './saga';
import Loading2 from '../../Assets/loading2.svg';
import './signin.css';
import './signin-error.css';

let SigninForm = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = (formProps) => {
    dispatch(signin.request({ formProps, history }));
  };

  // eslint-disable-next-line react/prop-types
  const { handleSubmit, auth } = props;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="si-input-container">
        <label className="si-label name">
          <span className="si-span name">Name</span>
        </label>
        <Field
          className="si-input-box name"
          name="name"
          type="text"
          component="input"
          autoComplete="off"
        />
      </fieldset>
      <fieldset className="si-input-container">
        <label className="si-label pw">
          <span className="si-span pw">Password</span>
        </label>
        <Field
          className="si-input-box pw"
          name="password"
          type="password"
          component="input"
          autoComplete="none"
        />
      </fieldset>
      <div className="si-submit">
        {auth.initialized
          ? (<Loading2 className="si-loading" />)
          : (<button type="submit" className="si-button">Sign in</button>)}
      </div>
    </form>
  );
};

SigninForm = reduxForm({
  form: 'signup'
})(SigninForm);

const Signin = () => {
  const auth = useSelector((state) => state.auth);

  useInjectReducer({ key: 'form', reducer: formReducer });
  useInjectSaga({ key: 'signin', saga: signinSaga });

  const showTimeoutTimer = (
    <div>
      <p style={{ color: 'black' }}>
        Sign-in on cooldown..
      </p>
      <p style={{ color: 'black' }}>{auth.timeout}</p>
    </div>
  );

  const signinError = (
    <div className="box error">
      <div className="icon-container">
        <FaTimes className="error" />
      </div>
      <div className="message-container">
        <p>{auth.errorMessage}</p>
      </div>
    </div>
  );

  return (
    <div className="login">
      <div className="page-title">
        <span>Sign In</span>
      </div>
      <div className="signin-form">
        <div className="signin-form-container">
          {auth.attemptExceeded ? showTimeoutTimer : <SigninForm auth={auth} />}
        </div>
        {auth.errorMessage ? (signinError) : null}
      </div>
    </div>
  );
};

SigninForm.propTypes = {
  auth: PropTypes.shape({
    initialized: PropTypes.bool.isRequired,
  }).isRequired
};

export default Signin;
