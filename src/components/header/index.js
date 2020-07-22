import React from 'react';
// import pkce from 'pkce-challenge'
import './Header.css';

const Header = (props) => {
    return (
        <header>
            <div className='top-section'>
                <div className='left-top'>
                    <h1 className='page-title'>{props.pages[props.currentActive].title}</h1>
                    <p className='page-description'>{props.pages[props.currentActive].description}</p>
                </div>
            </div>
            <div className='bottom-section'>
                {props.pages.map(
                    (page, index) => (
                        <div
                            key={index}
                            className={index === props.currentActive ? 'page-selector active' : 'page-selector'}
                            onClick={() => console.log('clicked')}
                        >
                            <p>{page.title}</p>
                        </div>
                    )
                )}
            </div>
        </header>
    )
}

export default Header
