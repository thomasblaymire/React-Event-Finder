import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import Events from '../../components/Events/Events';
import Search from '../../components/Search/Search';
import Utility from '../../hoc/Utility/Utility';
import classes from './MusicFinder.scss';

import * as musicFinderActions from '../../store/actions/index';

class MusicFinder extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchTerm: '',
            error: false
        }
        this.updateInputValue = this.updateInputValue.bind(this)
    }

    componentWillMount() {
        console.log(this.props);
        this.props.onFetchEvents();
    }

    updateInputValue(evt) {
        this.setState({searchTerm: evt.target.value});
        this.onFetchEvents();  
    }

    handleEventClick() {
        console.log('Clicked');
    }

    render() {
 
        console.log('events are ' + this.props.evts);

        let events = null;

        if(this.props.evts) {
            events = (
                <Utility>
                    <Events
                        handleEventClick={this.handleEventClick}
                        events={this.props.evts}
                        inputChanged={this.searchUpdated} />
                </Utility>
            );
        }

        return (
            <Utility>
                <div className={classes.Header}>
                    <div className={classes.HeaderContainer}>
                        <h3 className={classes.HeaderTitle}>Searh the latest events around the wolrd.</h3>
                        <Search
                        onInputChange={this.updateInputValue}
                        searchTerm={this.state.searchTerm} />
                        <button className={classes.HeaderButton}>Search</button>
                    </div>
                </div>
                
                {events}
            </Utility>
        );
    }
}

const mapStateToProps = state => {
    return {
        evts: state.events,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchEvents: () => dispatch(musicFinderActions.fetchEvents())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MusicFinder, axios);