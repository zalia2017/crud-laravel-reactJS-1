import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
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
    render() {
        return (
            <div>
                <HeaderAdmin />
                <Switch>
                    <Route exact path='/' component={ArticleIndex} />
                    <Route exact path='/create' component={ArticleCreate} />
                    <Route path='/article/edit/:id' component={ArticleEdit} />
                    <Route path='/article/:id' component={ArticleShow} />
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
