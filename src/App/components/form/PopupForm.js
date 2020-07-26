import React from 'react';
import { connect } from 'react-redux'
import { undoForm, addAnime } from 'Client/JS/Actions/index'
import './PopupForm.css';

class PopupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }

        this.escFunction = this.escFunction.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.addAnime(this.state.value)
        this.props.undoForm()
        this.setState({ value: '' })
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        })
    }

    escFunction(event) {
        if (event.keyCode === 27) {
            this.props.undoForm()
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.escFunction);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.escFunction);
    }

    render() {
        return (
            <div className='popup'>
                <div className='popup-inner'>
                    <h1>Add anime form xD</h1>
                    <form
                        className='add-form'
                        onSubmit={this.handleSubmit}
                    >
                        <input
                            className='input-text'
                            type='text'
                            placeholder='Search for anime to add to the list'
                            size='43'
                            onChange={this.handleChange}
                        />
                        <input
                            className='input-button'
                            type='submit'
                            value="submit"
                        />
                    </form>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        undoForm: form => dispatch(undoForm(form)),
        addAnime: anime => dispatch(addAnime(anime))
    }
}

export default connect(null, mapDispatchToProps)(PopupForm);
