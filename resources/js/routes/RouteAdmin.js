import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Redirect, Route, Switch } from 'react-router-dom'
import HeaderAdmin from '../components/HeaderAdmin'
import SideBar from '../components/SideBar'
import Footer from '../components/Footer'
import ControlSideBar from '../components/ControlSideBar'
import ArticleIndex from '../pages/ArticleIndex'
import ArticleCreate from '../pages/ArticleCreate'
import ArticleShow from '../pages/ArticleShow'
import ArticleEdit from '../pages/ArticleEdit'
import GalleryIndex from '../pages/GalleryIndex'
import Login from '../pages/Login'

export default class RouteAdmin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: this.props.location.state.token
        }
    }
    componentDidMount() {
        if (this.state.token === undefined) {
            return (
                <Redirect to="/login" />
            )
        }
    }
    render() {
        return (
            <div>
                <HeaderAdmin token={this.state.token} />
                <Switch>
                    <Route exact path='/' component={(props) => <ArticleIndex {...props} token={this.state.token} />} />
                    <Route exact path='/create' component={(props) => <ArticleCreate {...props} token={this.state.token} />} />
                    <Route path='/article/edit/:id' component={(props) => <ArticleEdit {...props} token={this.state.token} />} />
                    <Route path='/article/:id' component={(props) => <ArticleShow {...props} token={this.state.token} />} />
                    <Route path='/Gallery/' component={GalleryIndex} />
                    <Route exact path='/login' component={Login} />
                </Switch>
                <SideBar />
                {/* <SampleContent /> */}
                <Footer />
                <ControlSideBar />
            </div>
        )
    }
}
