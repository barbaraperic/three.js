import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */

// SPHERE
const sphereGeometry = new THREE.SphereGeometry(1, 16, 16)
const sphereMaterial = new THREE.MeshBasicMaterial({
  color: 0xffff00,
  wireframe: true,
})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.position.x = 2

// PLANE
const planeGeometry = new THREE.PlaneGeometry(1, 1)
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffff00,
  side: THREE.DoubleSide,
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)

// TORUS
const torusGeometry = new THREE.TorusGeometry(1, 0.3, 5, 100)
const torusMaterial = new THREE.MeshBasicMaterial({
  color: 0xffff00,
  wireframe: true,
})
const torus = new THREE.Mesh(torusGeometry, torusMaterial)
torus.position.x = -2

// SCENE
scene.add(torus)
scene.add(sphere)
scene.add(plane)

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
