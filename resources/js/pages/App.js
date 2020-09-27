import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HeaderAdmin from '../components/HeaderAdmin'
import SideBar from '../components/SideBar'
import Footer from '../components/Footer'
import ControlSideBar from '../components/ControlSideBar'
import ArticleIndex from './ArticleIndex'
import ArticleCreate from './ArticleCreate'
import ArticleShow from './ArticleShow'
import ArticleEdit from './ArticleEdit'
import GalleryIndex from './GalleryIndex'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <HeaderAdmin />
                    <Switch>
                        <Route exact path='/' component={ArticleIndex} />
                        <Route exact path='/create' component={ArticleCreate} />
                        <Route path='/article/edit/:id' component={ArticleEdit} />
                        <Route path='/article/:id' component={ArticleShow} />
                        <Route path='/Gallery/' component={GalleryIndex} />
                    </Switch>
                    <SideBar />
                    {/* <SampleContent /> */}
                    <Footer />
                    <ControlSideBar />
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))
