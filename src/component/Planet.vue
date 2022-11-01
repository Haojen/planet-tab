<template>
    <main ref="planetContainerEl" class="inline-block"></main>
</template>
<script lang="ts" setup>
import anime from 'animejs'
import * as THREE from 'three'
import {onMounted, ref} from "vue";
import config from './earth.config'

interface IProps {
    planet?: IPlanet.Planets
    width?: number
    height?: number
    autoResize: boolean
    rotationSpeed: number
    position: IPlanet.Position
    performance?: IConfigs.PlanetPerformance
}

const props = withDefaults(defineProps<IProps>(), {
    autoResize: true,
    rotationSpeed: 0.001,
    position: 'top',
    performance: "high",
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
        },
        center: {
            cameraPositionY: 0.6,
            cameraPositionZ: 4 // + 10
        },
        // When Search 、Weather、Dock bar widget is hidden
        center2: {
            cameraPositionY: 0.45,
            cameraPositionZ: 3.5
        },
        // 没有小部件的居中
        center3: {
            cameraPositionY: 0.25,
            cameraPositionZ: 3.5
        },
        // 专门为 setting 提供的预览配置
        absoluteCenter: {
            cameraPositionY: 0,
            cameraPositionZ: 4
        },
        bottom: {
            cameraPositionY: 1.15,
            cameraPositionZ: 2
        },
        bottom2: {
            cameraPositionY: 1,
            cameraPositionZ: 2
        }
    }
    public switchPosition() {
        const animateDuration = 600
        const animateEasing: anime.EasingOptions = 'easeOutCubic'

        const {cameraPositionY, cameraPositionZ} = this.getCameraPosition()

        anime({
            easing: animateEasing,
            duration: animateDuration,
            targets: this.camera.position,
            y: cameraPositionY,
            z: cameraPositionZ,
        })
    }

    public getCameraPosition() {
        return Planet.position[props.position]
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

        this.renderer = new THREE.WebGLRenderer({
            precision: 'lowp',
            powerPreference: 'low-power',
            alpha: true,
            antialias: true
        })

        const scene = this.rootScene = new THREE.Scene()
        scene.background = new THREE.Color(0x000)
        // scene.background = new THREE.TextureLoader().load('../images/stars-background.jpg')
        scene.background = new THREE.TextureLoader().load('../images/2k_stars.jpg')

        this.createSphere()
        this.createCloud()

        const cameraPosition = this.getCameraPosition()
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

        props.autoResize && window.addEventListener('resize',  () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            this.renderer.setSize(window.innerWidth, window.innerHeight)
        })

        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(width, height)
        el.appendChild(this.renderer.domElement)
    }
}

onMounted(() => {
    const planetInstance = new Planet()
    planetInstance.init()

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
            cancelAnimationFrame(planetInstance.requestAnimationFrameId)
            return
        }

        if (document.visibilityState === 'visible') {
            if (planetInstance.renderer.getContext().isContextLost()) {
                window.location.reload()
            }
            else {
                planetInstance.runAnimationFrame()
            }
        }
    })
});
</script>