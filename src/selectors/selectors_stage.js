import { createSelector } from 'reselect'


export const stageWidthSelector = state => state.stage.width;
export const stageHeightSelector = state => state.stage.height;
export const stageBoundsSelector = state => {return { width: state.stage.width, height: state.stage.height}};
export const stageFPSSelector = state => state.stage.fps;
export const stageIsRunningSelector = state => state.stage.isRunning;


export const makeGetStageDimensions = () =>{
    return createSelector(
        [stageWidthSelector, stageHeightSelector],
        (width, height) => {
            return {width, height};
        }
    )
}

