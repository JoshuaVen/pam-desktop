import React from 'react'
import { useSelector } from 'react-redux'

import useRequireAuth from '../../services/requireAuth'
import { useInjectReducer } from '../../Utils/injectReducer'
import loadable from '../../Utils/loadable'

import homeReducer from './reducer'
import Header from '../../components/header'
import LoadingComp from '../../components/loading-component/Loading'
const List = loadable(() => import(
    /* webpackPreload: true */ '../../containers/List'),
    { fallback: <LoadingComp /> }
)
// const AnimeLinking = loadable(() => import(
//     /* webpackPrefetch: true */'Client/Components/anime-linking'),
//     { fallback: <LoadingComp /> }
// )

const pages = [
    { title: 'Anime', description: 'All anime displayed that are added by the user' },
    { title: 'Completed', description: 'Titles that are finished watching' },
    { title: 'Currently Watching', description: 'Titles that are currently being watched' },
    { title: 'Plan To Watch', description: 'Titles that are to be watched' },
    { title: 'Downloaded', description: 'Titles that added to the local device for watching' },
]

const Home = (props) => {
    useRequireAuth()
    useInjectReducer({ key: 'home', reducer: homeReducer })
    const home = useSelector(
        state => state.home
    )
    // const isLinking = useSelector(
    // state => state.link.isLinking
    // )

    return (
        <div className='home'>
            {/*
                {this.props.isConnectedToMAL ? <SideNav /> : null}

                {this.props.form.isPopped ? <PopupForm /> : null}
                 */}
            {/* {isLinking ? <AnimeLinking /> : null} */}
            {home ? <Header pages={pages} currentActive={home.currentActive} /> : <div>loading...</div>}
            <List history={props.history} />
        </div>
    )
}

export default Home
