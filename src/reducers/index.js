import {combineReducers} from 'redux';
import reduceReducers from 'reduce-reducers';
import stage from './reducer_stage';
import sprites from './reducer_sprites'

const combinedReducer = combineReducers({
    stage,
    sprites
});

export default combinedReducer