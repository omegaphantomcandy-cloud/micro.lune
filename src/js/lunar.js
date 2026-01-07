// Reuse the same interactive functionality from FDM farm
// Table of Contents functionality
document.addEventListener('DOMContentLoaded', () => {
    initTableOfContents();
    initProgressBar();
    init3DVisualizations();
    initCharts();
});

// Table of Contents (same as fdm-farm.js)
function initTableOfContents() {
    const tocLinks = document.querySelectorAll('.toc-link');
    const sections = document.querySelectorAll('.section');
    const tocToggle = document.getElementById('tocToggle');
    const tocMobileToggle = document.getElementById('tocMobileToggle');
    const toc = document.getElementById('toc');

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

    tocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });

                if (window.innerWidth <= 1024) {
                    toc.classList.remove('active');
                }
            }
        });
    });

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

// 3D Visualizations
function init3DVisualizations() {
    createHeroVisual();
    createOverviewVisual();
    createChallengeVisual();
    createSolutionVisual();
    createFeaturesVisual();
    createTechnologyVisual();
    createNFCVisual();
    createDesignVisual();
    createFulfillmentVisual();
    createResultsVisual();
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

    // Create cyberpunk-style geometric shapes
    const geometry = new THREE.IcosahedronGeometry(1.5, 0);
    const material = new THREE.MeshPhongMaterial({
        color: 0x00d4ff,
        emissive: 0x0099ff,
        emissiveIntensity: 0.3,
        wireframe: false,
        transparent: true,
        opacity: 0.8
    });
    const mesh = new THREE.Mesh(geometry, material);

    // Add wireframe overlay
    const wireframe = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(
        wireframe,
        new THREE.LineBasicMaterial({ color: 0x00d4ff, linewidth: 2 })
    );
    mesh.add(line);

    scene.add(mesh);

    // Add orbiting smaller shapes
    const smallGeometry = new THREE.OctahedronGeometry(0.3, 0);
    for (let i = 0; i < 5; i++) {
        const smallMesh = new THREE.Mesh(
            smallGeometry,
            new THREE.MeshPhongMaterial({
                color: 0xff00ff,
                emissive: 0xff00ff,
                emissiveIntensity: 0.5
            })
        );
        const angle = (i / 5) * Math.PI * 2;
        smallMesh.position.x = Math.cos(angle) * 3;
        smallMesh.position.z = Math.sin(angle) * 3;
        scene.add(smallMesh);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00d4ff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 6;

    function animate() {
        requestAnimationFrame(animate);
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.01;

        scene.children.forEach((child, i) => {
            if (child.geometry && child.geometry.type === 'OctahedronGeometry') {
                child.rotation.y += 0.02;
                child.position.y = Math.sin(Date.now() * 0.001 + i) * 0.5;
            }
        });

        renderer.render(scene, camera);
    }
    animate();
}

function createOverviewVisual() {
    const container = document.getElementById('overviewVisual');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // E-commerce cart visualization
    const cartGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cartMaterial = new THREE.MeshPhongMaterial({ color: 0x00d4ff });
    const cart = new THREE.Mesh(cartGeometry, cartMaterial);
    scene.add(cart);

    // Add edges
    const edges = new THREE.EdgesGeometry(cartGeometry);
    const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: 0xffffff })
    );
    cart.add(line);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    camera.position.z = 4;

    function animate() {
        requestAnimationFrame(animate);
        cart.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();
}

function createChallengeVisual() {
    const container = document.getElementById('challengeVisual');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Puzzle pieces representing complexity
    const pieceCount = 4;
    for (let i = 0; i < pieceCount; i++) {
        const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.2);
        const material = new THREE.MeshPhongMaterial({
            color: [0xff4444, 0xffaa00, 0x00d4ff, 0xff00ff][i]
        });
        const piece = new THREE.Mesh(geometry, material);

        const angle = (i / pieceCount) * Math.PI * 2;
        piece.position.x = Math.cos(angle) * 1.5;
        piece.position.y = Math.sin(angle) * 1.5;
        piece.userData.angle = angle;

        scene.add(piece);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);

        scene.children.forEach((child, i) => {
            if (child.geometry) {
                child.rotation.z += 0.01;
                const time = Date.now() * 0.001;
                child.position.x = Math.cos(child.userData.angle + time * 0.5) * 1.5;
                child.position.y = Math.sin(child.userData.angle + time * 0.5) * 1.5;
            }
        });

        renderer.render(scene, camera);
    }
    animate();
}

