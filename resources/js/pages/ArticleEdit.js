import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert';
import ContentHeader from './../components/ContentHeader'

export default class ArticleEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            content: '',
            alert: null,
            message: '',
            errors: [],
            token: localStorage.getItem('accessToken')
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleUpdateArticle = this.handleUpdateArticle.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
    }
    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    componentDidMount() {
        const articleId = this.props.match.params.id

        axios.get(`/api/articles/${articleId}`,{
            headers: {
                'Authorization': `Bearer ${this.state.token}`}}).then(response => {
            this.setState({
                title: response.data.title,
                content: response.data.content
            })
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
                    Article update successfully
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
    handleUpdateArticle(event){
        event.preventDefault()

        const article = {
            title: this.state.title,
            content: this.state.content
        }
        const articleId = this.props.match.params.id

        axios.put(`/api/article/${articleId}`, article).then(response => {
            var msg = response.data.success;
            if(msg == true) {
                return this.goToHome();
            }
            console.log(msg)
        })
        .catch(error => {
            console.log('error', error.response.data.errors);

            this.setState({
                errors : error.response.data.errors
            })
        })
    }
    hasErrorFor(field){
        return !!this.state.errors[field]
    }
    renderErrorFor(field){
        if(this.hasErrorFor(field)){
            return (
                <span className='invalid-feedback'>
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            )
        }
    }

    render() {
        const { article } = this.state
        return (
            <div className='content-wrapper'>
                <ContentHeader linkName="Create New Project" title="Create New Project"/>
                <div className='content'>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-md-12'>
                        <div className='card'>
                            <div className='card-header'>Edit Data</div>
                            <div className='card-body'>
                                <form onSubmit={this.handleUpdateArticle}>
                                    <div className='form-group'>
                                        <label htmlFor='title'>Title</label>
                                        <input
                                            id='title'
                                            type='text'
                                            className={`form-control ${this.hasErrorFor('title') ? 'is-invalid' : '' } `}
                                            name='title'
                                            value={this.state.title}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor('content')}
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
                                        to={`/`}>
                                        Back
                                    </Link>
                                    &nbsp;
                                    &nbsp;
                                    <button className='btn btn-primary'>Update</button>
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