import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ArticleShow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            article: {}
        }
    }

    componentDidMount() {
        const articleId = this.props.match.params.id 

        axios.get(`/api/article/${articleId}`).then(response => {
            this.setState({
                article: response.data
            })
        })
    }
    render() {
        const { article } = this.state

        return (
            <div className='container py-4 mt-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header'>Judul Artikel: <b>{article.title}</b></div>
                            <div className='card-body'>
                                <p>{article.content}</p>
                                <Link
                                    className='btn btn-primary'
                                    to={`/`}
                                >Back
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}