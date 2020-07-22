// eslint-disable-next-line
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

const useRequireAuth = (props) => {
    const authToken = useSelector(
        state => state.auth.token
    )
    const history = useHistory()
    const shouldNavigateAway = () => {
        if (!authToken) {
            history.push('/signin')
        }
    }

    useEffect(() => {
        shouldNavigateAway()
        // eslint-disable-next-line
    }, [])
}

export default useRequireAuth

// export default ChildComponent => {
//     class ComposedComponent extends React.Component {
//         componentDidMount() {
//             this.shouldNavigateAway()
//         }

//         componentDidUpdate() {
//             this.shouldNavigateAway()
//         }

//         shouldNavigateAway() {
//             if (!this.props.auth) {
//                 this.props.history.push('/signin')
//             }
//         }

//         render() {
//             return <ChildComponent {...this.props} />
//         }
//     }

//     const mapStateToProps = state => {
//         return {
//             auth: state.authReducer.token
//         }
//     }

//     return hoistNonReactStatics(connect(mapStateToProps)(ComposedComponent), ChildComponent)
// }
