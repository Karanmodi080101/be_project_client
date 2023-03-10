import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from 'src/app/core/actions/alert';
import { register } from 'src/app/core/actions/authentication';
const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    talentPassportAccess: false,
    evaluationAccess: false,
    myDevelopmentAccess: false
  }); //state of the form
  const {
    name,
    email,
    password,
    password2,
    talentPassportAccess,
    evaluationAccess,
    myDevelopmentAccess
  } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger', 2000);
    } else {
      register({
        name,
        email,
        password,
        talentPassportAccess,
        evaluationAccess,
        myDevelopmentAccess
      });
    }
  };

  const onHandleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.currentTarget.checked });
  };

  if (isAuthenticated) {
    // return <Redirect to='/dashboard' />;
    return <Redirect to='/GettingStarted' />;
  }
  return (
    <Fragment>
      <section className='container-login'>
        <h1 className='medium text-primary'>Sign Up</h1>{' '}
        <p className='lead'>
          <i className='fas fa-user'></i> Create Your Account{' '}
        </p>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Name'
              name='name'
              value={name}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              minLength='6'
              value={password}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Confirm Password'
              name='password2'
              minLength='6'
              value={password2}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <div className='checkbox'>
              <input
                type='checkbox'
                placeholder='Talent Passport'
                name='talentPassportAccess'
                value={talentPassportAccess}
                onChange={(e) => onHandleCheckboxChange(e)}
              />
              <label>Talent Passport</label>
            </div>
            <div className='checkbox'>
              <input
                type='checkbox'
                placeholder='Evaluations'
                name='evaluationAccess'
                value={evaluationAccess}
                onChange={(e) => onHandleCheckboxChange(e)}
              />
              <label>Evaluations</label>
            </div>
            <div className='checkbox'>
              <input
                type='checkbox'
                placeholder='My Development'
                name='myDevelopmentAccess'
                value={myDevelopmentAccess}
                onChange={(e) => onHandleCheckboxChange(e)}
              />
              <label>My Development</label>
            </div>
          </div>
          <input type='submit' className='btn btn-primary' value='Register' />{' '}
        </form>
        <p className='my-1'>
          Already have an account? <Link to='/login'>Sign In</Link>{' '}
        </p>
      </section>
    </Fragment>
  );
};
Register.prototype = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { setAlert, register })(Register);