function createSolutionVisual() {
    const container = document.getElementById('solutionVisual');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Connected nodes representing integrated solution
    const nodes = [];
    const nodeCount = 5;

    for (let i = 0; i < nodeCount; i++) {
        const geometry = new THREE.SphereGeometry(0.3, 16, 16);
        const material = new THREE.MeshPhongMaterial({
            color: 0x00d4ff,
            emissive: 0x0099ff,
            emissiveIntensity: 0.3
        });
        const node = new THREE.Mesh(geometry, material);

        const angle = (i / nodeCount) * Math.PI * 2;
        node.position.x = Math.cos(angle) * 2;
        node.position.y = Math.sin(angle) * 2;

        scene.add(node);
        nodes.push(node);
    }

    // Create connections
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const points = [nodes[i].position, nodes[j].position];
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({
                color: 0x00d4ff,
                transparent: true,
                opacity: 0.3
            });
            const line = new THREE.Line(geometry, material);
            scene.add(line);
        }
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    camera.position.z = 6;

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

function createFeaturesVisual() {
    const container = document.getElementById('featuresVisual');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Product showcase
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const material = new THREE.MeshPhongMaterial({
        color: 0xff00ff,
        emissive: 0xff00ff,
        emissiveIntensity: 0.2
    });
    const product = new THREE.Mesh(geometry, material);
    scene.add(product);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00d4ff, 1);
    pointLight.position.set(3, 3, 3);
    scene.add(pointLight);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        product.rotation.x += 0.005;
        product.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();
}

