import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
mesh.position.y = 1;
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)


// ANIMATION

const clock = new THREE.Clock()


gsap.to(mesh.position, { duration: 1, delay: 1, x: 2})

function tick() {


    //const elapsedTime = clock.getElapsedTime()
    //mesh.position.y =  Math.sin(elapsedTime)
    //mesh.position.x =  Math.cos(elapsedTime)
    renderer.render(scene, camera)

    console.log(tick);
    window.requestAnimationFrame(tick)
}

tick()