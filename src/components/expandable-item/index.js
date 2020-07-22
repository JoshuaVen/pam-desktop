import React from 'react'
import { useDispatch } from 'react-redux'

import { search_req, link_togg } from '../../containers/List/actions'

import { FaLink } from 'react-icons/fa'
import './ExpandableItem.css'



const ExpandableItem = (props) => {
    const anime = props.anime
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(search_req(anime.title))
        dispatch(link_togg())
    }
    return (
        <div className='expandable-item'
            onClick={handleClick}
        >
            <div className='expandable-item-icon'>
                <FaLink className='link' />
            </div>
            <div className='expandable-item-title'>
                <p>{props.anime.title}</p>
            </div>
        </div>
    )
}

export default ExpandableItem
