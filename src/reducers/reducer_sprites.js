import {ADD_SPRITE, PAUSE_SPRITE, UNPAUSE_SPRITE, DESTROY_SPRITE, DESTROY_ALL } from '../constants/constants_sprites'
import {STAGE_TICK, STAGE_RESET} from '../constants/constants_stage'
const INITIAL_STATE = { width: 500, height: 500, running:0, tick:0,  fps:1 };

export default  (state = INITIAL_STATE , action)=>{

    let newState = null;

    switch(action.type){

        case ADD_SPRITE:
            newState = {...state};
            newState[action.sprite.id] = action.sprite;
            return newState;


        case STAGE_TICK:
            newState = {...state};
            if(action.sprites) {
                action.sprites.map(sprite => newState[sprite.id] = sprite);
            }
            return newState;


        case STAGE_RESET:
            return {...INITIAL_STATE};

        default:
            return state;
    }
}
