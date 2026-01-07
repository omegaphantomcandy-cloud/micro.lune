// Table of Contents functionality
document.addEventListener('DOMContentLoaded', () => {
    initTableOfContents();
    initProgressBar();
    init3DVisualizations();
    initCharts();
});

// Table of Contents
function initTableOfContents() {
    const tocLinks = document.querySelectorAll('.toc-link');
    const sections = document.querySelectorAll('.section');
    const tocToggle = document.getElementById('tocToggle');
    const tocMobileToggle = document.getElementById('tocMobileToggle');
    const toc = document.getElementById('toc');

    // Intersection Observer for active section highlighting
    const observerOptions = {
        root: null,
        rootMargin: '-100px 0px -66%',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                tocLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Smooth scroll on click
    tocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });

                // Close mobile TOC
                if (window.innerWidth <= 1024) {
                    toc.classList.remove('active');
                }
            }
        });
    });

    // Mobile TOC toggle
    if (tocMobileToggle) {
        tocMobileToggle.addEventListener('click', () => {
            toc.classList.toggle('active');
        });
    }

    if (tocToggle) {
        tocToggle.addEventListener('click', () => {
            toc.classList.remove('active');
        });
    }

    // Close TOC when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
            if (!toc.contains(e.target) && !tocMobileToggle.contains(e.target)) {
                toc.classList.remove('active');
            }
        }
    });
}

// Progress Bar
function initProgressBar() {
    const progressBar = document.getElementById('progressBar');

    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;

        progressBar.style.width = `${progress}%`;
    });
}

// 3D Visualizations using Three.js
function init3DVisualizations() {
    // Hero Visual - Rotating 3D Printer Farm
    createHeroVisual();

    // Abstract Visual - Particle System
    createAbstractVisual();

    // Architecture Visual - Network Diagram
    createArchitectureVisual();

    // Hardware Visual - 3D Printer Model
    createHardwareVisual();

    // Software Visual - Code Flow
    createSoftwareVisual();

    // Orchestration Visual - Queue Animation
    createOrchestrationVisual();

    // Materials Visual - Material Properties
    createMaterialsVisual();

    // Quality Visual - Inspection Process
    createQualityVisual();

    // Performance Visual - Metrics Animation
    createPerformanceVisual();
}

function createHeroVisual() {
    const container = document.getElementById('heroVisual');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(400, 400);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create multiple printer representations
    const printerGroup = new THREE.Group();

    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 2;

        // Printer body
        const geometry = new THREE.BoxGeometry(0.4, 0.6, 0.4);
        const material = new THREE.MeshPhongMaterial({
            color: 0x00d4ff,
            emissive: 0x0099ff,
            emissiveIntensity: 0.2
        });
        const printer = new THREE.Mesh(geometry, material);

        printer.position.x = Math.cos(angle) * radius;
        printer.position.z = Math.sin(angle) * radius;

        // Add edges for wireframe effect
        const edges = new THREE.EdgesGeometry(geometry);
        const line = new THREE.LineSegments(
            edges,
            new THREE.LineBasicMaterial({ color: 0x00d4ff })
        );
        printer.add(line);

        printerGroup.add(printer);
    }

    scene.add(printerGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00d4ff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 5;
    camera.position.y = 2;
    camera.lookAt(0, 0, 0);

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        printerGroup.rotation.y += 0.005;
        renderer.render(scene, camera);
    }
    animate();
}

