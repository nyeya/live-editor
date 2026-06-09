// Universal Starter Templates Gallery for Nyeya Live Editor

export interface StarterTemplate {
  id: string;
  name: string;
  category: 'dashboard' | 'pricing' | 'canvas' | 'ui' | 'portfolio' | 'minimal';
  badge: string;
  badgeColor: string;
  description: string;
  icon: string;
  html: string;
  css: string;
  js: string;
}

export const STARTER_TEMPLATES: StarterTemplate[] = [
  {
    id: 'saas-dashboard',
    name: 'SaaS Analytics Dashboard',
    category: 'dashboard',
    badge: 'Dashboard',
    badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    description: 'Modern SaaS metrics dashboard featuring KPI cards, interactive Chart.js revenue trend graphs, and live user activity table.',
    icon: 'LayoutDashboard',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SaaS Analytics Dashboard</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body class="bg-neutral-950 text-neutral-100 min-h-screen antialiased">

  <!-- Navigation Bar -->
  <header class="border-b border-neutral-800 bg-neutral-900/60 backdrop-blur sticky top-0 z-30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
          <i class="fa-solid fa-chart-simple"></i>
        </div>
        <span class="font-bold text-sm text-white tracking-tight">Apex Analytics</span>
      </div>

      <div class="flex items-center gap-3">
        <div class="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-xs text-neutral-400 font-mono">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>Live Stream</span>
        </div>
        <button onclick="refreshData()" class="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs py-1.5 px-3 rounded-md transition-colors flex items-center gap-1.5">
          <i class="fa-solid fa-rotate-right text-xs"></i>
          <span>Refresh</span>
        </button>
      </div>
    </div>
  </header>

  <!-- Main Container -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
    
    <!-- KPI Metrics Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1">
        <div class="flex items-center justify-between text-neutral-400 text-xs font-medium">
          <span>Monthly Recurring Revenue</span>
          <i class="fa-solid fa-arrow-trend-up text-emerald-400"></i>
        </div>
        <h3 class="text-2xl font-bold text-white tracking-tight">$48,250</h3>
        <p class="text-[11px] text-emerald-400 flex items-center gap-1">
          <span>+14.2%</span> <span class="text-neutral-500">from last month</span>
        </p>
      </div>

      <div class="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1">
        <div class="flex items-center justify-between text-neutral-400 text-xs font-medium">
          <span>Active Subscribers</span>
          <i class="fa-solid fa-users text-indigo-400"></i>
        </div>
        <h3 class="text-2xl font-bold text-white tracking-tight">3,842</h3>
        <p class="text-[11px] text-emerald-400 flex items-center gap-1">
          <span>+8.4%</span> <span class="text-neutral-500">net new users</span>
        </p>
      </div>

      <div class="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1">
        <div class="flex items-center justify-between text-neutral-400 text-xs font-medium">
          <span>Conversion Rate</span>
          <i class="fa-solid fa-bolt text-amber-400"></i>
        </div>
        <h3 class="text-2xl font-bold text-white tracking-tight">4.92%</h3>
        <p class="text-[11px] text-emerald-400 flex items-center gap-1">
          <span>+0.8%</span> <span class="text-neutral-500">vs benchmark</span>
        </p>
      </div>

      <div class="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1">
        <div class="flex items-center justify-between text-neutral-400 text-xs font-medium">
          <span>Churn Rate</span>
          <i class="fa-solid fa-shield-halved text-cyan-400"></i>
        </div>
        <h3 class="text-2xl font-bold text-white tracking-tight">1.24%</h3>
        <p class="text-[11px] text-emerald-400 flex items-center gap-1">
          <span>-0.3%</span> <span class="text-neutral-500">industry lowest</span>
        </p>
      </div>
    </div>

    <!-- Chart & Activity Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Interactive Chart -->
      <div class="lg:col-span-2 p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h4 class="font-semibold text-sm text-white">Revenue Growth Trajectory</h4>
            <p class="text-xs text-neutral-500">Actual vs Projected ARR (2026)</p>
          </div>
          <div class="flex gap-1.5 bg-neutral-950 p-1 rounded-lg border border-neutral-800">
            <button class="px-2 py-0.5 rounded text-[11px] font-medium bg-neutral-800 text-white">Monthly</button>
            <button class="px-2 py-0.5 rounded text-[11px] font-medium text-neutral-400 hover:text-white">Quarterly</button>
          </div>
        </div>
        <div class="h-64 relative">
          <canvas id="revenueChart"></canvas>
        </div>
      </div>

      <!-- Recent Transactions Activity -->
      <div class="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 flex flex-col">
        <h4 class="font-semibold text-sm text-white mb-3">Recent Transactions</h4>
        <div class="space-y-3 flex-1 overflow-y-auto" id="transactions-list">
          <!-- Dynamically populated via JS -->
        </div>
      </div>

    </div>

  </main>

</body>
</html>`,
    css: `body {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}`,
    js: `// SaaS Analytics Dashboard Script
let chartInstance = null;

function initChart() {
  const canvas = document.getElementById('revenueChart');
  if (!canvas || typeof Chart === 'undefined') return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, 'rgba(99, 102, 241, 0.4)');
  gradient.addColorStop(1, 'rgba(99, 102, 241, 0.0)');

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      datasets: [{
        label: 'Monthly Revenue ($)',
        data: [18000, 22500, 26000, 31000, 34500, 38000, 42000, 44500, 46800, 48250],
        borderColor: '#6366F1',
        borderWidth: 2.5,
        backgroundColor: gradient,
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#6366F1',
        pointRadius: 3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#737373', font: { size: 11 } } },
        y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#737373', font: { size: 11 }, callback: v => '$' + (v/1000) + 'k' } }
      }
    }
  });
}

