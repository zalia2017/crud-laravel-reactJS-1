import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert'
// import { Pagination } from 'react-laravel-paginex'
import Pagination from 'react-js-pagination'

export default class ArticleIndex extends Component {

    constructor() {
        super()
        this.state = {
            articles: [],
            msg: null,
            type: null,
            flash: false,
            alert: null,
            data: null
        }
    }

    hideAlert() {
        this.setState({
            alert: null
        });
    }
    async componentWillMount() {
        await this.getData();
    }
    async getData(pageNumber = 1) {
        const url = `http://localhost:8000/api/articles?page=${pageNumber}`;
        const response = await axios.get(url);
        // console.log(response.data)
        // axios.get('/api/articles?page=').then(response => {
        //     console.log(response)
        //     // this.setState({
        //     //     data:data
        //     // })
        //     this.setState({
        //         articles: response.data.data
        //     })
        // })
        this.setState({ data: response.data })
    }
    async componentDidMount() {
        // axios.get('/api/articles').then(response => {
        //     // console.log(response.data.data)
        //     this.setState({
        //         articles: response.data.data
        //     })
        // })
        // this.getData()
        await this.getData();
    }

    confirmDelete(id) {
        const getAlert = () => (
            <SweetAlert
                warning
                showCancel
                confirmBtnText="Hapus Deh"
                cancelBtnText="Cancel"
                confirmBtnBsStyle="default"
                cancelBtnBsStyle="danger"
                title="Wait..."
                onConfirm={() => this.deleteItem(id)}
                onCancel={() => this.hideAlert()}
                focusCancelBtn>
                Kalau udah dihapus, enggak bakal balik lagi.
            </SweetAlert>
        );
        this.setState({
            alert: getAlert()
        });
    }

    deleteItem(id) {
        axios.delete(`/api/article/delete/${id}`).then(response => {
            var msg = response.data.success;
            if (msg == true) {
                this.hideAlert();
                this.goToHome();
            }
        })
    }

    goToHome() {
        const getAlert = () => (
            <SweetAlert
                success
                title="Success!"
                onConfirm={() => this.onSuccess()}
                onCancel={this.hideAlert()}
                timeOut={2000}
                confirmBtnText="Oke Siap"
            >
                Deleted article successfully
            </SweetAlert>
        )
        this.setState({
            alert: getAlert()
        });
    }

    onSuccess() {
        this.componentDidMount();
        this.hideAlert();
    }

    renderArticleList() {
        const { data, current_page, per_page, total, from } = this.state.data;
        // const articles = data;
        return (
            <React.Fragment>
                <tbody>
                    {data.map((article, i) => (
                        <tr key={i}>
                            <td width="50" className="text-center">{i + from}</td>
                            <td>{article.title}</td>
                            <td width="200" className="text-center">
                                <div className="btn-group">
                                    <Link
                                        className='btn btn-primary'
                                        to={`/article/${article.id}`}>
                                        Detail
                                    </Link>
                                    <Link
                                        className='btn btn-success'
                                        to={`/article/edit/${article.id}`}>
                                        Edit
                                    </Link>
                                    <button
                                        className='btn btn-danger'
                                        onClick={() => this.confirmDelete(article.id)}>
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}

                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={3}>
                            <Pagination
                                activePage={current_page}
                                totalItemsCount={total}
                                itemsCountPerPage={per_page}
                                onChange={(pageNumber) => this.getData(pageNumber)}
                                itemClass='page-item'
                                linkClass='page-link'
                                firstPageText='First'
                                lastPageText='Last'
                            />
                        </td>
                    </tr>
                </tfoot>
            </React.Fragment>
        )
    }
    render() {
        const { data } = this.state
        return (
            <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header'>All Article</div>
                            <div className='card-body'>
                                <Link className='btn btn-primary btn-sm mb-3' to='/create'>
                                    Create new article
                                </Link>
                                <div className='table-responsive'>
                                    <table className='table table-bordered table-hover'>
                                        <thead>
                                            <tr>
                                                <th width="50" className="text-center">No</th>
                                                <th>Title</th>
                                                <th width="200" className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        {data && this.renderArticleList()}
                                    </table>
                                    {this.state.alert}

                                    {/* <Pagination changePage={this.getData} data={data}/> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}