const rootPath = process.env.NODE_ENV === 'production' ? '/planet-tab' : '..'
const Earth= {
    shininess: 25,
    bumpScale: 0.002,
    cloud: `${rootPath}/images/fair_clouds_4k.png`,
    bumpMap: `${rootPath}/images/earth_bump_4k.jpg`,
    map: `${rootPath}/images/earth_no_clouds_4k.jpg`,
    specularMap: `${rootPath}/images/earth_water_4k.png`,
    originalRotationY: 350,
    light: {
        x: -2,
        y: 3,
        z: [0, 5],
        intensity: 1
    },
    camera: {
        x: 0,
        y: 0,
        z: [1.51, 1.5]
    },
    degrees: -23.4
}
export default Earth