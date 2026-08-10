/**
 * BEACON MASTER — ENTERPRISE DATA VISUALIZATION ENGINE
 * High-performance vector canvas and SVG charts (Area GMV, Category Donut, Geographic Map, Telemetry Pulse).
 */

export class MasterCharts {
  // Render Area GMV & Revenue Chart
  static renderRevenueChart(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const data = [
      { month: 'Feb', gmv: 24.2, rev: 3.38 },
      { month: 'Mar', gmv: 28.5, rev: 3.99 },
      { month: 'Apr', gmv: 34.0, rev: 4.76 },
      { month: 'May', gmv: 39.8, rev: 5.57 },
      { month: 'Jun', gmv: 42.1, rev: 5.89 },
      { month: 'Jul', gmv: 45.4, rev: 6.35 },
      { month: 'Aug (MTD)', gmv: 48.6, rev: 6.80 }
    ];

    const maxGmv = 60;
    const width = 600;
    const height = 220;
    const padding = { top: 20, right: 20, bottom: 35, left: 45 };

    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const getX = (idx) => padding.left + (idx / (data.length - 1)) * chartWidth;
    const getY = (val) => padding.top + chartHeight - (val / maxGmv) * chartHeight;

    // SVG Points for GMV
    const gmvPoints = data.map((d, i) => `${getX(i)},${getY(d.gmv)}`).join(' ');
    const gmvAreaPoints = `${getX(0)},${getY(0)} ` + gmvPoints + ` ${getX(data.length - 1)},${getY(0)}`;

    // SVG Points for Revenue
    const revPoints = data.map((d, i) => `${getX(i)},${getY(d.rev * 5)}`).join(' '); // scaled for visual distinction

    let html = `
      <svg viewBox="0 0 ${width} ${height}" class="chart-svg" style="width: 100%; height: 100%; overflow: visible;">
        <defs>
          <linearGradient id="gmvGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#00CBD4" stop-opacity="0.35"/>
            <stop offset="100%" stop-color="#00CBD4" stop-opacity="0.0"/>
          </linearGradient>
          <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#10B981" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#10B981" stop-opacity="0.0"/>
          </linearGradient>
        </defs>

        <!-- Grid Lines -->
        <g class="chart-grid">
          ${[0, 15, 30, 45, 60].map(val => `
            <line x1="${padding.left}" y1="${getY(val)}" x2="${width - padding.right}" y2="${getY(val)}" stroke="rgba(255,255,255,0.06)" stroke-dasharray="3,3"/>
            <text x="${padding.left - 8}" y="${getY(val) + 4}" fill="#64748B" font-size="10" text-anchor="end" font-family="monospace">₹${val}L</text>
          `).join('')}
        </g>

        <!-- GMV Area & Line -->
        <polygon points="${gmvAreaPoints}" fill="url(#gmvGrad)"/>
        <polyline points="${gmvPoints}" fill="none" stroke="#00CBD4" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>

        <!-- Revenue Line -->
        <polyline points="${revPoints}" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="5,5"/>

        <!-- Data Dots & X Axis Labels -->
        ${data.map((d, i) => `
          <g class="chart-node" data-tooltip="${d.month}: GMV ₹${d.gmv}L | Net Rev ₹${d.rev}L">
            <circle cx="${getX(i)}" cy="${getY(d.gmv)}" r="4.5" fill="#0F172A" stroke="#00CBD4" stroke-width="2" class="node-circle"/>
            <circle cx="${getX(i)}" cy="${getY(d.rev * 5)}" r="3.5" fill="#0F172A" stroke="#10B981" stroke-width="2" class="node-circle"/>
            <text x="${getX(i)}" y="${height - 10}" fill="#94A3B8" font-size="11" text-anchor="middle" font-weight="500">${d.month}</text>
          </g>
        `).join('')}
      </svg>
    `;

    container.innerHTML = html;
  }

  // Render Destination Distribution Bar Graph
  static renderDestinationShareChart(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const data = [
      { name: 'Goa Coast', trips: 684, pct: 28, color: '#00CBD4' },
      { name: 'Dubai & UAE', trips: 512, pct: 21, color: '#38BDF8' },
      { name: 'Bali Temples', trips: 420, pct: 17, color: '#818CF8' },
      { name: 'Manali Valley', trips: 412, pct: 16, color: '#F59E0B' },
      { name: 'Kashmir Alpine', trips: 342, pct: 12, color: '#10B981' },
      { name: 'Paris & Europe', trips: 218, pct: 6, color: '#EC4899' }
    ];

    let html = `
      <div class="dest-bars-wrap">
        ${data.map(item => `
          <div class="dest-bar-row">
            <div class="dest-bar-info">
              <span class="dest-name">${item.name}</span>
              <span class="dest-trips">${item.trips} active trips (${item.pct}%)</span>
            </div>
            <div class="dest-progress-track">
              <div class="dest-progress-fill" style="width: ${item.pct * 3.2}%; background: ${item.color};"></div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    container.innerHTML = html;
  }

