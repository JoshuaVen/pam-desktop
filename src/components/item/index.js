import React, { useState } from 'react'
import './Item.css'
import './item-advance.css'
import './item-default.css'
import { FaCheck, FaUnlink, FaPlay, FaInfo, FaAngleRight } from 'react-icons/fa'

const Item = (props) => {
    const [isOpen, setOpen] = useState(false)

    const handleClick = () => {
        setOpen(!isOpen)
    }

    const genres = props.anime.genre.map((g, index) =>
        <span className='genre-span' key={index}>{g.name}</span>
    )

    return (
        <div className={'item' + (isOpen ? ' advance' : '')} onClick={handleClick}>
            <div className={'item-title' + (isOpen ? ' hide' : '')}>
                <span className='span-title'>{props.anime.title}</span>
            </div>
            <img className='item-image' src={'http://localhost:8080/' + props.anime.offline_img} alt='Anime Poster' />
            <div className={'item-genre'}>
                {genres}
            </div>
            <div className='item-default'>
                <div
                    className='item-default-icon'
                >
                    <FaCheck className={'check'} />
                    <FaAngleRight className={'extend'} />
                </div>
                <div className={'item-advance' + (isOpen ? '' : ' hide')}>
                    <div className={'item-advance-icon' + (isOpen ? '' : ' hide')}>
                        <FaUnlink className='advance-icon' />
                    </div>
                    <div className={'item-advance-icon' + (isOpen ? '' : ' hide')}>
                        <FaPlay className='advance-icon' />
                    </div>
                    <div className={'item-advance-icon' + (isOpen ? '' : ' hide')}
                        onClick={() => this.props.history.push(
                            '/anime?mal_id=' + props.anime.mal_id
                        )}
                    >
                        <FaInfo className='advance-icon' />
                    </div>

                </div>
                <div className={'item-default-premier' + (isOpen ? ' hide' : '')}>
                    <span className='year-span'>Year Premiered: {props.anime.premier_year}</span>
                </div>
            </div>
        </div>
    )

}

export default Item
