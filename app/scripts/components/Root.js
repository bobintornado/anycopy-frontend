import ParseReact from 'parse-react';
import React from 'react';
import App from './App'
import Parse from 'parse'

const ParseComponent = ParseReact.Component(React);

export default class Root extends ParseComponent {
	constructor(props) {
	    super(props);
	    this.state = {count: props.error, signup: props.signup};
	}

	observe(props, state) {
		return {
			user: ParseReact.currentUser
		};
	}

	submit() {
	    var self = this;
	    var username = React.findDOMNode(this.refs.username).value;
	    var password = React.findDOMNode(this.refs.password).value;
	    if (username.length && password.length) {
	      if (this.state.signup) {
	        console.log('signup');
	        var u = new Parse.User({
	          username: username,
	          password: password
	        });
	        u.signUp().then(function() {
	          self.setState({
	            error: null
	          });
	        }, function() {
	          self.setState({
	            error: 'Invalid account information'
	          });
	        });
	      } else {
	        Parse.User.logIn(username, password).then(function() {
	          self.setState({
	            error: null
	          });
	        }, function() {
	          self.setState({
	            error: 'Incorrect username or password'
	          });
	        });
	      }
	    } else {
	      this.setState({
	        error: 'Please enter all fields'
	      });
	    }
	  }

	render() {

		if (this.data.user === undefined) {
			return (
				<div className="container">
					<h1>Any Copy</h1>
					<div className='loginForm' onKeyDown={this.keyDown}>
						{
						this.state.error ?
						<div className='row centered errors'>{this.state.error}</div> :
						null
						}
						<div className='row'>
							<label htmlFor='username'>Username</label>
							<input ref='username' id='username' type='text' />
						</div>
						<div className='row'>
							<label htmlFor='password'>Password</label>
							<input ref='password' id='password' type='password' />
						</div>
						<div className='row centered'>
							<a className='button' onClick={this.submit.bind(this)}>
								{this.state.signup ? 'Sign up' : 'Log in'}
							</a>
						</div>
						<div className='row centered'>
							or&nbsp;
							<a onClick={this.toggleSignup}>
								{this.state.signup ? 'log in' : 'sign up'}
							</a>
						</div>
					</div>
				</div>
			);
		} else {
			return ( <App /> );
		}
	}    
}

ParseComponent.defaultProps = { error: 0, signup:false };