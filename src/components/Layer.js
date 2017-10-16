import React from 'react'
import {connect} from 'react-redux'
import {makeGetSprites} from '../selectors/selectors_sprite'
import Sprite from './Sprite'

const Layer = ({sprites}) => {
    return (
     <div className="layer">
         {sprites && sprites.map(sprite => <Sprite key={sprite.id} {...sprite} />)}
     </div>
    )
}

const makeMapStateToProps = () => {
    const getSprites = makeGetSprites();
    return (state, props) => {
        return {
            sprites: getSprites(state, props)
        }
    }
}

const mapDispatchToProps = {

}

export default connect(makeMapStateToProps, mapDispatchToProps)(Layer);