function createAbstractVisual() {
    const container = document.getElementById('abstractVisual');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Particle system representing data flow
    const particleCount = 100;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 10;
        positions[i + 1] = (Math.random() - 0.5) * 10;
        positions[i + 2] = (Math.random() - 0.5) * 10;

        velocities.push({
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02,
            z: (Math.random() - 0.5) * 0.02
        });
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        color: 0x00d4ff,
        size: 0.1,
        transparent: true,
        opacity: 0.6
    });

    const particleSystem = new THREE.Points(particles, material);
    scene.add(particleSystem);

    camera.position.z = 8;

    function animate() {
        requestAnimationFrame(animate);

        const positions = particleSystem.geometry.attributes.position.array;

        for (let i = 0; i < particleCount; i++) {
            const idx = i * 3;
            positions[idx] += velocities[i].x;
            positions[idx + 1] += velocities[i].y;
            positions[idx + 2] += velocities[i].z;

            // Boundary check
            if (Math.abs(positions[idx]) > 5) velocities[i].x *= -1;
            if (Math.abs(positions[idx + 1]) > 5) velocities[i].y *= -1;
            if (Math.abs(positions[idx + 2]) > 5) velocities[i].z *= -1;
        }

        particleSystem.geometry.attributes.position.needsUpdate = true;
        particleSystem.rotation.y += 0.001;

        renderer.render(scene, camera);
    }
    animate();
}

function createArchitectureVisual() {
    const container = document.getElementById('architectureVisual');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create network nodes
    const nodeGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const nodeMaterial = new THREE.MeshPhongMaterial({
        color: 0x00d4ff,
        emissive: 0x0099ff,
        emissiveIntensity: 0.3
    });

    const nodes = [];
    const nodeCount = 6;

    for (let i = 0; i < nodeCount; i++) {
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        const angle = (i / nodeCount) * Math.PI * 2;
        node.position.x = Math.cos(angle) * 3;
        node.position.y = Math.sin(angle) * 3;
        scene.add(node);
        nodes.push(node);
    }

    // Create connections
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.3
    });

    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const points = [nodes[i].position, nodes[j].position];
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(geometry, lineMaterial);
            scene.add(line);
        }
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    camera.position.z = 8;

    function animate() {
        requestAnimationFrame(animate);

        nodes.forEach((node, i) => {
            node.rotation.y += 0.01;
            node.position.y += Math.sin(Date.now() * 0.001 + i) * 0.01;
        });

        renderer.render(scene, camera);
    }
    animate();
}

function createHardwareVisual() {
    const container = document.getElementById('hardwareVisual');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Simplified 3D printer model
    const printerGroup = new THREE.Group();

    // Base
    const baseGeometry = new THREE.BoxGeometry(2, 0.2, 2);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -1;
    printerGroup.add(base);

    // Frame
    const frameGeometry = new THREE.BoxGeometry(0.1, 2, 0.1);
    const frameMaterial = new THREE.MeshPhongMaterial({ color: 0x00d4ff });

    const positions = [
        [-0.9, 0, -0.9],
        [0.9, 0, -0.9],
        [-0.9, 0, 0.9],
        [0.9, 0, 0.9]
    ];

    positions.forEach(pos => {
        const frame = new THREE.Mesh(frameGeometry, frameMaterial);
        frame.position.set(...pos);
        printerGroup.add(frame);
    });

    // Print bed
    const bedGeometry = new THREE.BoxGeometry(1.5, 0.1, 1.5);
    const bedMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 });
    const bed = new THREE.Mesh(bedGeometry, bedMaterial);
    bed.position.y = -0.5;
    printerGroup.add(bed);

    // Hotend
    const hotendGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 16);
    const hotendMaterial = new THREE.MeshPhongMaterial({
        color: 0xff4444,
        emissive: 0xff0000,
        emissiveIntensity: 0.5
    });
    const hotend = new THREE.Mesh(hotendGeometry, hotendMaterial);
    hotend.position.y = 0.5;
    printerGroup.add(hotend);

    scene.add(printerGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00d4ff, 1);
    pointLight.position.set(3, 3, 3);
    scene.add(pointLight);

    camera.position.set(3, 2, 3);
    camera.lookAt(0, 0, 0);

    function animate() {
        requestAnimationFrame(animate);
        printerGroup.rotation.y += 0.005;
        hotend.position.x = Math.sin(Date.now() * 0.002) * 0.5;
        renderer.render(scene, camera);
    }
    animate();
}

