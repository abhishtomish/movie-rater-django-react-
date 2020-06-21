import React, { Component } from 'react'

export class Login extends Component {

    state = {
        credentials: {
            username: '',
            password: ''
        }
    }

    login = () => {
        console.log(this.state.credentials);
        fetch("http://13.233.161.192:8000/auth/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.credentials)
        })
        .then(data => data.json())
        .then(
            data => {
                this.props.userLogin(data.token);
            }
        )
        .catch(
            error => {
                console.log(error);
            }
        )
    }

    register = () => {
        console.log(this.state.credentials);
        fetch("http://13.233.161.192:8000/api/users/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.credentials)
        })
        .then(data => data.json())
        .then(
            data => {
                console.log(data);
            }
        )
        .catch(
            error => {
                console.log(error);
            }
        )
    }

    inputChange = (event) => {
        const cred = this.state.credentials;
        cred[event.target.name] = event.target.value;
        this.setState({
            credentials: cred
        })
    }

    render() {
        return (
            <div>
                <h1>Login User</h1>

                <label>
                    Username:
                    <input type="text" name="username"
                    value={this.state.credentials.username}
                    onChange={this.inputChange}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password"
                    value={this.state.credentials.password}
                    onChange={this.inputChange}
                    />
                </label>
                <br />
                <button onClick={this.login} >Login</button>
                <button onClick={this.register} >Register</button>
            </div>
        )
    }
}

export default Login
