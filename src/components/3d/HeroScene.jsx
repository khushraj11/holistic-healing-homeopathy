import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    // Central orb
    const orbGeo = new THREE.SphereGeometry(1.2, 64, 64);
    const orbMat = new THREE.MeshStandardMaterial({
      color: 0x7a9e7e, emissive: 0x4a7a50,
      emissiveIntensity: 0.3, roughness: 0.2,
      metalness: 0.1, transparent: true, opacity: 0.85,
    });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    scene.add(orb);

    // Orbiting molecules
    const smallSpheres = [];
    const colors = [0xc9a84c, 0xa8c5a0, 0x7a9e7e, 0xe8c96a, 0x4a7a50, 0xfaf7f0, 0xc9a84c, 0xa8c5a0];
    for (let i = 0; i < 8; i++) {
      const geo = new THREE.SphereGeometry(0.12 + Math.random() * 0.1, 32, 32);
      const mat = new THREE.MeshStandardMaterial({
        color: colors[i], emissive: colors[i], emissiveIntensity: 0.5,
      });
      const sphere = new THREE.Mesh(geo, mat);
      const angle = (i / 8) * Math.PI * 2;
      const radius = 2.0 + Math.random() * 0.6;
      sphere.position.set(Math.cos(angle) * radius, (Math.random() - 0.5) * 1.5, Math.sin(angle) * radius);
      scene.add(sphere);
      smallSpheres.push({ mesh: sphere, angle, radius, speed: 0.004 + Math.random() * 0.003, yOffset: Math.random() * Math.PI * 2 });
    }

    // Ring
    const ringGeo = new THREE.TorusGeometry(2.2, 0.02, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0xc9a84c, transparent: true, opacity: 0.4 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    // Particles
    const particleGeo = new THREE.BufferGeometry();
    const count = 300;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) positions[i] = (Math.random() - 0.5) * 18;
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0xc9a84c, size: 0.05, transparent: true, opacity: 0.5 });
    scene.add(new THREE.Points(particleGeo, particleMat));

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const pl1 = new THREE.PointLight(0xc9a84c, 2, 10);
    pl1.position.set(3, 3, 3);
    scene.add(pl1);
    const pl2 = new THREE.PointLight(0x7a9e7e, 1.5, 8);
    pl2.position.set(-3, -2, 2);
    scene.add(pl2);

    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = Date.now() * 0.001;
      orb.rotation.y += 0.004;
      orb.rotation.x += 0.001;
      orb.position.y = Math.sin(t * 0.5) * 0.15;
      ring.rotation.z += 0.003;
      smallSpheres.forEach(s => {
        s.angle += s.speed;
        s.mesh.position.x = Math.cos(s.angle) * s.radius;
        s.mesh.position.z = Math.sin(s.angle) * s.radius;
        s.mesh.position.y = Math.sin(t + s.yOffset) * 0.6;
      });
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.3 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}