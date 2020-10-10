import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { useHistory, Route, Switch, Redirect } from 'react-router-dom'
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
        this.state = ({
            token: localStorage.getItem('accessToken')
        })
    }
    render() {
        if (this.state.token == null) {
            return <Redirect to='/login'/>
        } else {

            return (
                <div>
                    <HeaderAdmin token={this.state.token} />
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
}
