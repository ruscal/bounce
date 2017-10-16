import {STAGE_START, STAGE_TICK, STAGE_RESET, STAGE_PAUSE} from '../constants/constants_stage'
import {stageSpritesSelector} from '../selectors/selectors_sprite'
import {stageBoundsSelector, stageFPSSelector} from '../selectors/selectors_stage'
import {copy} from '../utils/common'
import {calculateNewPositions} from '../physicsEngine'

export const start = ()=>{
    return {
        type:STAGE_START
    }
}

export const pause = ()=>{
    return {
        type:STAGE_PAUSE
    }
}

export const reset = ()=>{
    return {
        type:STAGE_RESET
    }
}

export const tick = ()=>(dispatch, getState) => {
    let state = getState();
    let bounds = stageBoundsSelector(state);
    let fps = stageFPSSelector(state);
    let sprites = calculateNewPositions(bounds, copy(stageSpritesSelector(state)), fps);

    return dispatch({
        type:STAGE_TICK,
        sprites
    });
}
