import {ADD_SPRITE} from '../constants/constants_sprites'
import uniqueId from 'lodash.uniqueid'

export const addSprite = (x, y, velocity)=>{

    let radius = 15;

    let sprite = {
        id: uniqueId("sprite_"),
        x,
        y,
        velocity,
        radius,
        restitution: -0.7,
        mass: 0.1, //kg
        A: Math.PI * radius * radius / (10000) // m^2
    }

    return {
        type:ADD_SPRITE,
        sprite:sprite
    }
}