function createSoftwareVisual() {
    const container = document.getElementById('softwareVisual');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create flowing data streams
    const streamCount = 20;
    const streams = [];

    for (let i = 0; i < streamCount; i++) {
        const geometry = new THREE.BufferGeometry();
        const points = [];

        for (let j = 0; j < 50; j++) {
            points.push(new THREE.Vector3(
                (Math.random() - 0.5) * 10,
                j * 0.2 - 5,
                (Math.random() - 0.5) * 10
            ));
        }

        geometry.setFromPoints(points);

        const material = new THREE.LineBasicMaterial({
            color: 0x00d4ff,
            transparent: true,
            opacity: 0.3
        });

        const stream = new THREE.Line(geometry, material);
        stream.userData.speed = Math.random() * 0.05 + 0.02;
        scene.add(stream);
        streams.push(stream);
    }

    camera.position.z = 10;
    camera.position.y = 0;

    function animate() {
        requestAnimationFrame(animate);

        streams.forEach(stream => {
            stream.position.y -= stream.userData.speed;
            if (stream.position.y < -5) {
                stream.position.y = 5;
            }
        });

        renderer.render(scene, camera);
    }
    animate();
}

function createOrchestrationVisual() {
    const container = document.getElementById('orchestrationVisual');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Queue visualization
    const queueItems = [];
    const itemCount = 10;

    for (let i = 0; i < itemCount; i++) {
        const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const material = new THREE.MeshPhongMaterial({
            color: 0x00d4ff,
            transparent: true,
            opacity: 1 - (i / itemCount) * 0.7
        });

        const item = new THREE.Mesh(geometry, material);
        item.position.y = i * 0.7 - 3;
        item.userData.targetY = item.position.y;

        const edges = new THREE.EdgesGeometry(geometry);
        const line = new THREE.LineSegments(
            edges,
            new THREE.LineBasicMaterial({ color: 0x00d4ff })
        );
        item.add(line);

        scene.add(item);
        queueItems.push(item);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00d4ff, 1);
    pointLight.position.set(3, 3, 3);
    scene.add(pointLight);

    camera.position.z = 8;

    let processTimer = 0;

    function animate() {
        requestAnimationFrame(animate);

        processTimer++;

        // Simulate queue processing
        if (processTimer % 120 === 0) {
            queueItems.forEach((item, i) => {
                if (i === 0) {
                    item.userData.targetY = 5;
                    item.material.opacity = 0;
                } else {
                    item.userData.targetY -= 0.7;
                }
            });
        }

        queueItems.forEach((item, i) => {
            item.position.y += (item.userData.targetY - item.position.y) * 0.1;
            item.rotation.y += 0.01;

            // Reset item
            if (item.position.y > 4) {
                item.position.y = itemCount * 0.7 - 3;
                item.userData.targetY = item.position.y;
                item.material.opacity = 1 - (itemCount - 1) / itemCount * 0.7;
            }
        });

        renderer.render(scene, camera);
    }
    animate();
}

function createMaterialsVisual() {
    const container = document.getElementById('materialsVisual');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Material spools
    const materials = [
        { color: 0xff6b6b, name: 'PLA' },
        { color: 0x4ecdc4, name: 'PETG' },
        { color: 0xffe66d, name: 'ASA' },
        { color: 0xa8e6cf, name: 'TPU' }
    ];

    const spools = [];

    materials.forEach((mat, i) => {
        const geometry = new THREE.TorusGeometry(0.5, 0.2, 16, 32);
        const material = new THREE.MeshPhongMaterial({
            color: mat.color,
            shininess: 100
        });

        const spool = new THREE.Mesh(geometry, material);
        spool.position.x = (i - 1.5) * 1.5;
        spool.rotation.x = Math.PI / 2;

        scene.add(spool);
        spools.push(spool);
    });

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 5, 5);
    scene.add(pointLight);

    camera.position.z = 6;
    camera.position.y = 2;
    camera.lookAt(0, 0, 0);

    function animate() {
        requestAnimationFrame(animate);

        spools.forEach((spool, i) => {
            spool.rotation.z += 0.01 * (i + 1);
            spool.position.y = Math.sin(Date.now() * 0.001 + i) * 0.2;
        });

        renderer.render(scene, camera);
    }
    animate();
}

