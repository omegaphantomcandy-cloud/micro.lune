// Home 3D Visualizations
// Requires three.js to be loaded in the page

document.addEventListener('DOMContentLoaded', () => {
    initHomeVisuals();
});

function initHomeVisuals() {
    // Luna/r - Moon Wireframe
    createHomeVisual('lunar', (scene) => {
        const geometry = new THREE.IcosahedronGeometry(2, 1);
        const material = new THREE.MeshBasicMaterial({
            color: 0x00d4ff,
            wireframe: true,
            transparent: true,
            opacity: 0.8
        });
        const moon = new THREE.Mesh(geometry, material);

        // Add subtle internal glow
        const glowGeo = new THREE.IcosahedronGeometry(1.5, 0);
        const glowMat = new THREE.MeshBasicMaterial({
            color: 0x00d4ff,
            transparent: true,
            opacity: 0.1
        });
        const glow = new THREE.Mesh(glowGeo, glowMat);
        moon.add(glow);

        scene.add(moon);
        return moon;
    });

    // FDM Farm - New 3D Printer Wireframe (replacing classic)
    createHomeVisual('fdm-farm', (scene) => {
        const group = new THREE.Group();

        // Printer Frame
        const frameGeo = new THREE.BoxGeometry(3, 3, 3);
        const frameMat = new THREE.MeshBasicMaterial({
            color: 0x00ff88,
            wireframe: true,
            transparent: true,
            opacity: 0.6
        });
        const frame = new THREE.Mesh(frameGeo, frameMat);
        group.add(frame);

        // Print Head
        const headGeo = new THREE.BoxGeometry(0.8, 0.5, 0.5);
        const headMat = new THREE.MeshBasicMaterial({ color: 0x00ff88, wireframe: true });
        const head = new THREE.Mesh(headGeo, headMat);
        head.position.y = 0.5;
        group.add(head);

        // Print Bed
        const bedGeo = new THREE.BoxGeometry(2.5, 0.1, 2.5);
        const bedMat = new THREE.MeshBasicMaterial({ color: 0x00ff88, wireframe: true });
        const bed = new THREE.Mesh(bedGeo, bedMat);
        bed.position.y = -1.4;
        group.add(bed);

        scene.add(group);
        return group;
    });

    // FabLab - Mechanical Arm / Tool
    createHomeVisual('fablab', (scene) => {
        const group = new THREE.Group();

        // Base
        const baseGeo = new THREE.CylinderGeometry(1, 1.2, 0.5, 8);
        const mat = new THREE.MeshBasicMaterial({
            color: 0xffaa00,
            wireframe: true,
            transparent: true,
            opacity: 0.8
        });
        const base = new THREE.Mesh(baseGeo, mat);
        base.position.y = -1;
        group.add(base);

        // Arm Segment
        const armGeo = new THREE.BoxGeometry(0.5, 2.5, 0.5);
        const arm = new THREE.Mesh(armGeo, mat);
        arm.position.y = 0.5;
        group.add(arm);

        // Joint
        const jointGeo = new THREE.SphereGeometry(0.6, 8, 8);
        const joint = new THREE.Mesh(jointGeo, mat);
        joint.position.y = 0.5;
        group.add(joint);

        scene.add(group);
        return group;
    });

    // Dream Frequency - Brain/Neuro Wireframe
    createHomeVisual('dream-frequency', (scene) => {
        const group = new THREE.Group();

        // Create a "brain-like" structure: Two lobes
        const particleCount = 40;
        const nodes = [];
        const nodeGeo = new THREE.IcosahedronGeometry(0.12, 0);
        const nodeMat = new THREE.MeshBasicMaterial({ color: 0xff00ff });

        // Left Lobe center (-0.8, 0, 0), Right Lobe center (0.8, 0, 0)
        // We will distribute points in two ellipsoids

        for (let i = 0; i < particleCount; i++) {
            const mesh = new THREE.Mesh(nodeGeo, nodeMat);

            // Randomly choose lobe
            const isLeft = Math.random() > 0.5;
            const centerX = isLeft ? -0.6 : 0.6;

            // Random point in unit sphere
            const u = Math.random();
            const v = Math.random();
            const theta = 2 * Math.PI * u;
            const phi = Math.acos(2 * v - 1);

            let x = Math.sin(phi) * Math.cos(theta);
            let y = Math.sin(phi) * Math.sin(theta);
            let z = Math.cos(phi);

            // Stretch to ellipsoid
            x *= 0.8;
            y *= 1.0;
            z *= 1.2;

            mesh.position.set(x + centerX, y, z);

            // Add jitter
            mesh.position.x += (Math.random() - 0.5) * 0.2;
            mesh.position.y += (Math.random() - 0.5) * 0.2;
            mesh.position.z += (Math.random() - 0.5) * 0.2;

            nodes.push(mesh);
            group.add(mesh);
        }

        // Create connections mostly within lobes, some across
        const lineMat = new THREE.LineBasicMaterial({
            color: 0xff00ff,
            transparent: true,
            opacity: 0.3
        });

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dist = nodes[i].position.distanceTo(nodes[j].position);
                // Connect close nodes (intra-lobe) and some further ones (inter-lobe if close enough)
                if (dist < 1.2) {
                    const points = [nodes[i].position, nodes[j].position];
                    const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
                    const line = new THREE.Line(lineGeo, lineMat);
                    group.add(line);
                }
            }
        }

        scene.add(group);
        return group;
    });
}

function createHomeVisual(projectType, sceneBuilder) {
    // Find the link container first to determine which project we are on
    // The structure is: <a> <div class="project-image"> <div class="project-placeholder"> ...

    // We need to match the project type to the specific link in the DOM.
    // Index.html structure: 
    // Luna/r -> href="lunar.html"
    // FDM -> href="fdm-farm.html"
    // FabLab -> href="fablab.html"
    // Dream -> href="dream-frequency.html"

    const linkMap = {
        'lunar': 'lunar.html',
        'fdm-farm': 'fdm-farm.html',
        'fablab': 'fablab.html',
        'dream-frequency': 'dream-frequency.html'
    };

    const linkHref = linkMap[projectType];
    const linkElement = document.querySelector(`a[href="${linkHref}"]`);

    if (!linkElement) {
        console.warn(`Link for ${projectType} not found`);
        return;
    }

    const container = linkElement.querySelector('.project-placeholder');
    if (!container) return;

    // Clear existing content (icons)
    container.innerHTML = '';
    container.style.overflow = 'hidden';
    container.style.width = '100%';
    container.style.height = '100%';

    // Init Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.offsetWidth / container.offsetHeight, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Build specific scene
    const activeObject = sceneBuilder(scene);

    // Position camera
    camera.position.z = 6;

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        // 360 Rotation
        if (activeObject) {
            activeObject.rotation.y += 0.01;
            activeObject.rotation.x += 0.005;
        }

        renderer.render(scene, camera);
    }

    animate();

    // Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
    });
}
