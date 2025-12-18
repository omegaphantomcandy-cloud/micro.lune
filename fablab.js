// Table of Contents functionality
document.addEventListener('DOMContentLoaded', () => {
    initTableOfContents();
    initProgressBar();
    init3DVisualizations();
});

// Reuse generic TOC logic
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

function initProgressBar() {
    // Create progress bar if not exists (it might be in html? no, usually injected or existing. Check lunar.html... it wasn't in the snippet I saw. It might be in fdm-farm.css or specific html. 
    // Wait, lunar.js expects element with id 'progressBar'. I didn't add it to fablab.html. I should check if I missed it in fablab.html.
    // I didn't put it in fablab.html. So this might error if element missing. I'll add a check.)
    let progressBar = document.getElementById('progressBar');
    if (!progressBar) {
        // Create it dynamically
        progressBar = document.createElement('div');
        progressBar.id = 'progressBar';
        progressBar.style.position = 'fixed';
        progressBar.style.top = '0';
        progressBar.style.left = '0';
        progressBar.style.height = '4px';
        progressBar.style.backgroundColor = 'var(--color-accent-primary)';
        progressBar.style.zIndex = '1000';
        progressBar.style.width = '0%';
        progressBar.style.transition = 'width 0.1s';
        document.body.appendChild(progressBar);
    }

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
    createProjectsVisual();
    createInfraVisual();
    createImpactVisual();
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

    // Hero: A robotic arm segment or complex mechanism
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const material = new THREE.MeshPhongMaterial({
        color: 0x00d4ff,
        emissive: 0x0099ff,
        emissiveIntensity: 0.3,
        wireframe: true,
        transparent: true,
        opacity: 0.8
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Orbiting particles
    const particleGeo = new THREE.SphereGeometry(0.1, 8, 8);
    for (let i = 0; i < 8; i++) {
        const particle = new THREE.Mesh(
            particleGeo,
            new THREE.MeshBasicMaterial({ color: 0xff00ff })
        );
        const angle = (i / 8) * Math.PI * 2;
        particle.position.x = Math.cos(angle) * 2.5;
        particle.position.z = Math.sin(angle) * 2.5;
        particle.userData = { angle: angle, speed: 0.02 + Math.random() * 0.02 };
        scene.add(particle);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00d4ff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.01;

        scene.children.forEach(child => {
            if (child.geometry && child.geometry.type === 'SphereGeometry') {
                child.userData.angle += child.userData.speed;
                child.position.x = Math.cos(child.userData.angle) * 2.5;
                child.position.z = Math.sin(child.userData.angle) * 2.5;
                child.position.y = Math.sin(Date.now() * 0.002 + child.userData.angle) * 0.5;
            }
        });

        renderer.render(scene, camera);
    }
    animate();
}

function createOverviewVisual() {
    const container = document.getElementById('overviewVisual');
    if (!container) return; // Expecting #overviewVisual

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(300, 300);
    container.appendChild(renderer.domElement);

    // Gear representing fabrication
    const geometry = new THREE.TorusGeometry(1, 0.3, 16, 100);
    const material = new THREE.MeshPhongMaterial({ color: 0xffaa00, wireframe: true });
    const gear = new THREE.Mesh(geometry, material);
    scene.add(gear);

    // Add teeth
    const toothGeo = new THREE.BoxGeometry(0.4, 0.4, 0.4);
    for (let i = 0; i < 8; i++) {
        const tooth = new THREE.Mesh(toothGeo, new THREE.MeshPhongMaterial({ color: 0xffaa00 }));
        const angle = (i / 8) * Math.PI * 2;
        tooth.position.x = Math.cos(angle) * 1.3;
        tooth.position.y = Math.sin(angle) * 1.3;
        tooth.rotation.z = angle;
        gear.add(tooth);
    }

    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(2, 2, 5);
    scene.add(light);

    camera.position.z = 4;

    function animate() {
        requestAnimationFrame(animate);
        gear.rotation.z -= 0.01;
        gear.rotation.x = Math.sin(Date.now() * 0.001) * 0.2;
        renderer.render(scene, camera);
    }
    animate();
}

function createProjectsVisual() {
    const container = document.getElementById('projectsVisual');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(300, 300);
    container.appendChild(renderer.domElement);

    // Floating cubes representing projects
    const group = new THREE.Group();
    for (let i = 0; i < 5; i++) {
        const geo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const mat = new THREE.MeshPhongMaterial({ color: i % 2 == 0 ? 0x00ff88 : 0x00d4ff });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set((Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3, (Math.random() - 0.5) * 1);
        group.add(mesh);
    }
    scene.add(group);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 0, 5);
    scene.add(light);

    camera.position.z = 4;

    function animate() {
        requestAnimationFrame(animate);
        group.rotation.y += 0.005;
        group.children.forEach((child, i) => {
            child.rotation.x += 0.01;
            child.rotation.y += 0.02;
            child.position.y += Math.sin(Date.now() * 0.002 + i) * 0.005;
        });
        renderer.render(scene, camera);
    }
    animate();
}

function createInfraVisual() {
    const container = document.getElementById('infraVisual');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(300, 300);
    container.appendChild(renderer.domElement);

    // Stacked layers representing additive/subtractive
    for (let i = 0; i < 3; i++) {
        const geo = new THREE.CylinderGeometry(1.5 - i * 0.4, 1.5 - i * 0.4, 0.1, 32);
        const mat = new THREE.MeshPhongMaterial({ color: 0xff00ff, transparent: true, opacity: 0.6 });
        const ring = new THREE.Mesh(geo, mat);
        ring.position.y = i * 0.5 - 0.5;
        scene.add(ring);

        // Ring edges
        const edges = new THREE.EdgesGeometry(geo);
        const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
        ring.add(line);
    }

    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(2, 5, 2);
    scene.add(light);

    camera.position.set(2, 2, 4);
    camera.lookAt(0, 0, 0);

    function animate() {
        requestAnimationFrame(animate);
        scene.children.forEach((child, i) => {
            if (child.type === 'Mesh') {
                child.rotation.y += 0.01 * (i + 1);
                child.rotation.z = Math.sin(Date.now() * 0.001) * 0.1;
            }
        });
        renderer.render(scene, camera);
    }
    animate();
}

function createImpactVisual() {
    const container = document.getElementById('impactVisual');
    if (!container) return;

    // Network of nodes
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(300, 300);
    container.appendChild(renderer.domElement);

    const nodes = [];
    for (let i = 0; i < 10; i++) {
        const geo = new THREE.SphereGeometry(0.1, 16, 16);
        const mat = new THREE.MeshBasicMaterial({ color: 0x00ff88 });
        const node = new THREE.Mesh(geo, mat);
        node.position.set((Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3, (Math.random() - 0.5) * 2);

        // Velocity
        node.userData = {
            vx: (Math.random() - 0.5) * 0.01,
            vy: (Math.random() - 0.5) * 0.01,
            vz: (Math.random() - 0.5) * 0.01
        };

        nodes.push(node);
        scene.add(node);
    }

    // Lines
    const lineMat = new THREE.LineBasicMaterial({ color: 0x00ff88, transparent: true, opacity: 0.3 });
    const linesGeo = new THREE.BufferGeometry();
    const lines = new THREE.LineSegments(linesGeo, lineMat);
    scene.add(lines);

    camera.position.z = 4;

    function animate() {
        requestAnimationFrame(animate);

        // Update positions
        const positions = [];
        nodes.forEach(node => {
            node.position.x += node.userData.vx;
            node.position.y += node.userData.vy;
            node.position.z += node.userData.vz;

            if (Math.abs(node.position.x) > 2) node.userData.vx *= -1;
            if (Math.abs(node.position.y) > 2) node.userData.vy *= -1;
            if (Math.abs(node.position.z) > 2) node.userData.vz *= -1;

            positions.push(node.position.x, node.position.y, node.position.z);
        });

        // Update lines
        const linePositions = [];
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const d = nodes[i].position.distanceTo(nodes[j].position);
                if (d < 1.5) {
                    linePositions.push(
                        nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
                        nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
                    );
                }
            }
        }
        lines.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

        renderer.render(scene, camera);
    }
    animate();
}