function createQualityVisual() {
    const container = document.getElementById('qualityVisual');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Scanning laser effect
    const partGeometry = new THREE.BoxGeometry(1.5, 2, 1.5);
    const partMaterial = new THREE.MeshPhongMaterial({
        color: 0x666666,
        transparent: true,
        opacity: 0.7
    });
    const part = new THREE.Mesh(partGeometry, partMaterial);
    scene.add(part);

    // Laser plane
    const laserGeometry = new THREE.PlaneGeometry(3, 3);
    const laserMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff88,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
    });
    const laser = new THREE.Mesh(laserGeometry, laserMaterial);
    laser.rotation.x = Math.PI / 2;
    laser.position.y = -1;
    scene.add(laser);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    camera.position.set(3, 2, 3);
    camera.lookAt(0, 0, 0);

    function animate() {
        requestAnimationFrame(animate);

        // Move laser up and down
        laser.position.y = Math.sin(Date.now() * 0.002) * 1.5;

        part.rotation.y += 0.005;

        renderer.render(scene, camera);
    }
    animate();
}

function createPerformanceVisual() {
    const container = document.getElementById('performanceVisual');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Animated bar chart
    const bars = [];
    const barCount = 5;

    for (let i = 0; i < barCount; i++) {
        const height = Math.random() * 3 + 1;
        const geometry = new THREE.BoxGeometry(0.4, height, 0.4);
        const material = new THREE.MeshPhongMaterial({
            color: 0x00d4ff,
            emissive: 0x0099ff,
            emissiveIntensity: 0.2
        });

        const bar = new THREE.Mesh(geometry, material);
        bar.position.x = (i - 2) * 0.8;
        bar.position.y = height / 2 - 2;
        bar.userData.targetHeight = height;
        bar.userData.baseY = bar.position.y;

        scene.add(bar);
        bars.push(bar);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00d4ff, 1);
    pointLight.position.set(3, 3, 3);
    scene.add(pointLight);

    camera.position.set(4, 2, 4);
    camera.lookAt(0, 0, 0);

    let updateTimer = 0;

    function animate() {
        requestAnimationFrame(animate);

        updateTimer++;

        // Update bar heights periodically
        if (updateTimer % 180 === 0) {
            bars.forEach(bar => {
                bar.userData.targetHeight = Math.random() * 3 + 1;
            });
        }

        bars.forEach(bar => {
            const currentHeight = bar.geometry.parameters.height;
            const newHeight = currentHeight + (bar.userData.targetHeight - currentHeight) * 0.05;

            bar.scale.y = newHeight / currentHeight;
            bar.position.y = bar.userData.baseY * (newHeight / currentHeight);
        });

        renderer.render(scene, camera);
    }
    animate();
}

// Charts and Graphs
function initCharts() {
    createUtilizationChart();
    createAccuracyGraph();
    createFinishGraph();
    createAlgorithmFlow();
}

