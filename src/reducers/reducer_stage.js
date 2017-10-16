import {STAGE_TICK, STAGE_START, STAGE_PAUSE, STAGE_RESET } from '../constants/constants_stage'
import {ADD_SPRITE} from'../constants/constants_sprites'
const INITIAL_STATE = { width: 500, height: 500, isRunning:true, tick:0,  fps:40, sprites:[] };

export default  (state = INITIAL_STATE , action)=>{
    switch(action.type){

        case STAGE_TICK:
            return {...state, tick: state.tick + 1};

        case STAGE_START:
            return {...state, isRunning:true}

        case STAGE_PAUSE:
            return {...state, isRunning:false}

        case STAGE_RESET:
            return {...state, sprites:[]}

        case ADD_SPRITE:
            return {...state, sprites:[...state.sprites, action.sprite.id]};

        default:
            return state;
    }
}
