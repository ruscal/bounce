import { createSelector } from 'reselect'

export const stageSpriteIdsSelector = state => state.stage.sprites;
export const spritesSelector = state => state.sprites;
export const stageSpritesSelector = (state)=>{
    return state.stage.sprites ? state.stage.sprites.map(id => state.sprites[id]) : [];
}

export const makeGetSprites = () =>{
    return createSelector(
        [spritesSelector, stageSpriteIdsSelector],
        (sprites, ids) => {
            return ids.map(id => sprites[id]);
        }
    )
}