function createTechnologyVisual() {
    const container = document.getElementById('technologyVisual');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Tech stack layers
    const layers = [];
    for (let i = 0; i < 4; i++) {
        const geometry = new THREE.BoxGeometry(2, 0.3, 2);
        const material = new THREE.MeshPhongMaterial({
            color: 0x00d4ff,
            transparent: true,
            opacity: 0.7
        });
        const layer = new THREE.Mesh(geometry, material);
        layer.position.y = i * 0.6 - 1;

        const edges = new THREE.EdgesGeometry(geometry);
        const line = new THREE.LineSegments(
            edges,
            new THREE.LineBasicMaterial({ color: 0x00d4ff })
        );
        layer.add(line);

        scene.add(layer);
        layers.push(layer);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    camera.position.set(3, 2, 3);
    camera.lookAt(0, 0, 0);

    function animate() {
        requestAnimationFrame(animate);

        layers.forEach((layer, i) => {
            layer.rotation.y += 0.005 * (i + 1);
        });

        renderer.render(scene, camera);
    }
    animate();
}

function createNFCVisual() {
    const container = document.getElementById('nfcVisual');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // NFC chip visualization
    const chipGeometry = new THREE.CylinderGeometry(1, 1, 0.1, 32);
    const chipMaterial = new THREE.MeshPhongMaterial({
        color: 0xffaa00,
        emissive: 0xffaa00,
        emissiveIntensity: 0.3
    });
    const chip = new THREE.Mesh(chipGeometry, chipMaterial);
    scene.add(chip);

    // Signal waves
    const waves = [];
    for (let i = 0; i < 3; i++) {
        const waveGeometry = new THREE.TorusGeometry(1 + i * 0.5, 0.05, 16, 100);
        const waveMaterial = new THREE.MeshBasicMaterial({
            color: 0x00d4ff,
            transparent: true,
            opacity: 0.5 - i * 0.15
        });
        const wave = new THREE.Mesh(waveGeometry, waveMaterial);
        wave.rotation.x = Math.PI / 2;
        wave.position.y = 0.2;
        scene.add(wave);
        waves.push(wave);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    camera.position.set(2, 2, 3);
    camera.lookAt(0, 0, 0);

    function animate() {
        requestAnimationFrame(animate);

        chip.rotation.y += 0.01;

        waves.forEach((wave, i) => {
            wave.scale.x = 1 + Math.sin(Date.now() * 0.002 + i * 0.5) * 0.2;
            wave.scale.y = 1 + Math.sin(Date.now() * 0.002 + i * 0.5) * 0.2;
        });

        renderer.render(scene, camera);
    }
    animate();
}

function createDesignVisual() {
    const container = document.getElementById('designVisual');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // CAD design visualization
    const geometry = new THREE.DodecahedronGeometry(1.5, 0);
    const material = new THREE.MeshPhongMaterial({
        color: 0xff00ff,
        wireframe: true
    });
    const design = new THREE.Mesh(geometry, material);
    scene.add(design);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    camera.position.z = 4;

    function animate() {
        requestAnimationFrame(animate);
        design.rotation.x += 0.005;
        design.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();
}

function createFulfillmentVisual() {
    const container = document.getElementById('fulfillmentVisual');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Conveyor belt with packages
    const packages = [];
    for (let i = 0; i < 5; i++) {
        const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const material = new THREE.MeshPhongMaterial({ color: 0x00d4ff });
        const package = new THREE.Mesh(geometry, material);

        package.position.x = i * 1.2 - 2.4;
        package.position.y = 0;

        const edges = new THREE.EdgesGeometry(geometry);
        const line = new THREE.LineSegments(
            edges,
            new THREE.LineBasicMaterial({ color: 0xffffff })
        );
        package.add(line);

        scene.add(package);
        packages.push(package);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    camera.position.set(0, 2, 4);
    camera.lookAt(0, 0, 0);

    function animate() {
        requestAnimationFrame(animate);

        packages.forEach(package => {
            package.position.x += 0.02;
            if (package.position.x > 3) {
                package.position.x = -3;
            }
            package.rotation.y += 0.01;
        });

        renderer.render(scene, camera);
    }
    animate();
}

function createResultsVisual() {
    const container = document.getElementById('resultsVisual');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Success metrics visualization
    const bars = [];
    for (let i = 0; i < 4; i++) {
        const height = Math.random() * 2 + 1;
        const geometry = new THREE.BoxGeometry(0.4, height, 0.4);
        const material = new THREE.MeshPhongMaterial({
            color: 0x00ff88,
            emissive: 0x00ff88,
            emissiveIntensity: 0.2
        });
        const bar = new THREE.Mesh(geometry, material);
        bar.position.x = (i - 1.5) * 0.8;
        bar.position.y = height / 2 - 1;

        scene.add(bar);
        bars.push(bar);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    camera.position.set(3, 2, 3);
    camera.lookAt(0, 0, 0);

    function animate() {
        requestAnimationFrame(animate);

        bars.forEach((bar, i) => {
            bar.position.y += Math.sin(Date.now() * 0.001 + i) * 0.005;
        });

        renderer.render(scene, camera);
    }
    animate();
}

// Charts
function initCharts() {
    createDesignFlow();
}

function createDesignFlow() {
    const container = document.getElementById('designFlow');
    if (!container) return;

    container.innerHTML = `
        <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 12px; padding: 2rem; margin: 2rem 0;">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
                <div style="flex: 1; min-width: 120px; text-align: center; padding: 1rem; background: var(--bg-tertiary); border-radius: 8px;">
                    <div style="color: var(--accent-primary); font-weight: 600; margin-bottom: 0.5rem;">Consultation</div>
                    <div style="color: var(--text-tertiary); font-size: 0.85rem;">Vision Discussion</div>
                </div>
                <div style="color: var(--accent-primary); font-size: 1.5rem;">→</div>
                <div style="flex: 1; min-width: 120px; text-align: center; padding: 1rem; background: var(--bg-tertiary); border-radius: 8px;">
                    <div style="color: var(--accent-primary); font-weight: 600; margin-bottom: 0.5rem;">Concept</div>
                    <div style="color: var(--text-tertiary); font-size: 0.85rem;">Sketches & Mood Board</div>
                </div>
                <div style="color: var(--accent-primary); font-size: 1.5rem;">→</div>
                <div style="flex: 1; min-width: 120px; text-align: center; padding: 1rem; background: var(--bg-tertiary); border-radius: 8px;">
                    <div style="color: var(--accent-primary); font-weight: 600; margin-bottom: 0.5rem;">CAD Modeling</div>
                    <div style="color: var(--text-tertiary); font-size: 0.85rem;">3D Design & Iteration</div>
                </div>
                <div style="color: var(--accent-primary); font-size: 1.5rem;">→</div>
                <div style="flex: 1; min-width: 120px; text-align: center; padding: 1rem; background: var(--bg-tertiary); border-radius: 8px;">
                    <div style="color: var(--accent-primary); font-weight: 600; margin-bottom: 0.5rem;">Production</div>
                    <div style="color: var(--text-tertiary); font-size: 0.85rem;">Print & Delivery</div>
                </div>
            </div>
        </div>
    `;
}
