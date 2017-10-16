// Physics based on https://burakkanber.com/blog/modeling-physics-javascript-gravity-and-drag/

const Cd = 0.47;  // Dimensionless
const rho = 1.22; // kg / m^3

const ag = 9.81;  // m / s^2

export const calculateNewPositions = (bounds, sprites, fps) => {

    //calculate all new velocities due to gravity
    sprites.map(sprite => calculateNewPosition(sprite, fps));

    //calculate all collisions in current trajectories
    let collisions = getCollisions(bounds, sprites);

    //resolve each collision from first (shortest distance between colliding objects) to last, updating velocities and recalculating collisions where appropriate

    //resolve to newPosition
    return sprites.map(sprite => {return {...sprite, ...sprite.newPosition, newPosition:null}});
}

const calculateNewPosition = (sprite, fps)=>{

    let frameRate = 1 / fps;

// Drag force: Fd = -1/2 * Cd * A * rho * v * v
    let Fx = -0.5 * Cd * sprite.A * rho * sprite.velocity.x * sprite.velocity.x * sprite.velocity.x / Math.abs(sprite.velocity.x);
    let Fy = -0.5 * Cd * sprite.A * rho * sprite.velocity.y * sprite.velocity.y * sprite.velocity.y / Math.abs(sprite.velocity.y);

    Fx = (isNaN(Fx) ? 0 : Fx);
    Fy = (isNaN(Fy) ? 0 : Fy);

// Calculate acceleration ( F = ma )
    let ax = Fx / sprite.mass;
    let ay = ag + (Fy / sprite.mass);


    let newPosition = { velocity:{...sprite.velocity}, x: sprite.x, y: sprite.y };
// Integrate to get velocity
    newPosition.velocity.x += ax*frameRate;
    newPosition.velocity.y += ay*frameRate;

// Integrate to get position
    newPosition.x += sprite.velocity.x*frameRate*100;
    newPosition.y += sprite.velocity.y*frameRate*100;

    sprite.newPosition = newPosition;
}

const getCollisions = (bounds, sprites)=>{

    const{width, height} = bounds;
    for(let i=0;i<sprites.length;i++){
        let sprite = sprites[i];
        let newPosition = sprite.newPosition;
        // Handle collisions
        if (newPosition.y > height - sprite.radius) {
            newPosition.velocity.y *= sprite.restitution;
            newPosition.y = height - sprite.radius;
        }
        if (newPosition.x > width - sprite.radius) {
            newPosition.velocity.x *= sprite.restitution;
            newPosition.x = width - sprite.radius;
        }
        if (newPosition.x < sprite.radius) {
            newPosition.velocity.x *= sprite.restitution;
            newPosition.x = sprite.radius;
        }

        for(let j=0;j<sprites.length;j++){

        }

        sprite.newPosition = newPosition;
    }

}
