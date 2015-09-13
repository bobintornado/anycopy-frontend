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
				      <form className="form-signin">
				      	<h1>AnyCopy</h1>
				      	<br/>
				      	<div className='form-group'>
				      		<label htmlFor='username' className="sr-only">Username</label>
				      		<input ref='username' id='username' type='text' required autofocus className="form-control" placeholder="Username"/>
				      	</div>
				      	<div className='form-group'>
		      				<label htmlFor='password' className="sr-only">Password</label>
		      				<input ref='password' id='password' type='password' className="form-control" placeholder="Password" required/>
		      			</div>
				        {
			        		this.state.error ?
			        		<div className='form-group centered errors'>{this.state.error}</div> :
			        		null
				        }
				        <div className='form-group'>
				        	<a className="btn btn-lg btn-primary btn-block" onClick={this.submit.bind(this)}>
				        		Sign In
				        	</a>
		        		</div>
				      </form>
				</div>
				
			);
		} else {
			return ( <App /> );
		}
	}    
}

ParseComponent.defaultProps = { error: 0, signup:false };