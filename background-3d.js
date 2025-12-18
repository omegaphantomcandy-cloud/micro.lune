// Background 3D Animation - Whisper Security Style
// Subtle particle network with mouse interaction

document.addEventListener('DOMContentLoaded', () => {
    initBackground();
});

function initBackground() {
    const canvas = document.createElement('canvas');
    canvas.id = 'bg-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1'; // Behind everything
    canvas.style.opacity = '0.4'; // Subtle
    canvas.style.pointerEvents = 'none';
    document.body.prepend(canvas);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x1a2a3a, 0.001);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 150; // Not too many to keep it clean
    const posArray = new Float32Array(particleCount * 3);
    const velArray = new Float32Array(particleCount * 3); // Velocity

    for (let i = 0; i < particleCount * 3; i += 3) {
        // Spread wide
        posArray[i] = (Math.random() - 0.5) * 200; // x
        posArray[i + 1] = (Math.random() - 0.5) * 150; // y
        posArray[i + 2] = (Math.random() - 0.5) * 100; // z

        velArray[i] = (Math.random() - 0.5) * 0.05;
        velArray[i + 1] = (Math.random() - 0.5) * 0.05;
        velArray[i + 2] = (Math.random() - 0.5) * 0.05;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.8,
        color: 0x00ff88, // Accent color
        transparent: true,
        opacity: 0.6,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Lines (using LineSegments for performance)
    // We will update the geometry of lines every frame based on distance
    const linesMaterial = new THREE.LineBasicMaterial({
        color: 0x00ff88,
        transparent: true,
        opacity: 0.15
    });

    const linesGeometry = new THREE.BufferGeometry();
    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(linesMesh);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    // Target position for camera movement
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX) * 0.05;
        mouseY = (event.clientY - windowHalfY) * 0.05;
    });

    // Animate
    function animate() {
        requestAnimationFrame(animate);

        // Update particles
        const positions = particlesGeometry.attributes.position.array;

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] += velArray[i];
            positions[i + 1] += velArray[i + 1];
            positions[i + 2] += velArray[i + 2];

            // Boundary wrap around
            if (positions[i] > 100) positions[i] = -100;
            if (positions[i] < -100) positions[i] = 100;
            if (positions[i + 1] > 75) positions[i + 1] = -75;
            if (positions[i + 1] < -75) positions[i + 1] = 75;
            if (positions[i + 2] > 50) positions[i + 2] = -50;
            if (positions[i + 2] < -50) positions[i + 2] = 50;
        }

        particlesGeometry.attributes.position.needsUpdate = true;

        // Update lines
        updateLines(positions);

        // Smooth camera movement
        targetX = mouseX * 0.5;
        targetY = mouseY * 0.5;

        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (-targetY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    function updateLines(positions) {
        const linePositions = [];
        const connectionDistance = 25; // Threshold

        for (let i = 0; i < particleCount; i++) {
            const x1 = positions[i * 3];
            const y1 = positions[i * 3 + 1];
            const z1 = positions[i * 3 + 2];

            // Check only a subset to save performance
            for (let j = i + 1; j < particleCount; j++) {
                const x2 = positions[j * 3];
                const y2 = positions[j * 3 + 1];
                const z2 = positions[j * 3 + 2];

                const dx = x1 - x2;
                const dy = y1 - y2;
                const dz = z1 - z2;
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (dist < connectionDistance) {
                    linePositions.push(x1, y1, z1);
                    linePositions.push(x2, y2, z2);
                }
            }
        }

        linesMesh.geometry.dispose();
        linesMesh.geometry = new THREE.BufferGeometry();
        linesMesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    }

    animate();

    // Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
