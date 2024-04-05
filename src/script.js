import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

const gui = new GUI()

const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = () => {
  console.log('on start')
}

loadingManager.onLoad = () => {
  console.log('on load')
}

loadingManager.onProgress = () => {
  console.log('on progress')
}

loadingManager.onError = () => {
  console.log('on error')
}

const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load('/textures/door/color.jpg')
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const ambientTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const metalTexture = textureLoader.load('/textures/door/metalness.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const roughTexture = textureLoader.load('/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/3.png')
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')

colorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// const material = new THREE.MeshBasicMaterial()
// material.map = colorTexture
// material.side = THREE.DoubleSide
// material.color = new THREE.Color('skyblue')
// material.transparent = true
// material.alphaMap = 0.5

// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// const material = new THREE.MeshDepthMaterial()

// const material = new THREE.MeshLambertMaterial()
// add light

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff )

// const material = new THREE.MeshToonMaterial()
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false // for performace
// material.gradientMap = gradientTexture

// const material = new THREE.MeshStandardMaterial()
// material.metalness = 1
// material.roughness = 1
// material.map = colorTexture
// material.aoMap = ambientTexture
// material.aoMapIntensity = 1
// material.displacementMap = heightTexture
// material.displacementScale = 0.1
// material.metalnessMap = metalTexture
// material.roughnessMap = metalTexture
// material.normalMap = normalTexture
// material.transparent = true
// material.alphaMap = alphaTexture

// gui.add(material, 'metalness').min(0).max(1).step(0.0001)
// gui.add(material, 'roughness').min(0).max(1).step(0.0001)

const material = new THREE.MeshPhysicalMaterial()
material.metalness = 0
material.roughness = 0
// material.map = colorTexture
// material.aoMap = ambientTexture
// material.aoMapIntensity = 1
// material.displacementMap = heightTexture
// material.displacementScale = 0.1
// material.metalnessMap = metalTexture
// material.roughnessMap = metalTexture
// material.normalMap = normalTexture
// material.transparent = true
// material.alphaMap = alphaTexture

// gui.add(material, 'metalness').min(0).max(1).step(0.0001)
// gui.add(material, 'roughness').min(0).max(1).step(0.0001)

// material.clearcoat = 1
// material.clearcoatRoughness = 0

// gui.add(material, 'clearcoat').min(0).max(1).step(0.0001)
// gui.add(material, 'clearcoatRoughness').min(0).max(1).step(0.0001)

// material.sheen = 1
// material.sheenRoughness = 0.25
// material.sheenColor.set(1, 1, 1)

// gui.add(material, 'sheen').min(0).max(1).step(0.0001)
// gui.add(material, 'sheenRoughness').min(0).max(1).step(0.0001)

// material.iridescence = 1
// material.iridescenceIOR = 1
// material.iridescenceThicknessRange = [100, 800]

// gui.add(material, 'iridescence').min(0).max(1).step(0.0001)
// gui.add(material, 'iridescenceIOR').min(1).max(2.333).step(0.0001)
// gui.add(material.iridescenceThicknessRange, '0').min(0).max(1000).step(0.0001)
// gui.add(material.iridescenceThicknessRange, '1').min(1).max(1000).step(0.0001)

material.transmission = 1
material.ior = 1.5
material.thickness = 0.5

gui.add(material, 'transmission').min(0).max(1).step(0.0001)
gui.add(material, 'ior').min(1).max(10).step(0.0001)
gui.add(material, 'thickness').min(0).max(1).step(0.0001)

// SPHERE
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material)
sphere.position.x = 1.5

// PLANE
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material)

// TORUS

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  material
)
torus.position.x = -1.5

// SCENE
scene.add(torus, sphere, plane)

// const ambientLight = new THREE.AmbientLight(0xffffff, 1)
// scene.add(ambientLight)

// const pointLight = new THREE.PointLight(0xffffff, 30)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4

// scene.add(pointLight)

const rgbeLoader = new RGBELoader()
rgbeLoader.load('./textures/environmentMap/2k.hdr', (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping

  scene.background = environmentMap
  scene.environment = environmentMap
})

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
camera.position.z = 3
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

  sphere.rotation.y = 0.1 * elapsedTime
  plane.rotation.y = 0.1 * elapsedTime
  torus.rotation.y = 0.1 * elapsedTime

  sphere.rotation.x = -0.15 * elapsedTime
  plane.rotation.x = -0.15 * elapsedTime
  torus.rotation.x = -0.15 * elapsedTime

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
