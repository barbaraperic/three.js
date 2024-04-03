import * as THREE from 'three'
import gsap from 'gsap'

// Mouse

const cursor = {
  x: 0,
  y: 0,
}

window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / sizes.width - 0.5
  cursor.y = -(event.clientY / sizes.height - 0.5)
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
mesh.position.y = 0
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
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
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)

// ANIMATION

const clock = new THREE.Clock()

// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2})

function tick() {
  //const elapsedTime = clock.getElapsedTime()
  //mesh.position.y =  Math.sin(elapsedTime)
  //mesh.position.x =  Math.cos(elapsedTime)
  camera.position.x = cursor.x * 3
  camera.position.y = cursor.y * 3
  renderer.render(scene, camera)

  //   window.requestAnimationFrame(tick)
}

tick()
