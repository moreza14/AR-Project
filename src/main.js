import {loadGLTF} from "../libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {

    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: '../assets/targets/targets.mind',
      maxTrack: 2,
    });
    const {renderer, scene, camera} = mindarThree;

    const ambientLight = new THREE.AmbientLight( 0xffffff, 5 );
    scene.add( ambientLight );

    const dirLight = new THREE.DirectionalLight( 0xefefff, 1.5 );
    dirLight.position.set( 10, 10, 10 );
    scene.add( dirLight );

    const dirLightw = new THREE.DirectionalLight( 0xefefff, 1.5 );
    dirLightw.position.set( -5, -5, 10 );
    scene.add( dirLightw );

    const phase  = await loadGLTF("../assets/phase/phase.gltf");
    phase.scene.scale.set(50, 100, 100);
    phase.scene.position.set(0, 0, 0);

    const trap = await loadGLTF("../assets/trap/trap.gltf");
    trap.scene.scale.set(0.5, 0.5, 0.5);
    trap.scene.position.set(-0.4, -0.4, 0);

    const phaseAnchor = mindarThree.addAnchor(1);
    phaseAnchor.group.add(phase.scene);

    const trapAnchor = mindarThree.addAnchor(0);
    trapAnchor.group.add(trap.scene);

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
});