const transactions = [
  { user: 'Sarah Connor', plan: 'Enterprise Annual', amount: '$2,400', time: '2 mins ago', status: 'Completed' },
  { user: 'David Miller', plan: 'Pro Monthly', amount: '$49', time: '14 mins ago', status: 'Completed' },
  { user: 'TechFlow Labs', plan: 'Team Annual', amount: '$1,200', time: '42 mins ago', status: 'Completed' },
  { user: 'Elena Rostova', plan: 'Pro Monthly', amount: '$49', time: '1 hour ago', status: 'Completed' }
];

function renderTransactions() {
  const container = document.getElementById('transactions-list');
  if (!container) return;
  container.innerHTML = transactions.map(t => \`
    <div class="flex items-center justify-between p-2.5 rounded-lg bg-neutral-950/80 border border-neutral-800/80 text-xs">
      <div>
        <p class="font-medium text-white">\${t.user}</p>
        <p class="text-[10px] text-neutral-500 font-mono">\${t.plan} • \${t.time}</p>
      </div>
      <div class="text-right">
        <p class="font-bold text-white font-mono">\${t.amount}</p>
        <span class="text-[10px] text-emerald-400 font-medium">✓ Paid</span>
      </div>
    </div>
  \`).join('');
}

function refreshData() {
  if (chartInstance) {
    const newData = chartInstance.data.datasets[0].data.map(v => Math.round(v * (0.95 + Math.random() * 0.1)));
    chartInstance.data.datasets[0].data = newData;
    chartInstance.update();
  }
}

function initDashboard() {
  initChart();
  renderTransactions();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDashboard);
} else {
  initDashboard();
}`
  },
  {
    id: 'saas-pricing',
    name: 'SaaS Pricing & Checkout',
    category: 'pricing',
    badge: 'Pricing',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    description: 'Tiered subscription pricing calculator with annual discount toggle, multi-currency switcher, and interactive modal checkout.',
    icon: 'CreditCard',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pricing Plans</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body class="bg-neutral-950 text-neutral-100 min-h-screen py-12 px-4 antialiased">

  <div class="max-w-5xl mx-auto space-y-10">
    
    <!-- Title & Toggle -->
    <div class="text-center space-y-4">
      <span class="text-xs font-semibold uppercase tracking-wider text-indigo-400">Simple, Transparent Pricing</span>
      <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-white">Choose the plan that fits your growth</h2>
      <p class="text-neutral-400 text-sm max-w-md mx-auto">Instant setup, cancel anytime, 14-day risk-free money back guarantee.</p>

      <!-- Billing Frequency Switcher -->
      <div class="inline-flex items-center gap-3 p-1 rounded-xl bg-neutral-900 border border-neutral-800">
        <button id="btn-monthly" onclick="setBilling('monthly')" class="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-neutral-800 text-white transition-all">
          Monthly Billing
        </button>
        <button id="btn-annual" onclick="setBilling('annual')" class="px-3.5 py-1.5 rounded-lg text-xs font-medium text-neutral-400 hover:text-white transition-all flex items-center gap-1.5">
          <span>Annual Billing</span>
          <span class="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">Save 20%</span>
        </button>
      </div>
    </div>

    <!-- Pricing Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <!-- Starter Plan -->
      <div class="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-all">
        <div>
          <h3 class="text-lg font-bold text-white">Starter</h3>
          <p class="text-xs text-neutral-400 mt-1">For individuals & hobby projects.</p>
          <div class="my-6">
            <span class="text-3xl font-extrabold text-white font-mono" id="price-starter">$19</span>
            <span class="text-xs text-neutral-500 font-mono" id="period-starter">/month</span>
          </div>
          <ul class="space-y-2.5 text-xs text-neutral-300">
            <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-400"></i> Up to 3 active projects</li>
            <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-400"></i> 10GB cloud storage</li>
            <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-400"></i> Standard analytics</li>
            <li class="flex items-center gap-2 text-neutral-500"><i class="fa-solid fa-xmark text-neutral-600"></i> Priority support</li>
          </ul>
        </div>
        <button onclick="openCheckout('Starter', 19)" class="mt-8 w-full py-2.5 rounded-xl border border-neutral-700 hover:bg-neutral-800 text-xs font-semibold text-white transition-colors">
          Get Started
        </button>
      </div>

      <!-- Pro Plan (Featured) -->
      <div class="p-6 rounded-2xl bg-neutral-900 border-2 border-indigo-500/80 flex flex-col justify-between shadow-xl shadow-indigo-500/10 relative">
        <span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white font-bold text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm">
          Most Popular
        </span>
        <div>
          <h3 class="text-lg font-bold text-white">Professional</h3>
          <p class="text-xs text-neutral-400 mt-1">For growing teams and SaaS builders.</p>
          <div class="my-6">
            <span class="text-3xl font-extrabold text-white font-mono" id="price-pro">$49</span>
            <span class="text-xs text-neutral-500 font-mono" id="period-pro">/month</span>
          </div>
          <ul class="space-y-2.5 text-xs text-neutral-300">
            <li class="flex items-center gap-2"><i class="fa-solid fa-check text-indigo-400"></i> Unlimited active projects</li>
            <li class="flex items-center gap-2"><i class="fa-solid fa-check text-indigo-400"></i> 100GB fast SSD storage</li>
            <li class="flex items-center gap-2"><i class="fa-solid fa-check text-indigo-400"></i> Advanced Real-Time Analytics</li>
            <li class="flex items-center gap-2"><i class="fa-solid fa-check text-indigo-400"></i> 24/7 Dedicated Slack support</li>
          </ul>
        </div>
        <button onclick="openCheckout('Professional', 49)" class="mt-8 w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition-colors shadow-sm">
          Start 14-Day Free Trial
        </button>
      </div>

      <!-- Enterprise Plan -->
      <div class="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-all">
        <div>
          <h3 class="text-lg font-bold text-white">Enterprise</h3>
          <p class="text-xs text-neutral-400 mt-1">For organizations requiring scale.</p>
          <div class="my-6">
            <span class="text-3xl font-extrabold text-white font-mono" id="price-enterprise">$199</span>
            <span class="text-xs text-neutral-500 font-mono" id="period-enterprise">/month</span>
          </div>
          <ul class="space-y-2.5 text-xs text-neutral-300">
            <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-400"></i> Custom infrastructure</li>
            <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-400"></i> Unlimited team seats</li>
            <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-400"></i> 99.99% SLA Guarantee</li>
            <li class="flex items-center gap-2"><i class="fa-solid fa-check text-emerald-400"></i> SOC-2 & HIPAA Compliance</li>
          </ul>
        </div>
        <button onclick="openCheckout('Enterprise', 199)" class="mt-8 w-full py-2.5 rounded-xl border border-neutral-700 hover:bg-neutral-800 text-xs font-semibold text-white transition-colors">
          Contact Sales
        </button>
      </div>

    </div>

  </div>

  <!-- Interactive Modal Checkout -->
  <div id="checkout-modal" class="hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
      <div class="flex items-center justify-between">
        <h4 class="font-bold text-white text-base">Complete Subscription</h4>
        <button onclick="closeCheckout()" class="text-neutral-400 hover:text-white"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex justify-between items-center text-xs">
        <div>
          <span class="font-semibold text-white" id="modal-plan-name">Professional Plan</span>
          <p class="text-neutral-500">Billed monthly</p>
        </div>
        <span class="font-bold text-indigo-400 text-base font-mono" id="modal-plan-price">$49.00</span>
      </div>
      <form onsubmit="confirmPayment(event)" class="space-y-3 text-xs">
        <div>
          <label class="text-neutral-400 block mb-1">Cardholder Name</label>
          <input type="text" required placeholder="Alex Turner" class="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-white focus:outline-none focus:border-indigo-500" />
        </div>
        <div>
          <label class="text-neutral-400 block mb-1">Card Details</label>
          <input type="text" required placeholder="4242 •••• •••• 4242" class="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-white font-mono focus:outline-none focus:border-indigo-500" />
        </div>
        <button type="submit" class="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-colors mt-2">
          Start Subscription
        </button>
      </form>
    </div>
  </div>

</body>
</html>`,
    css: `body {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}`,
    js: `let billingMode = 'monthly';

function setBilling(mode) {
  billingMode = mode;
  const btnMonthly = document.getElementById('btn-monthly');
  const btnAnnual = document.getElementById('btn-annual');

  if (mode === 'monthly') {
    btnMonthly.className = 'px-3.5 py-1.5 rounded-lg text-xs font-medium bg-neutral-800 text-white transition-all';
    btnAnnual.className = 'px-3.5 py-1.5 rounded-lg text-xs font-medium text-neutral-400 hover:text-white transition-all flex items-center gap-1.5';
    document.getElementById('price-starter').innerText = '$19';
    document.getElementById('price-pro').innerText = '$49';
    document.getElementById('price-enterprise').innerText = '$199';
  } else {
    btnAnnual.className = 'px-3.5 py-1.5 rounded-lg text-xs font-medium bg-neutral-800 text-white transition-all flex items-center gap-1.5';
    btnMonthly.className = 'px-3.5 py-1.5 rounded-lg text-xs font-medium text-neutral-400 hover:text-white transition-all';
    document.getElementById('price-starter').innerText = '$15';
    document.getElementById('price-pro').innerText = '$39';
    document.getElementById('price-enterprise').innerText = '$159';
  }
}

function openCheckout(plan, price) {
  const finalPrice = billingMode === 'annual' ? Math.round(price * 0.8) : price;
  document.getElementById('modal-plan-name').innerText = plan + ' Plan';
  document.getElementById('modal-plan-price').innerText = '$' + finalPrice + '.00';
  document.getElementById('checkout-modal').classList.remove('hidden');
}

function closeCheckout() {
  document.getElementById('checkout-modal').classList.add('hidden');
}

function confirmPayment(e) {
  e.preventDefault();
  alert('Subscription active! Welcome aboard.');
  closeCheckout();
}`
  },
  {
    id: 'canvas-particles',
    name: 'Interactive Particle Physics',
    category: 'canvas',
    badge: 'Canvas',
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    description: 'High-performance HTML5 Canvas physics sandbox simulating kinetic particle gravity and interactive mouse cursor repulsion.',
    icon: 'Atom',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Canvas Particle Physics</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700&display=swap" rel="stylesheet">
</head>
<body class="bg-black text-neutral-100 h-screen w-screen overflow-hidden flex flex-col justify-between antialiased select-none">

  <!-- HUD Control Bar -->
  <div class="p-4 flex items-center justify-between z-10 pointer-events-none">
    <div class="pointer-events-auto bg-neutral-900/80 backdrop-blur border border-neutral-800 px-3.5 py-2 rounded-xl flex items-center gap-3 text-xs">
      <span class="font-bold text-cyan-400">Particle Gravity</span>
      <span class="text-neutral-500 font-mono" id="particle-count">150 Particles</span>
    </div>
    <div class="pointer-events-auto flex gap-2">
      <button onclick="resetParticles()" class="px-3 py-1.5 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-xs text-neutral-300 transition-colors">
        Reset
      </button>
    </div>
  </div>

  <!-- Canvas Surface -->
  <canvas id="particleCanvas" class="absolute inset-0 w-full h-full cursor-crosshair"></canvas>

  <!-- Instructions Footer -->
  <div class="p-4 text-center text-xs text-neutral-500 z-10 pointer-events-none font-mono">
    Hover cursor to repel • Click to burst particles
  </div>

</body>
</html>`,
    css: `body {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}`,
    js: `const canvas = document.getElementById('particleCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;

let particles = [];
const numParticles = 120;
let mouse = { x: null, y: null, radius: 120 };

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

if (canvas && ctx) {
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  window.addEventListener('mousemove', e => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener('click', e => {
    for (let i = 0; i < 15; i++) {
      particles.push(new Particle(e.x, e.y, true));
    }
  });
}

class Particle {
  constructor(x, y, isBurst = false) {
    this.x = x || (canvas ? Math.random() * canvas.width : 0);
    this.y = y || (canvas ? Math.random() * canvas.height : 0);
    this.size = Math.random() * 2.5 + 1;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 30 + 1;
    this.speedX = isBurst ? (Math.random() - 0.5) * 8 : (Math.random() - 0.5) * 1.5;
    this.speedY = isBurst ? (Math.random() - 0.5) * 8 : (Math.random() - 0.5) * 1.5;
    this.color = isBurst ? '#F43F5E' : '#38BDF8';
  }

  draw() {
    if (!ctx) return;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  update() {
    if (!canvas) return;
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

    // Mouse interaction
    if (mouse.x && mouse.y) {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < mouse.radius) {
        const force = (mouse.radius - distance) / mouse.radius;
        const directionX = dx / distance;
        const directionY = dy / distance;
        this.x -= directionX * force * 5;
        this.y -= directionY * force * 5;
      }
    }
  }
}

function init() {
  if (!canvas || !ctx) return;
  particles = [];
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}

function connect() {
  if (!ctx) return;
  for (let a = 0; a < particles.length; a++) {
    for (let b = a; b < particles.length; b++) {
      let dx = particles[a].x - particles[b].x;
      let dy = particles[a].y - particles[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 90) {
        ctx.strokeStyle = \`rgba(56, 189, 248, \${1 - distance / 90})\`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  if (!canvas || !ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  connect();
  requestAnimationFrame(animate);
}

function resetParticles() {
  init();
}

if (canvas && ctx) {
  init();
  animate();
}`
  },
  {
    id: '3d-glass-cards',
    name: '3D Card Tilt & Glassmorphism',
    category: 'ui',
    badge: 'CSS 3D',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    description: 'Interactive perspective 3D cards with real-time cursor tilt physics, glowing borders, and frosted glass backdrop blur.',
    icon: 'Layers',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>3D Tilt & Glass Showcase</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
</head>
<body class="bg-neutral-950 text-neutral-100 min-h-screen flex items-center justify-center p-6 antialiased">

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full perspective-container">
    
    <!-- 3D Card 1 -->
    <div class="tilt-card p-8 rounded-2xl bg-neutral-900/60 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden transition-all duration-100">
      <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-lg mb-4">
        <i class="fa-solid fa-wand-magic-sparkles"></i>
      </div>
      <span class="text-xs font-mono text-indigo-400 font-semibold">INTERACTIVE 3D</span>
      <h3 class="text-xl font-bold text-white mt-1">Spatial Tilt Engine</h3>
      <p class="text-neutral-400 text-xs mt-2 leading-relaxed">
        Smooth hardware-accelerated 3D perspective transforms calculated from cursor position in real-time.
      </p>
      <div class="mt-6 pt-4 border-t border-neutral-800 flex justify-between items-center text-xs">
        <span class="text-neutral-500 font-mono">CSS transform3d</span>
        <button class="text-indigo-400 font-semibold hover:underline">Explore &rarr;</button>
      </div>
    </div>

    <!-- 3D Card 2 -->
    <div class="tilt-card p-8 rounded-2xl bg-neutral-900/60 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden transition-all duration-100">
      <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white text-lg mb-4">
        <i class="fa-solid fa-layer-group"></i>
      </div>
      <span class="text-xs font-mono text-emerald-400 font-semibold">GLASSMORPHISM</span>
      <h3 class="text-xl font-bold text-white mt-1">Subtle Frosted Depth</h3>
      <p class="text-neutral-400 text-xs mt-2 leading-relaxed">
        Multi-layered opacity gradients and specular border reflections built with modern CSS utilities.
      </p>
      <div class="mt-6 pt-4 border-t border-neutral-800 flex justify-between items-center text-xs">
        <span class="text-neutral-500 font-mono">backdrop-filter</span>
        <button class="text-emerald-400 font-semibold hover:underline">Explore &rarr;</button>
      </div>
    </div>

  </div>

</body>
</html>`,
    css: `body {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}

.perspective-container {
  perspective: 1000px;
}

.tilt-card {
  transform-style: preserve-3d;
  will-change: transform;
}`,
    js: `const cards = document.querySelectorAll('.tilt-card');

cards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    
    card.style.transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) scale3d(1.02, 1.02, 1.02)\`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
});`
  },
  {
    id: 'developer-portfolio',
    name: 'Developer Portfolio & Showcase',
    category: 'portfolio',
    badge: 'Portfolio',
    badgeColor: 'bg-neutral-800 text-neutral-300 border-neutral-700',
    description: 'Clean minimalist portfolio showcasing software projects, skill taxonomy, and contact links.',
    icon: 'UserCheck',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Developer Portfolio</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body class="bg-neutral-950 text-neutral-100 min-h-screen antialiased">

  <nav class="max-w-3xl mx-auto px-4 py-6 flex justify-between items-center text-xs">
    <span class="font-mono font-bold text-neutral-200">alex.dev</span>
    <div class="flex gap-4 text-neutral-400">
      <a href="#projects" class="hover:text-white transition-colors">Projects</a>
      <a href="#stack" class="hover:text-white transition-colors">Stack</a>
      <a href="mailto:alex@example.com" class="text-white hover:underline">Contact</a>
    </div>
  </nav>

  <main class="max-w-3xl mx-auto px-4 py-8 space-y-12">
    <div>
      <h1 class="text-3xl sm:text-5xl font-bold tracking-tight text-white">
        Alex Rivera
      </h1>
      <p class="text-neutral-400 text-sm sm:text-base mt-2 max-w-lg leading-relaxed">
        Full-stack software engineer building fast, accessible web applications and developer tools.
      </p>
    </div>

    <!-- Featured Projects -->
    <div id="projects" class="space-y-4">
      <h2 class="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Selected Work</h2>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-colors">
          <h3 class="font-bold text-white text-sm">HyperScale DB</h3>
          <p class="text-xs text-neutral-400 mt-1">Distributed real-time key-value cache engine built in Rust.</p>
          <div class="mt-4 flex gap-1.5">
            <span class="px-2 py-0.5 rounded bg-neutral-950 text-[10px] font-mono text-neutral-400">Rust</span>
            <span class="px-2 py-0.5 rounded bg-neutral-950 text-[10px] font-mono text-neutral-400">gRPC</span>
          </div>
        </div>

        <div class="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-colors">
          <h3 class="font-bold text-white text-sm">Prism UI Kit</h3>
          <p class="text-xs text-neutral-400 mt-1">Lightweight headless UI component primitive library for React.</p>
          <div class="mt-4 flex gap-1.5">
            <span class="px-2 py-0.5 rounded bg-neutral-950 text-[10px] font-mono text-neutral-400">TypeScript</span>
            <span class="px-2 py-0.5 rounded bg-neutral-950 text-[10px] font-mono text-neutral-400">Tailwind</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Technologies -->
    <div id="stack">
      <h2 class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Technologies</h2>
      <div class="flex flex-wrap gap-1.5">
        <span class="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-xs font-mono text-neutral-300">TypeScript</span>
        <span class="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-xs font-mono text-neutral-300">React & Next.js</span>
        <span class="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-xs font-mono text-neutral-300">Node.js</span>
        <span class="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-xs font-mono text-neutral-300">PostgreSQL</span>
        <span class="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-xs font-mono text-neutral-300">Docker</span>
      </div>
    </div>
  </main>

</body>
</html>`,
    css: `body {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}`,
    js: `console.log('Welcome to portfolio showcase.');`
  },
  {
    id: 'minimal-sandbox',
    name: 'Minimal Sandbox',
    category: 'minimal',
    badge: 'Starter',
    badgeColor: 'bg-neutral-800 text-neutral-400 border-neutral-800',
    description: 'Clean minimalist HTML5 / CSS3 / ES6 empty playground for rapid prototyping.',
    icon: 'FileCode',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sandbox Project</title>
</head>
<body>
  <div class="container">
    <h1>Hello, World!</h1>
    <p>Start coding your idea here.</p>
  </div>
</body>
</html>`,
    css: `body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #0A0B10;
  color: #F3F4F6;
}

.container {
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

p {
  color: #9CA3AF;
  font-size: 1rem;
}`,
    js: `console.log('Sandbox ready.');`
  }
];