  // Render Geographic Hotspot World Map
  static renderGeographicMap(containerId, onSelectDestination) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const hotspots = [
      { id: "DEST-01", name: "Kashmir", country: "India", x: 67.5, y: 35.5, trips: 342, planners: 28, gmv: "₹4.8L" },
      { id: "DEST-02", name: "Goa", country: "India", x: 66.8, y: 48.2, trips: 684, planners: 64, gmv: "₹12.4L" },
      { id: "DEST-03", name: "Manali", country: "India", x: 68.2, y: 37.0, trips: 412, planners: 42, gmv: "₹6.1L" },
      { id: "DEST-04", name: "Jaipur", country: "India", x: 67.2, y: 40.5, trips: 290, planners: 35, gmv: "₹4.2L" },
      { id: "DEST-05", name: "Dubai", country: "UAE", x: 61.2, y: 41.5, trips: 512, planners: 48, gmv: "₹10.5L" },
      { id: "DEST-06", name: "Bali", country: "Indonesia", x: 79.5, y: 58.0, trips: 420, planners: 39, gmv: "₹7.8L" },
      { id: "DEST-07", name: "Paris", country: "France", x: 48.5, y: 32.5, trips: 218, planners: 24, gmv: "₹9.2L" },
      { id: "DEST-08", name: "Tokyo", country: "Japan", x: 86.0, y: 38.0, trips: 184, planners: 19, gmv: "₹6.4L" },
      { id: "DEST-09", name: "Singapore", country: "Singapore", x: 76.5, y: 52.0, trips: 310, planners: 27, gmv: "₹5.9L" },
      { id: "DEST-10", name: "London", country: "UK", x: 46.5, y: 30.0, trips: 195, planners: 21, gmv: "₹8.1L" }
    ];

    let html = `
      <div class="geo-map-container">
        <svg viewBox="0 0 1000 500" class="world-svg-layer">
          <!-- Simplified Elegant Continental Vectors -->
          <path class="landmass" d="M150,120 Q180,90 280,100 Q320,130 300,180 Q250,220 200,240 Q130,200 150,120 Z" />
          <path class="landmass" d="M250,260 Q320,270 340,350 Q310,440 260,450 Q230,360 250,260 Z" />
          <path class="landmass" d="M440,90 Q520,70 580,110 Q560,170 480,180 Q430,140 440,90 Z" />
          <path class="landmass" d="M460,200 Q540,210 560,300 Q520,400 460,400 Q430,300 460,200 Z" />
          <path class="landmass" d="M590,90 Q850,70 900,190 Q820,300 660,260 Q620,170 590,90 Z" />
          <path class="landmass" d="M780,340 Q880,330 890,410 Q830,460 770,420 Q750,370 780,340 Z" />
          
          <!-- Route Connections between Hubs -->
          <g class="map-routes">
            <path d="M668,241 Q550,200 485,162" stroke="rgba(0, 203, 212, 0.25)" stroke-width="1.5" stroke-dasharray="4,4" fill="none" class="route-line" />
            <path d="M668,241 Q640,220 612,207" stroke="rgba(0, 203, 212, 0.35)" stroke-width="1.5" stroke-dasharray="4,4" fill="none" class="route-line" />
            <path d="M668,241 Q740,260 795,290" stroke="rgba(0, 203, 212, 0.3)" stroke-width="1.5" stroke-dasharray="4,4" fill="none" class="route-line" />
            <path d="M668,241 Q780,240 860,190" stroke="rgba(0, 203, 212, 0.25)" stroke-width="1.5" stroke-dasharray="4,4" fill="none" class="route-line" />
          </g>

          <!-- Hotspot Pins -->
          ${hotspots.map(h => `
            <g class="geo-pin-group" transform="translate(${h.x * 10}, ${h.y * 5})" data-dest-id="${h.id}">
              <circle r="12" class="pin-pulse" fill="#00CBD4" fill-opacity="0.2"/>
              <circle r="5" class="pin-dot" fill="#00CBD4" stroke="#0F172A" stroke-width="2"/>
              <text x="8" y="4" class="pin-label">${h.name}</text>
            </g>
          `).join('')}
        </svg>

        <div class="map-legend-overlay">
          <div class="legend-badge">
            <span class="legend-dot active"></span> 10 Active Global Travel Hubs
          </div>
          <div class="legend-stats">
            <div><strong>3,846</strong> Active Itineraries</div>
            <div><strong>1,284</strong> Local Planners</div>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;

    // Attach click triggers
    container.querySelectorAll('.geo-pin-group').forEach(el => {
      el.addEventListener('click', () => {
        const destId = el.getAttribute('data-dest-id');
        if (onSelectDestination) onSelectDestination(destId);
      });
    });
  }

  // Real-time API Latency Sparkline
  static renderLatencySparkline(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let points = [32, 34, 38, 35, 42, 39, 36, 40, 38, 37, 44, 38, 35, 39, 41, 38];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      ctx.beginPath();
      ctx.strokeStyle = '#10B981';
      ctx.lineWidth = 2;
      ctx.lineJoin = 'round';

      const step = w / (points.length - 1);
      points.forEach((p, idx) => {
        const y = h - ((p - 20) / 40) * h;
        if (idx === 0) ctx.moveTo(0, y);
        else ctx.lineTo(idx * step, y);
      });
      ctx.stroke();
    };

    draw();

    // Pulse animation simulator
    setInterval(() => {
      const next = Math.floor(34 + Math.random() * 12);
      points.push(next);
      points.shift();
      draw();
    }, 2500);
  }
}
