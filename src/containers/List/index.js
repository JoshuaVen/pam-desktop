import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useInjectReducer } from '../../Utils/injectReducer'
import { useInjectSaga } from '../../Utils/injectSaga'

import listReducer, { searchReducer, linkReducer } from './reducers'
import * as actions from './actions'
import listSaga from './saga'

import Item from '../../components/item'
import ExpandableItem from '../../components/expandable-item'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import './List.css'

const List = props => {
    useInjectReducer({ key: 'list', reducer: listReducer })
    useInjectReducer({ key: 'search', reducer: searchReducer })
    useInjectReducer({ key: 'link', reducer: linkReducer })
    useInjectSaga({ key: 'listSaga', saga: listSaga })
    const list = useSelector(
        state => state.list
    )
    const dispatch = useDispatch()
    const [isLinkedExpanded, setLinkedExpanded] = useState(true)
    const [isNotLinkedExpanded, setNotLinkedExpanded] = useState(false)

    useEffect(() => {
        dispatch(actions.request())
        // eslint-disable-next-line
    }, [])

    const handleClickLinked = () => {
        setLinkedExpanded(!isLinkedExpanded)
    }

    const handleClickNotLinked = () => {
        setNotLinkedExpanded(!isNotLinkedExpanded)
    }

    return (
        <div className='list-main'>
            <div className='grouped'>
                <span className='grouped-span'>Linked</span>
                <div
                    className='grouped-icon'
                    onClick={handleClickLinked}
                >
                    {isLinkedExpanded ? <FaChevronUp className='icon up' /> : <FaChevronDown className='icon down' />}
                </div>
            </div>
            {list ? (
                <div className={'list linked' + (isLinkedExpanded ? '' : ' collapse')}>
                    {list.dledAnime.associatedDocs.map(
                        (anime, index) =>
                            <Item anime={anime} key={index} history={props.history} />
                    )}
                </div>
            ) : null}
            <div className='grouped'>
                <span className='grouped-span'>Unlinked</span>
                <div
                    className='grouped-icon'
                    onClick={handleClickNotLinked}
                >
                    {isNotLinkedExpanded ? <FaChevronUp className='icon up' /> : <FaChevronDown className='icon down' />}
                </div>
            </div>
            {list ? (
                <div className={'list notlinked' + (isNotLinkedExpanded ? '' : ' collapse')}>
                    {list.dledAnime.unAssociated.map(
                        (anime, index) =>
                            <ExpandableItem anime={anime} key={index} index={index} />
                    )}
                </div>
            ) : null}
        </div>
    )
}

export default List
