import React from 'react'
import FontAwesome from 'react-fontawesome'
import {connect} from 'react-redux'
import {pause, reset, start} from '../actions/actions_stage'

const StageControls = ({handleStart, handlePause, handleReset})=>{
    return (
        <div className="stage-controls btn-group">
            <button className="btn" type="button" onClick={handlePause}><FontAwesome name="pause"/></button>
            <button className="btn" type="button" onClick={handleStart}><FontAwesome name="play"/></button>
            <button className="btn" type="button" onClick={handleReset}><FontAwesome name="recycle"/></button>
        </div>
    )
}

const mapDispatchToProps = {
    handleStart: start,
    handlePause: pause,
    handleReset: reset
}

export default connect(null, mapDispatchToProps)(StageControls);