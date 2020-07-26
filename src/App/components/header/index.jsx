import React from 'react';
import PropTypes from 'prop-types';
// import pkce from 'pkce-challenge'
import './Header.css';

const Header = (props) => {
  const { pages, currentActive } = props;
  return (
    <header>
      <div className="top-section">
        <div className="left-top">
          <h1 className="page-title">{pages[currentActive].title}</h1>
          <p className="page-description">{pages[currentActive].description}</p>
        </div>
      </div>
      <div className="bottom-section">
        {pages.map(
          (page, index) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className={index === currentActive ? 'page-selector active' : 'page-selector'}
              onClick={() => console.log('clicked')}
              role="presentation"
            >
              <p>{page.title}</p>
            </div>
          )
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  ).isRequired,
  currentActive: PropTypes.number.isRequired
};

export default Header;
