import React, {Component} from 'react'
import {connect} from 'react-redux'
import {makeGetStageDimensions, stageFPSSelector, stageIsRunningSelector} from '../selectors/selectors_stage'
import {tick} from '../actions/actions_stage'
import {addSprite} from '../actions/actions_sprite'
import Layer from './Layer'

class Stage extends Component {

    constructor(props) {
        super(props);

        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.cancelTick = this.cancelTick.bind(this);
        this.tick = this.tick.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.getMousePosition = this.getMousePosition.bind(this);

        this.state = {
            isRunning: false,
            mouseDown: null
        }
    }

    componentWillMount() {
        if (this.props.isRunning) {
            this.start();
        } else {
            this.stop();
        }
    }

    componentWillUpdate(newProps) {
        if (newProps.isRunning) {
            this.start();
        } else {
            this.stop();
        }
    }

    componentWillUnmount() {
        this.stop();
    }

    start() {
        if (!this.state.isRunning || this.state.fps !== this.props.fps) {
            this.cancelTick(); //make sure stopped
            this.cancelToken = setInterval(this.tick, 1000 / this.props.fps);
            this.setState({...this.state, isRunning: true, fps: this.props.fps});
        }
    }

    tick() {
        this.props.handleTick();
    }

    stop() {
        if (this.state.isRunning) {
            this.cancelTick();

            this.setState({...this.state, isRunning: false});
        }
    }

    cancelTick() {
        if (this.cancelToken)
            clearInterval(this.cancelToken);
    }

    getMousePosition(event) {
        let bounds = event.target.getBoundingClientRect();
        let x = event.clientX - bounds.left;
        let y = event.clientY - bounds.top;
        return {x: x, y: y};
    }

    onMouseDown(event) {
        event.preventDefault();

        let position = this.getMousePosition(event);
        this.setState({...this.state, mouseDown: position});
    }

    onMouseUp(event) {
        event.preventDefault();
        if (this.state.mouseDown) {
            let origin = this.state.mouseDown;
            let currentPosition = this.getMousePosition(event);
            let velocity = {
                x: (origin.x - currentPosition.x) / 10,
                y: (origin.y - currentPosition.y) / 10
            };

            this.setState({...this.state, mouseDown: null});
            this.props.handleAddSprite(origin.x, origin.y, velocity);
        }
    }

    render() {

        const {dimensions} = this.props;

        let style = {
            width: dimensions.width,
            height: dimensions.height
        };

        return (
            <div id="stage" style={style} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
                <Layer />
            </div>
        );
    }
}


const makeMapStateToProps = () => {
    const getDimensions = makeGetStageDimensions();
    return (state, props) => {
        return {
            dimensions: getDimensions(state, props),
            fps: stageFPSSelector(state, props),
            isRunning: stageIsRunningSelector(state, props)
        }
    }
}

const mapDispatchToProps = {
    handleTick: tick,
    handleAddSprite: addSprite
}

export default connect(makeMapStateToProps, mapDispatchToProps)(Stage);