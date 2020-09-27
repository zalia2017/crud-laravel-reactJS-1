import React from 'react'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'

const hasActive = (props) => {
    return props.active
}
const setActive = () => {

}
const Header = () => (
    <nav className='navbar navbar-dark navbar-expand-lg bg-dark fixed-top'>
        <div className='container'>
            <Link className='navbar-brand' to='/'>Zalia</Link>
            <button className='navbar-toggler' type='button' data-toggle='collapse'
             data-target='#navbarNavAltMarkup' aria-controls='navbarNavAltMarkup'
              aria-expanded='false' aria-label='Toggle navigation'>
                  <span className='navbar-toggler-icon'></span>
              </button>
            <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
                <div className='navbar-nav'>
                    <NavLink
                        exact
                        activeClassName='nav-item nav-link active'
                        className='nav-item nav-link'
                        to='/'
                    >
                        Home
                    </NavLink>
                    <NavLink
                        exact
                        activeClassName='nav-item nav-link active'
                        className='nav-item nav-link'
                        to='/Gallery'
                    >
                        Gallery
                    </NavLink>
                    <NavLink
                        exact
                        activeClassName='nav-item nav-link active'
                        className='nav-item nav-link'
                        to='/Facilities'
                    >
                        Facilities
                    </NavLink>
                </div>
            </div>
        </div>
    </nav>
)
export default Header
