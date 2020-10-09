import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert'


export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            alert: null,
            errors: [], 
            type: 'input'
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.showHide = this.showHide.bind(this)
    }
    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    hasErrorFor(field) {
        return !!this.state.errors[field]
    }
    renderErrorFor(field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className='invalid-feedback' role='alert'>
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            )
        }
    }
    loginSuccess(token) {
        const getAlert = () => (
            <SweetAlert
                success
                title="Welcome!"
                onConfirm={() => this.goToDashboard(token)}
                onCancel={this.hideAlert()}
                timeout={2000}
                showConfirm={false}
            >
                Welcome to system
            </SweetAlert>
        );
        this.setState({
            alert: getAlert()
        })
    }
    loginFailed(){
        const getAlert = () => (
            <SweetAlert
                danger
                title="Failed!"
                onConfirm={() => this.hideAlert()}
            >
                You Cannot Access the System
            </SweetAlert>
        );
        this.setState({
            alert: getAlert(),
            email: '',
            password: ''
        })
    }
    goToDashboard(token) {
        // return <Redirect to={'/'} />
        this.props.history.push({
            pathname: '/',
            state: { token: token }
        });
    }
    hideAlert() {
        this.setState({
            alert: null
        })
    }
    handleLogin(event) {
        event.preventDefault();
        const auth={
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/api/login', auth).then(response => {
            var msg = response.data.success
            var token = response.data.access_token

            console.log(msg);
            console.log(token);
            if(msg){
                return this.loginSuccess(token);
            }else{
                return this.loginFailed();
            }
        })
        .catch(error => {
            console.log("ERR::", error.response)
            console.log('error', error.response.data.errors);

            this.setState({
                errors : error.response.data.errors
            })
        })

    }
    showHide(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            type: this.state.type === 'input' ? 'password': 'input'
        })
    }
    render() {
        return (
            <div className='container mt-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header'>
                                Login to App
                        </div>
                            <div className='card-body'>
                                <form onSubmit={this.handleLogin}>
                                    <div className='form-group row'>
                                        <label htmlFor='title' className='col-md-4 col-form-label text-md-right'>email</label>
                                        <div className='col-md-6'>
                                            <input
                                                id='email'
                                                type='text'
                                                className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
                                                name='email'
                                                value={this.state.email}
                                                onChange={this.handleFieldChange}
                                            />

                                            {this.renderErrorFor('email')}
                                            
                                        </div>
                                    </div>
                                    <div className='form-group row'>
                                        <label htmlFor='title' className='col-md-4 col-form-label text-md-right'>Password</label>
                                        <div className='col-md-6'>
                                            <input
                                                id='password'
                                                type={this.state.type}
                                                className={`form-control ${this.hasErrorFor('password') ? 'is-invalid' : ''}`}
                                                name='password'
                                                value={this.state.password}
                                                onChange={this.handleFieldChange}
                                            />
                                            {this.renderErrorFor('password')}
                                        </div>
                                        <div className='col-md-1'>
                                            <span onClick={this.showHide}>
                                                {this.state.type === 'input' ? 'Hide' : 'Show'}
                                            </span>
                                        </div>
                                        {this.renderErrorFor('password')}
                                    </div>
                                    <div className='form-group row mb-0'>
                                        <div className='col-md-8 offset-md-4'>
                                            <button className='btn btn-primary'>Login</button>
                                        </div>
                                        <a className='btn btn-link' href={'/passwordRequest'}>
                                            Forget your password
                                        </a>
                                    </div>
                                    {this.state.alert}
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