function createUtilizationChart() {
    const container = document.getElementById('utilizationChart');
    if (!container) return;

    // Simple SVG bar chart
    const data = [
        { label: 'Printer Utilization', value: 89 },
        { label: 'Material Efficiency', value: 93 },
        { label: 'Queue Optimization', value: 87 },
        { label: 'Energy Efficiency', value: 78 }
    ];

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '300');
    svg.style.background = 'var(--bg-secondary)';
    svg.style.borderRadius = '12px';
    svg.style.border = '1px solid var(--border-color)';

    data.forEach((item, i) => {
        const y = i * 70 + 20;
        const barWidth = (item.value / 100) * 600;

        // Background bar
        const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        bgRect.setAttribute('x', '150');
        bgRect.setAttribute('y', y.toString());
        bgRect.setAttribute('width', '600');
        bgRect.setAttribute('height', '40');
        bgRect.setAttribute('fill', 'var(--bg-tertiary)');
        bgRect.setAttribute('rx', '4');
        svg.appendChild(bgRect);

        // Value bar
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', '150');
        rect.setAttribute('y', y.toString());
        rect.setAttribute('width', '0');
        rect.setAttribute('height', '40');
        rect.setAttribute('fill', 'url(#gradient)');
        rect.setAttribute('rx', '4');
        svg.appendChild(rect);

        // Animate
        setTimeout(() => {
            rect.setAttribute('width', barWidth.toString());
            rect.style.transition = 'width 1s ease-out';
        }, i * 200);

        // Label
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', '10');
        text.setAttribute('y', (y + 25).toString());
        text.setAttribute('fill', 'var(--text-secondary)');
        text.setAttribute('font-size', '14');
        text.textContent = item.label;
        svg.appendChild(text);

        // Value
        const valueText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        valueText.setAttribute('x', (760).toString());
        valueText.setAttribute('y', (y + 25).toString());
        valueText.setAttribute('fill', 'var(--accent-primary)');
        valueText.setAttribute('font-size', '16');
        valueText.setAttribute('font-weight', 'bold');
        valueText.textContent = `${item.value}%`;
        svg.appendChild(valueText);
    });

    // Gradient definition
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'gradient');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('x2', '100%');

    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('style', 'stop-color:#0099ff;stop-opacity:1');

    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('style', 'stop-color:#00d4ff;stop-opacity:1');

    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    svg.appendChild(defs);

    container.appendChild(svg);
}

function createAccuracyGraph() {
    const container = document.getElementById('accuracyGraph');
    if (!container) return;

    container.innerHTML = '<div style="width: 100%; height: 100px; background: var(--bg-tertiary); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--text-tertiary); font-size: 0.9rem;">±0.1mm tolerance visualization</div>';
}

function createFinishGraph() {
    const container = document.getElementById('finishGraph');
    if (!container) return;

    container.innerHTML = '<div style="width: 100%; height: 100px; background: var(--bg-tertiary); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--text-tertiary); font-size: 0.9rem;">Surface finish quality metrics</div>';
}

function createAlgorithmFlow() {
    const container = document.getElementById('algorithmFlow');
    if (!container) return;

    container.innerHTML = `
        <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 12px; padding: 2rem; margin: 2rem 0;">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
                <div style="flex: 1; min-width: 150px; text-align: center; padding: 1rem; background: var(--bg-tertiary); border-radius: 8px;">
                    <div style="color: var(--accent-primary); font-weight: 600; margin-bottom: 0.5rem;">Job Input</div>
                    <div style="color: var(--text-tertiary); font-size: 0.85rem;">Specifications & Requirements</div>
                </div>
                <div style="color: var(--accent-primary); font-size: 1.5rem;">→</div>
                <div style="flex: 1; min-width: 150px; text-align: center; padding: 1rem; background: var(--bg-tertiary); border-radius: 8px;">
                    <div style="color: var(--accent-primary); font-weight: 600; margin-bottom: 0.5rem;">Analysis</div>
                    <div style="color: var(--text-tertiary); font-size: 0.85rem;">Material & Capability Matching</div>
                </div>
                <div style="color: var(--accent-primary); font-size: 1.5rem;">→</div>
                <div style="flex: 1; min-width: 150px; text-align: center; padding: 1rem; background: var(--bg-tertiary); border-radius: 8px;">
                    <div style="color: var(--accent-primary); font-weight: 600; margin-bottom: 0.5rem;">Optimization</div>
                    <div style="color: var(--text-tertiary); font-size: 0.85rem;">Queue & Resource Allocation</div>
                </div>
                <div style="color: var(--accent-primary); font-size: 1.5rem;">→</div>
                <div style="flex: 1; min-width: 150px; text-align: center; padding: 1rem; background: var(--bg-tertiary); border-radius: 8px;">
                    <div style="color: var(--accent-primary); font-weight: 600; margin-bottom: 0.5rem;">Execution</div>
                    <div style="color: var(--text-tertiary); font-size: 0.85rem;">Printer Assignment & Monitoring</div>
                </div>
            </div>
        </div>
    `;
}
