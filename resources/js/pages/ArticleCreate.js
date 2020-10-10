import axios from 'axios'
import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert';
import HeaderContent from '../components/ContentHeader'
import ContentHeader from '../components/ContentHeader';

export default class ArticleCreate extends Component {
    
    constructor (props) {
        super(props)
        this.state = {
            title: '',
            content: '',
            alert: null,
            errors: [],
            token: localStorage.getItem('accessToken')
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleCreateNewArticle = this.handleCreateNewArticle.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
    }

    handleFieldChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    goToHome() {
        const getAlert = () => (
            <SweetAlert
                success
                title="Success!"
                onConfirm={() => this.onSuccess() }
                onCancel={this.hideAlert()}
                // // timeout={6000}
                // confirmBtnText="Oke Siap"
                >
                    Created article successfully
            </SweetAlert>
        )
        this.setState({
            alert: getAlert()
        })
    }
    onSuccess(){
        this.props.history.push('/');
    }
    
    hideAlert() {
        this.setState({
            alert: null
        });
    }

    handleCreateNewArticle(event) {
        event.preventDefault()
        const article = {
            title: this.state.title,
            content: this.state.content
        }
        axios.post('/api/articles', article, {
            headers: {
                'Authorization': `Bearer ${this.state.token}`}}).then(response => {
            var msg = response.data.success;
            if(msg == true) {
                return this.goToHome();
            }
        })
        .catch(error => {
            console.log('error', error.response.data.errors);

            this.setState({
                errors : error.response.data.errors
            })
        })
    }
    hasErrorFor (field) {
        return !!this.state.errors[field]
    }
    renderErrorFor (field) {
        if (this.hasErrorFor(field)) {
            return (
            <span className='invalid-feedback'>
                <strong>{this.state.errors[field][0]}</strong>
            </span>
            )
        }
    }
    render() {
        return(
            <div className='content-wrapper'>
                <ContentHeader linkName="Create New Project" title="Create New Project"/>
                <div className='content'>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <div className='card'>
                                    <div className='card-header'>Create new project</div>
                                        <div className='card-body'>
                                            <form onSubmit={this.handleCreateNewArticle}>
                                                <div className='form-group'>
                                                    <label htmlFor='title'>Title</label>
                                                    <input 
                                                        id='title'
                                                        type='text'
                                                        className={`form-control ${this.hasErrorFor('title') ? 'is-invalid' : ''}`}
                                                        name='title'
                                                        value={this.state.title}
                                                        onChange={this.handleFieldChange}
                                                    />
                                                    {this.renderErrorFor('title')}
                                                </div>
                                                <div className='form-group'>
                                                    <label htmlFor='content'>Project content</label>
                                                    <textarea 
                                                        id='content'
                                                        className={`form-control ${this.hasErrorFor('content') ? 'is-invalid' : ''}`}
                                                        name='content'
                                                        rows='10'
                                                        value={this.state.content}
                                                        onChange={this.handleFieldChange}
                                                    />
                                                    {this.renderErrorFor('content')}
                                                </div>
                                                <Link
                                                    className='btn btn-secondary'
                                                    to={`/`}>Back
                                                </Link>
                                                &nbsp;
                                                &nbsp;
                                                <button className='btn btn-primary'>Create</button>
                                                {this.state.alert}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}