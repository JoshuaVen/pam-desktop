import React from "react";
import ReactDOM from "react-dom";
import Header from '../Header'
import { mount, shallow } from 'enzyme'
import { expect } from "chai";

let wrapped;

describe('Header Component', () => {

    beforeEach(() => {
        const state = {
            pages: [
                { title: 'Home', description: 'Site entrypoint' },
                { title: 'Status', description: 'Status' },
                { title: 'About', description: 'About the site' }
            ],
            currentActive: 0
        }
        wrapped = shallow(<Header pages={state.pages} currentActive={state.currentActive} />)
    })

    afterEach(() => {
        wrapped.unmount()
    })

    it('has top section', () => {
        expect(wrapped.find('.top-section').length).to.equal(1)
    })

    it('has bottom section', () => {
        expect(wrapped.find('.bottom-section').length).to.equal(1)
    })

    describe('Top Section Class', () => {
        let getTopSection;

        beforeEach(() => {
            getTopSection = () => wrapped.find('.top-section')
        })

        it('has page title', () => {
            const getTag = () => getTopSection().find('h1')
            expect(getTag().hasClass('page-title')).to.equal(true)
        })

        it('has page description', () => {
            const getTag = () => getTopSection().find('p')
            expect(getTag().hasClass('page-description')).to.equal(true)
        })
    })

    describe('Bottom Section Class', () => {
        let getBottomSection;

        beforeEach(() => {
            getBottomSection = () => wrapped.find('.bottom-section')
        })

        it('has navigation links', () => {
            expect(getBottomSection().children().length).to.equal(3)
        })

    })

})
