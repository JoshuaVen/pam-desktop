import React from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import { Link } from 'react-router-dom'

import './header.css'

const tokenSelector = createSelector(
    state => state.auth,
    auth => auth.token
)

const Header = React.memo(() => {
    const token = useSelector(tokenSelector)
    return (
        <div className='header-body'>
            <Link className='PAManager' to='/'>PAManager</Link>
            <div className='connect'>
                <Link to='/auth'>Connect To MAL</Link>
                {token ?
                    (<Link to='/signout'>Sign Out</Link>) :
                    (<Link to='/signin'>Sign In</Link>)}
            </div>
        </div>
    )
})

export default Header
