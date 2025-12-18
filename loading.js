// ===========================
// ELEGANT FOURIER LOADING
// Golden Ratio · Fast & Snappy
// ===========================

(function () {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'fourierOverlay';

    const canvas = document.createElement('canvas');
    canvas.id = 'fourierCanvas';
    canvas.width = 600;
    canvas.height = 400;

    overlay.appendChild(canvas);
    document.body.insertBefore(overlay, document.body.firstChild);

    const ctx = canvas.getContext('2d');
    const PHI = 1.618033988749; // Golden ratio

    let time = 0;
    const wave = [];

    // Elegant Fourier series using golden ratio
    const series = [];
    for (let n = 1; n <= 4; n++) {
        series.push({
            freq: 2 * n - 1,
            amp: 60 / (Math.pow(PHI, n - 1)),
            phase: 0
        });
    }

    function animate() {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        let x = 150;
        let y = canvas.height / 2;

        // Draw epicycles
        for (let i = 0; i < series.length; i++) {
            const prevX = x;
            const prevY = y;

            const freq = series[i].freq;
            const radius = series[i].amp;
            const angle = freq * time;

            x += radius * Math.cos(angle);
            y += radius * Math.sin(angle);

            // Circle
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 / (i + 1)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(prevX, prevY, radius, 0, Math.PI * 2);
            ctx.stroke();

            // Radius line
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 / (i + 1)})`;
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(x, y);
            ctx.stroke();
        }

        // Add to wave
        wave.unshift(y);
        if (wave.length > 150) wave.pop();

        // Connection line
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.setLineDash([2, 4]);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(300, y);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw wave
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let i = 0; i < wave.length; i++) {
            const alpha = 1 - (i / wave.length);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
            if (i === 0) {
                ctx.moveTo(300 + i, wave[i]);
            } else {
                ctx.lineTo(300 + i, wave[i]);
            }
        }
        ctx.stroke();

        time += 0.05;

        if (time < 10) {
            requestAnimationFrame(animate);
        }
    }

    animate();

    // Fade out after 1s for snappy feel
    setTimeout(() => {
        overlay.classList.add('fade-out');
        setTimeout(() => {
            overlay.remove();
        }, 600);
    }, 1000);
})();

console.log('✨ Elegant Fourier loading');
