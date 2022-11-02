<template>
    <main ref="planetContainerEl" class="inline-block"></main>
</template>
<script lang="ts" setup>
import anime from 'animejs'
import * as THREE from 'three'
import {onMounted, ref} from "vue";
import config from './earth.config'

interface IProps {
    width?: number
    height?: number
    rotationSpeed: number
}

const props = withDefaults(defineProps<IProps>(), {
    rotationSpeed: 0.001,
})
const planetContainerEl = ref<HTMLDivElement>()

class Planet {
    public fps = 60
    private rootScene: THREE.Scene

    get planetConfig():IPlanet.SphereConfig {
        return config
    }

    private sphereInstance: THREE.Mesh
    private createSphere() {
        const segments = 64
        const planet = this.planetConfig

        this.sphereInstance = new THREE.Mesh(
            new THREE.SphereGeometry(1, segments, segments),
            new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load(planet.map),
                bumpMap: new THREE.TextureLoader().load(planet.bumpMap!),
                bumpScale: planet.bumpScale,
                specularMap: new THREE.TextureLoader().load(planet.specularMap!),
                shininess: planet.shininess,
            })
        )

        this.sphereInstance.rotation.y = this.planetConfig.originalRotationY
        this.sphereInstance.rotateOnWorldAxis(new THREE.Vector3(0,0,1), THREE.MathUtils.degToRad(this.planetConfig.degrees || 0))

        this.rootScene.add(this.sphereInstance)
    }
    private cloudInstance: THREE.Mesh
    private createCloud(segments = 32) {
        const planet = this.planetConfig
        this.cloudInstance = new THREE.Mesh(
            new THREE.SphereGeometry(1.01, segments, segments),
            new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load(planet.cloud!),
                transparent: true,
            })
        )

        this.cloudInstance.rotateOnWorldAxis(new THREE.Vector3(0,0,1), THREE.MathUtils.degToRad(this.planetConfig.degrees || 0))

        this.rootScene.add(this.cloudInstance)
    }

    public static position = {
        top: {
            cameraPositionY: -1.15,
            cameraPositionZ: 2
        }
    }

    light: THREE.Light
    camera: THREE.Camera
    renderer: THREE.WebGLRenderer
    requestAnimationFrameId: number
    fadeInPlanetAnime: anime.AnimeInstance
    runAnimationFrame: () => void
    public init() {
        const el = planetContainerEl.value
        const width = props.width ?? window.innerWidth
        const height =  props.height ?? window.innerHeight

        this.renderer = new THREE.WebGLRenderer({ alpha: true })

        const scene = this.rootScene = new THREE.Scene()

        this.createSphere()
        this.createCloud()

        const cameraPosition = Planet.position.top
        const camera = this.camera = new THREE.PerspectiveCamera(50, width / height)
        camera.position.set(0, cameraPosition.cameraPositionY, cameraPosition.cameraPositionZ + 0.1)

        const light = this.light = new THREE.DirectionalLight(0xffffff, 1)
        light.position.set(-1,1,-2)
        scene.add(light)

        const clock = new THREE.Clock()
        let timeS = 0
        this.runAnimationFrame = () => {
            this.requestAnimationFrameId = requestAnimationFrame(this.runAnimationFrame)

            let T = clock.getDelta();
            timeS = timeS + T;

            if (timeS > 1 / this.fps) {
                this.renderer.render(scene, camera); //执行渲染操作

                this.cloudInstance?.rotateY(props.rotationSpeed)
                this.sphereInstance?.rotateY(props.rotationSpeed)

                timeS = 0;
            }
        }

        this.runAnimationFrame()

        const fadeInDuration = 800, fadeInEasing:anime.EasingOptions = 'linear'
        this.fadeInPlanetAnime = anime({
            x: -1, y: 1, z: 3,
            easing: fadeInEasing,
            targets: light.position,
            duration: fadeInDuration,
        })

        anime({
            easing: fadeInEasing,
            targets: camera.position,
            duration: fadeInDuration,
            z: cameraPosition.cameraPositionZ,
        })

        window.addEventListener('resize',  () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            this.renderer.setSize(window.innerWidth, window.innerHeight)
        })

        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(width, height)
        el?.appendChild(this.renderer.domElement)
    }
}

onMounted(() => new Planet().init());
</script>