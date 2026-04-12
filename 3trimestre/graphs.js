// graphs.js — Lightweight function plotter for dark theme
// Usage: plotGraph(canvasId, options)

function plotGraph(canvasId, opts) {
    var c = document.getElementById(canvasId);
    if (!c) return;
    var ctx = c.getContext('2d');
    var W = c.width = c.offsetWidth * 2;
    var H = c.height = (opts.height || 280) * 2;
    c.style.height = (opts.height || 280) + 'px';
    ctx.scale(2, 2);
    var w = W / 2, h = H / 2;

    var xMin = opts.xMin != null ? opts.xMin : -5;
    var xMax = opts.xMax != null ? opts.xMax : 5;
    var yMin = opts.yMin != null ? opts.yMin : -4;
    var yMax = opts.yMax != null ? opts.yMax : 4;

    function toX(x) { return (x - xMin) / (xMax - xMin) * w; }
    function toY(y) { return h - (y - yMin) / (yMax - yMin) * h; }

    // Background
    ctx.fillStyle = '#1e1e30';
    ctx.fillRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = 'rgba(51,51,80,0.5)';
    ctx.lineWidth = 0.5;
    for (var gx = Math.ceil(xMin); gx <= xMax; gx++) {
        ctx.beginPath(); ctx.moveTo(toX(gx), 0); ctx.lineTo(toX(gx), h); ctx.stroke();
    }
    for (var gy = Math.ceil(yMin); gy <= yMax; gy++) {
        ctx.beginPath(); ctx.moveTo(0, toY(gy)); ctx.lineTo(w, toY(gy)); ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#555580';
    ctx.lineWidth = 1;
    if (yMin <= 0 && yMax >= 0) { ctx.beginPath(); ctx.moveTo(0, toY(0)); ctx.lineTo(w, toY(0)); ctx.stroke(); }
    if (xMin <= 0 && xMax >= 0) { ctx.beginPath(); ctx.moveTo(toX(0), 0); ctx.lineTo(toX(0), h); ctx.stroke(); }

    // Axis labels
    ctx.fillStyle = '#787c9e';
    ctx.font = '10px IBM Plex Sans, sans-serif';
    ctx.textAlign = 'center';
    for (var lx = Math.ceil(xMin); lx <= xMax; lx++) {
        if (lx === 0) continue;
        ctx.fillText(lx, toX(lx), toY(0) + 14);
    }
    ctx.textAlign = 'right';
    for (var ly = Math.ceil(yMin); ly <= yMax; ly++) {
        if (ly === 0) continue;
        ctx.fillText(ly, toX(0) - 5, toY(ly) + 4);
    }

    // Draw filled area if specified
    if (opts.fillBetween) {
        opts.fillBetween.forEach(function(fb) {
            var fn1 = fb.f1, fn2 = fb.f2 || function() { return 0; };
            var a = fb.from, b = fb.to;
            var color = fb.color || 'rgba(122,162,247,0.15)';
            ctx.fillStyle = color;
            ctx.beginPath();
            var step = (b - a) / 200;
            ctx.moveTo(toX(a), toY(fn2(a)));
            for (var fx = a; fx <= b; fx += step) {
                var yv = fn1(fx);
                if (isFinite(yv)) ctx.lineTo(toX(fx), toY(yv));
            }
            for (var fx2 = b; fx2 >= a; fx2 -= step) {
                var yv2 = fn2(fx2);
                if (isFinite(yv2)) ctx.lineTo(toX(fx2), toY(yv2));
            }
            ctx.closePath();
            ctx.fill();
        });
    }

    // Draw functions
    var colors = ['#7aa2f7', '#9ece6a', '#f7768e', '#e0af68', '#bb9af7', '#73daca'];
    var fns = opts.functions || [];
    fns.forEach(function(fnObj, i) {
        var fn = typeof fnObj === 'function' ? fnObj : fnObj.fn;
        var color = (typeof fnObj === 'object' && fnObj.color) ? fnObj.color : colors[i % colors.length];
        var lw = (typeof fnObj === 'object' && fnObj.lineWidth) ? fnObj.lineWidth : 2;
        var dashed = (typeof fnObj === 'object' && fnObj.dashed);

        ctx.strokeStyle = color;
        ctx.lineWidth = lw;
        if (dashed) ctx.setLineDash([6, 4]);
        else ctx.setLineDash([]);

        ctx.beginPath();
        var started = false;
        var step = (xMax - xMin) / (w * 2);
        var prevY = null;
        for (var px = xMin; px <= xMax; px += step) {
            var yv = fn(px);
            if (!isFinite(yv) || Math.abs(yv) > 1000) {
                started = false;
                prevY = null;
                continue;
            }
            // Detect jumps (asymptotes)
            if (prevY !== null && Math.abs(yv - prevY) > (yMax - yMin) * 2) {
                started = false;
            }
            if (!started) { ctx.moveTo(toX(px), toY(yv)); started = true; }
            else ctx.lineTo(toX(px), toY(yv));
            prevY = yv;
        }
        ctx.stroke();
        ctx.setLineDash([]);
    });

    // Draw points (filled ● or open ○)
    if (opts.points) {
        opts.points.forEach(function(p) {
            var px = toX(p.x), py = toY(p.y), r = p.r || 4;
            var col = p.color || '#f7768e';
            ctx.beginPath();
            ctx.arc(px, py, r, 0, Math.PI * 2);
            if (p.open) {
                // Open circle: white fill + colored border
                ctx.fillStyle = '#1e1e30';
                ctx.fill();
                ctx.strokeStyle = col;
                ctx.lineWidth = 2;
                ctx.stroke();
            } else {
                // Filled circle
                ctx.fillStyle = col;
                ctx.fill();
            }
            if (p.label) {
                ctx.fillStyle = p.labelColor || col;
                ctx.font = 'bold 11px IBM Plex Sans, sans-serif';
                ctx.textAlign = 'left';
                ctx.fillText(p.label, px + 8, py - 6);
            }
        });
    }

    // Draw vertical asymptotes
    if (opts.asymptotes) {
        opts.asymptotes.forEach(function(a) {
            ctx.strokeStyle = a.color || '#f7768e';
            ctx.lineWidth = 1;
            ctx.setLineDash([6, 4]);
            ctx.beginPath();
            if (a.type === 'v') { ctx.moveTo(toX(a.val), 0); ctx.lineTo(toX(a.val), h); }
            else { ctx.moveTo(0, toY(a.val)); ctx.lineTo(w, toY(a.val)); }
            ctx.stroke();
            ctx.setLineDash([]);
            if (a.label) {
                ctx.fillStyle = a.color || '#f7768e';
                ctx.font = '10px IBM Plex Sans, sans-serif';
                ctx.textAlign = 'left';
                if (a.type === 'v') ctx.fillText(a.label, toX(a.val) + 4, 14);
                else ctx.fillText(a.label, w - 40, toY(a.val) - 5);
            }
        });
    }

    // Title
    if (opts.title) {
        ctx.fillStyle = '#c0caf5';
        ctx.font = 'bold 12px IBM Plex Sans, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(opts.title, w / 2, 16);
    }
}
