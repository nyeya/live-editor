// Ghana Starter Templates Gallery for Nyeya Code Studio

export interface StarterTemplate {
  id: string;
  name: string;
  category: 'fintech' | 'ecommerce' | 'governance' | 'events' | 'creative' | 'portfolio' | 'starter';
  badge: string;
  badgeColor: string;
  description: string;
  icon: string;
  html: string;
  css: string;
  js: string;
}

export const GHANA_STARTER_TEMPLATES: StarterTemplate[] = [
  {
    id: 'momo-checkout',
    name: 'MoMo & Paystack Checkout',
    category: 'fintech',
    badge: 'Fintech',
    badgeColor: 'bg-neutral-800 text-neutral-300 border-neutral-700',
    description: 'Interactive Mobile Money (MTN MoMo, Telecel Cash, AT Money) payment modal with live GH₵ calculation and USSD push simulation.',
    icon: 'Smartphone',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ghana Payment Gateway</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body class="bg-neutral-950 text-neutral-100 min-h-screen flex items-center justify-center p-4 antialiased">

  <!-- Payment Modal Container -->
  <div class="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden">
    
    <!-- Header -->
    <div class="p-6 border-b border-neutral-800 bg-neutral-900/80">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded bg-amber-500 flex items-center justify-center text-neutral-950 font-bold text-xs">₵</div>
          <span class="font-semibold text-sm tracking-tight text-neutral-200">Nyeya Pay</span>
        </div>
        <span class="text-[11px] text-neutral-500 font-mono">Invoice #GH-9021</span>
      </div>
      <div class="flex items-baseline justify-between">
        <div>
          <p class="text-xs text-neutral-400">Amount Due</p>
          <h2 class="text-2xl font-bold text-white tracking-tight mt-0.5">GH₵ 240.00</h2>
        </div>
        <div class="text-right">
          <span class="text-[11px] text-neutral-500">Merchant</span>
          <p class="text-xs font-medium text-neutral-300">Accra Digital Store</p>
        </div>
      </div>
    </div>

    <!-- Payment Methods -->
    <div class="p-6">
      <label class="block text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-2.5">Payment Network</label>
      
      <div class="grid grid-cols-3 gap-2 mb-5">
        <!-- MTN MoMo -->
        <button onclick="selectProvider('mtn')" id="tab-mtn" class="provider-btn active p-2.5 rounded-lg border border-amber-500/40 bg-neutral-800/80 flex flex-col items-center gap-1 transition-all">
          <span class="text-xs font-bold text-amber-400">MTN</span>
          <span class="text-[10px] text-neutral-400">MoMo</span>
        </button>

        <!-- Telecel Cash -->
        <button onclick="selectProvider('telecel')" id="tab-telecel" class="provider-btn p-2.5 rounded-lg border border-neutral-800 bg-neutral-900/40 flex flex-col items-center gap-1 transition-all hover:border-neutral-700">
          <span class="text-xs font-bold text-red-400">Telecel</span>
          <span class="text-[10px] text-neutral-400">Cash</span>
        </button>

        <!-- AT Money -->
        <button onclick="selectProvider('at')" id="tab-at" class="provider-btn p-2.5 rounded-lg border border-neutral-800 bg-neutral-900/40 flex flex-col items-center gap-1 transition-all hover:border-neutral-700">
          <span class="text-xs font-bold text-blue-400">AT</span>
          <span class="text-[10px] text-neutral-400">Money</span>
        </button>
      </div>

      <!-- Payment Form -->
      <form id="payment-form" onsubmit="handlePayment(event)" class="space-y-3.5">
        <div>
          <label class="block text-xs text-neutral-300 mb-1 font-medium">Mobile Money Number</label>
          <div class="relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-neutral-500">
              +233
            </span>
            <input 
              type="tel" 
              id="phone-input" 
              placeholder="024 123 4567" 
              required
              class="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2 pl-14 pr-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500 font-mono transition-colors"
              oninput="handlePhoneInput(this.value)"
            />
          </div>
          <p id="network-badge" class="text-[11px] text-amber-400 mt-1 flex items-center gap-1 font-mono">
            Network: MTN Mobile Money
          </p>
        </div>

        <div>
          <label class="block text-xs text-neutral-300 mb-1 font-medium">Customer Email</label>
          <input 
            type="email" 
            placeholder="kofi.mensah@gmail.com" 
            required 
            class="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2 px-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        <!-- Pay Button -->
        <button 
          type="submit" 
          id="pay-btn"
          class="w-full mt-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold py-2.5 px-4 rounded-lg transition-colors text-xs flex items-center justify-center gap-1.5"
        >
          <i class="fa-solid fa-lock text-[10px]"></i>
          <span>Authorize GH₵ 240.00</span>
        </button>
      </form>

      <!-- USSD Prompt Overlay -->
      <div id="ussd-prompt" class="hidden mt-3 p-3.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs">
        <div class="flex items-center gap-2.5">
          <div class="w-6 h-6 rounded bg-neutral-800 text-amber-400 flex items-center justify-center font-bold text-xs">
            <i class="fa-solid fa-mobile-screen"></i>
          </div>
          <div>
            <h4 class="font-medium text-neutral-200">USSD Push Sent</h4>
            <p class="text-[11px] text-neutral-500">Please authorize the prompt on your phone.</p>
          </div>
        </div>
      </div>

      <!-- Success Screen -->
      <div id="success-screen" class="hidden text-center py-4">
        <div class="w-10 h-10 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-2.5 text-sm">
          <i class="fa-solid fa-check"></i>
        </div>
        <h3 class="text-base font-semibold text-white">Payment Confirmed</h3>
        <p class="text-[11px] text-neutral-500 mt-0.5">Ref: <span class="font-mono text-neutral-300">GH-MOMO-789234</span></p>
        <div class="mt-3 p-2.5 bg-neutral-950 rounded-lg text-left text-xs space-y-1 border border-neutral-800/80 font-mono">
          <div class="flex justify-between"><span class="text-neutral-500">Amount:</span><span class="font-medium text-white">GH₵ 240.00</span></div>
          <div class="flex justify-between"><span class="text-neutral-500">Network:</span><span class="text-neutral-300" id="receipt-network">MTN MoMo</span></div>
          <div class="flex justify-between"><span class="text-neutral-500">Time:</span><span class="text-neutral-400" id="receipt-time"></span></div>
        </div>
        <button onclick="resetCheckout()" class="mt-4 w-full bg-neutral-800 hover:bg-neutral-700 text-white font-medium py-2 rounded-lg text-xs transition-colors">
          Make Another Payment
        </button>
      </div>

    </div>

    <!-- Security Footer -->
    <div class="px-6 py-2.5 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between text-[10px] text-neutral-500 font-mono">
      <span>256-bit Encrypted</span>
      <span>Accra, GH</span>
    </div>

  </div>

</body>
</html>`,
    css: `body {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}

.provider-btn.active {
  border-color: rgba(245, 158, 11, 0.5);
  background-color: rgba(245, 158, 11, 0.08);
}`,
    js: `let currentProvider = 'mtn';

function selectProvider(provider) {
  currentProvider = provider;
  document.querySelectorAll('.provider-btn').forEach(btn => {
    btn.classList.remove('active');
    btn.classList.add('border-neutral-800');
  });

  const activeBtn = document.getElementById('tab-' + provider);
  activeBtn.classList.add('active');
  activeBtn.classList.remove('border-neutral-800');

  const badge = document.getElementById('network-badge');
  if (provider === 'mtn') {
    badge.innerText = 'Network: MTN Mobile Money';
  } else if (provider === 'telecel') {
    badge.innerText = 'Network: Telecel Cash';
  } else {
    badge.innerText = 'Network: AT Money';
  }
}

function handlePhoneInput(val) {
  const clean = val.replace(/\\D/g, '');
  if (clean.startsWith('024') || clean.startsWith('054') || clean.startsWith('055') || clean.startsWith('059')) {
    selectProvider('mtn');
  } else if (clean.startsWith('020') || clean.startsWith('050')) {
    selectProvider('telecel');
  } else if (clean.startsWith('027') || clean.startsWith('057')) {
    selectProvider('at');
  }
}

function handlePayment(e) {
  e.preventDefault();
  const payBtn = document.getElementById('pay-btn');
  const ussdPrompt = document.getElementById('ussd-prompt');
  
  payBtn.disabled = true;
  payBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...';
  ussdPrompt.classList.remove('hidden');

  setTimeout(() => {
    ussdPrompt.classList.add('hidden');
    document.getElementById('payment-form').classList.add('hidden');
    document.getElementById('success-screen').classList.remove('hidden');
    
    document.getElementById('receipt-network').innerText = currentProvider.toUpperCase() + ' Cash';
    document.getElementById('receipt-time').innerText = new Date().toLocaleTimeString();
  }, 1800);
}

function resetCheckout() {
  document.getElementById('payment-form').classList.remove('hidden');
  document.getElementById('success-screen').classList.add('hidden');
  const payBtn = document.getElementById('pay-btn');
  payBtn.disabled = false;
  payBtn.innerHTML = '<i class="fa-solid fa-lock text-[10px]"></i> <span>Authorize GH₵ 240.00</span>';
}`
  },
  {
    id: 'ghana-sme-storefront',
    name: 'Ghana SME Storefront',
    category: 'ecommerce',
    badge: 'Commerce',
    badgeColor: 'bg-neutral-800 text-neutral-300 border-neutral-700',
    description: 'Minimalist Ghanaian boutique storefront with Cedis (GH₵) pricing, shopping drawer, and direct WhatsApp checkout.',
    icon: 'ShoppingBag',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ohemaa Crafts | Accra</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body class="bg-neutral-950 text-neutral-100 min-h-screen antialiased">

  <!-- Minimal Announcement -->
  <div class="border-b border-neutral-800 bg-neutral-900/60 text-neutral-400 text-xs py-1.5 px-4 text-center font-mono">
    Accra & Tema Delivery • MoMo Accepted
  </div>

  <!-- Navbar -->
  <header class="border-b border-neutral-800 bg-neutral-950/80 backdrop-blur sticky top-0 z-40">
    <div class="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="w-6 h-6 rounded bg-amber-500 text-neutral-950 flex items-center justify-center font-bold text-xs">O</span>
        <h1 class="font-semibold text-sm tracking-tight text-white">Ohemaa Crafts</h1>
      </div>

      <div class="flex items-center gap-2.5">
        <button onclick="toggleCart()" class="relative bg-neutral-900 hover:bg-neutral-800 text-neutral-300 px-3 py-1.5 rounded-lg border border-neutral-800 text-xs transition-colors flex items-center gap-1.5">
          <i class="fa-solid fa-bag-shopping text-xs"></i>
          <span>Bag</span>
          <span id="cart-count" class="font-mono text-amber-400 font-bold ml-0.5">0</span>
        </button>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="py-10 px-4 max-w-5xl mx-auto text-center">
    <h2 class="text-2xl sm:text-4xl font-bold tracking-tight text-white max-w-xl mx-auto">
      Handcrafted Ghanaian Goods
    </h2>
    <p class="text-neutral-400 text-xs sm:text-sm max-w-md mx-auto mt-2">
      Authentic Bonwire Kente cloth, organic raw Shea butter, and hand-woven Bolga baskets.
    </p>
  </section>

  <!-- Products Grid -->
  <main class="max-w-5xl mx-auto px-4 pb-12">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4" id="products-grid">
      <!-- Products loaded via JS -->
    </div>
  </main>

  <!-- Cart Drawer -->
  <div id="cart-drawer" class="fixed inset-y-0 right-0 w-full max-w-sm bg-neutral-900 border-l border-neutral-800 shadow-2xl z-50 transform translate-x-full transition-transform duration-200 flex flex-col">
    <div class="p-4 border-b border-neutral-800 flex items-center justify-between">
      <h3 class="font-semibold text-sm text-white">Shopping Bag</h3>
      <button onclick="toggleCart()" class="text-neutral-500 hover:text-white"><i class="fa-solid fa-xmark text-sm"></i></button>
    </div>

    <div class="flex-1 overflow-y-auto p-4 space-y-2" id="cart-items">
      <p class="text-neutral-600 text-center py-8 text-xs">Your bag is empty.</p>
    </div>

    <div class="p-4 border-t border-neutral-800 bg-neutral-950">
      <div class="flex justify-between items-center mb-3">
        <span class="text-xs text-neutral-400">Total:</span>
        <span class="text-base font-bold text-white font-mono" id="cart-subtotal">GH₵ 0.00</span>
      </div>
      <button onclick="orderViaWhatsApp()" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors text-xs">
        <i class="fa-brands fa-whatsapp text-sm"></i> Order via WhatsApp
      </button>
    </div>
  </div>

</body>
</html>`,
    css: `body {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}`,
    js: `const products = [
  {
    id: 1,
    name: 'Bonwire Kente Cloth',
    category: 'Textiles',
    price: 650,
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    name: 'Raw Shea Butter (1kg)',
    category: 'Skincare',
    price: 85,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    name: 'Bolgatanga Basket',
    category: 'Crafts',
    price: 180,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&auto=format&fit=crop&q=80'
  }
];

let cart = [];

function renderProducts() {
  const container = document.getElementById('products-grid');
  container.innerHTML = products.map(p => \`
    <div class="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden flex flex-col justify-between">
      <div class="h-40 bg-neutral-800 overflow-hidden">
        <img src="\${p.image}" alt="\${p.name}" class="w-full h-full object-cover">
      </div>
      <div class="p-4 flex-1 flex flex-col justify-between">
        <div>
          <span class="text-[10px] text-neutral-500 font-mono">\${p.category}</span>
          <h4 class="text-sm font-semibold text-white mt-0.5">\${p.name}</h4>
        </div>
        <div class="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between">
          <p class="text-sm font-bold text-white font-mono">GH₵ \${p.price}.00</p>
          <button onclick="addToCart(\${p.id})" class="bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-xs py-1.5 px-3 rounded transition-colors">
            Add
          </button>
        </div>
      </div>
    </div>
  \`).join('');
}

function addToCart(productId) {
  const item = products.find(p => p.id === productId);
  cart.push(item);
  updateCartUI();
}

function updateCartUI() {
  document.getElementById('cart-count').innerText = cart.length;
  const itemsContainer = document.getElementById('cart-items');
  if (cart.length === 0) {
    itemsContainer.innerHTML = '<p class="text-neutral-600 text-center py-8 text-xs">Your bag is empty.</p>';
    document.getElementById('cart-subtotal').innerText = 'GH₵ 0.00';
    return;
  }

  itemsContainer.innerHTML = cart.map((item, idx) => \`
    <div class="flex items-center justify-between p-2.5 bg-neutral-950 rounded border border-neutral-800 text-xs">
      <div>
        <h5 class="font-medium text-white">\${item.name}</h5>
        <p class="text-neutral-400 font-mono text-[11px]">GH₵ \${item.price}.00</p>
      </div>
      <button onclick="removeFromCart(\${idx})" class="text-neutral-500 hover:text-red-400 text-xs p-1">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  \`).join('');

  const total = cart.reduce((sum, i) => sum + i.price, 0);
  document.getElementById('cart-subtotal').innerText = 'GH₵ ' + total.toLocaleString() + '.00';
}

function removeFromCart(idx) {
  cart.splice(idx, 1);
  updateCartUI();
}

function toggleCart() {
  document.getElementById('cart-drawer').classList.toggle('translate-x-full');
}

function orderViaWhatsApp() {
  if (cart.length === 0) return;
  const total = cart.reduce((sum, i) => sum + i.price, 0);
  const itemsList = cart.map(i => '- ' + i.name + ' (GH₵ ' + i.price + ')').join('%0A');
  const message = \`Hello Ohemaa Crafts! I want to order:%0A\${itemsList}%0A%0ATotal: GH₵ \${total}\`;
  window.open(\`https://wa.me/233241234567?text=\${message}\`, '_blank');
}

document.addEventListener('DOMContentLoaded', renderProducts);`
  },
  {
    id: 'ghana-card-verifier',
    name: 'Ghana Card ID Verification UI',
    category: 'governance',
    badge: 'National ID',
    badgeColor: 'bg-neutral-800 text-neutral-300 border-neutral-700',
    description: 'Biometric Ghana National ID Card (NIA) verification widget with format checking and digital address validation.',
    icon: 'CreditCard',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ghana Card NIA Verification</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body class="bg-neutral-950 text-neutral-100 min-h-screen flex items-center justify-center p-4 antialiased">

  <div class="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-2xl">
    
    <!-- Header -->
    <div class="flex items-center justify-between pb-4 border-b border-neutral-800">
      <div>
        <h2 class="font-semibold text-base text-white">Ghana Card Verification</h2>
        <p class="text-xs text-neutral-500">National Identification Authority (NIA) API</p>
      </div>
      <span class="text-[10px] font-mono bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded border border-neutral-700">
        Sandbox
      </span>
    </div>

    <!-- Ghana Card Mini Preview -->
    <div class="my-5 p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-[10px] font-bold text-neutral-400 tracking-wider uppercase">Republic of Ghana</span>
        <span class="text-[10px] font-mono text-neutral-500">NIA-GHA</span>
      </div>

      <div class="flex gap-3 items-center">
        <div class="w-12 h-14 bg-neutral-800 rounded flex items-center justify-center text-neutral-500 text-lg">
          <i class="fa-solid fa-user"></i>
        </div>
        <div class="space-y-0.5 font-mono text-xs">
          <p id="card-pin-display" class="font-bold text-amber-400">GHA-723849102-4</p>
          <p class="text-neutral-200">KWAME MENSAH ADDO</p>
          <p class="text-[10px] text-neutral-500">DOB: 14 MAR 1994 • GENDER: M</p>
        </div>
      </div>
    </div>

    <!-- Form Input -->
    <div class="space-y-3">
      <div>
        <label class="block text-xs font-medium text-neutral-300 mb-1">Personal ID Number (PIN)</label>
        <div class="relative flex gap-2">
          <input 
            type="text" 
            id="pin-input"
            value="GHA-723849102-4"
            placeholder="GHA-XXXXXXXXX-X"
            class="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg py-2 px-3 text-xs font-mono text-white focus:outline-none focus:border-amber-500"
            oninput="formatCardPin(this)"
          />
          <button onclick="verifyCard()" class="bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-xs py-2 px-3.5 rounded-lg border border-neutral-700 transition-colors">
            Verify
          </button>
        </div>
      </div>

      <!-- Result Box -->
      <div id="result-box" class="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-1.5 text-xs font-mono">
        <div class="flex justify-between text-neutral-400"><span>Status:</span> <span class="text-emerald-400 font-medium">Valid PIN</span></div>
        <div class="flex justify-between text-neutral-400"><span>Issuing Authority:</span> <span class="text-neutral-200">NIA Greater Accra</span></div>
        <div class="flex justify-between text-neutral-400"><span>Digital Address:</span> <span class="text-neutral-200">GA-183-9920</span></div>
      </div>
    </div>

  </div>

</body>
</html>`,
    css: `body {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}`,
    js: `function formatCardPin(input) {
  document.getElementById('card-pin-display').innerText = input.value.toUpperCase() || 'GHA-000000000-0';
}

function verifyCard() {
  const resultBox = document.getElementById('result-box');
  resultBox.innerHTML = '<div class="text-center text-neutral-400 py-1 text-xs">Querying NIA Database...</div>';

  setTimeout(() => {
    resultBox.innerHTML = \`
      <div class="flex justify-between text-neutral-400"><span>Status:</span> <span class="text-emerald-400 font-medium">Verified Biometric Match</span></div>
      <div class="flex justify-between text-neutral-400"><span>Name:</span> <span class="text-white">KWAME MENSAH ADDO</span></div>
      <div class="flex justify-between text-neutral-400"><span>Address:</span> <span class="text-neutral-300">GA-183-9920</span></div>
    \`;
  }, 1000);
}`
  },
  {
    id: 'accra-tech-summit',
    name: 'Accra Tech Summit & Meetup',
    category: 'events',
    badge: 'Events',
    badgeColor: 'bg-neutral-800 text-neutral-300 border-neutral-700',
    description: 'Conference landing page for Ghanaian tech events with countdown timer and speaker showcase.',
    icon: 'Calendar',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Accra Tech Summit 2026</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body class="bg-neutral-950 text-neutral-100 min-h-screen antialiased">

  <!-- Header -->
  <header class="border-b border-neutral-800 px-6 py-3.5 flex items-center justify-between max-w-5xl mx-auto">
    <div class="flex items-center gap-2">
      <span class="font-bold text-sm text-white">ACCRA TECH 26</span>
    </div>
    <div class="flex items-center gap-3 text-xs">
      <span class="text-neutral-400 hidden sm:inline">AICC, Accra</span>
      <button class="bg-neutral-100 hover:bg-white text-neutral-950 font-semibold py-1.5 px-3 rounded text-xs transition-colors">
        Register Pass
      </button>
    </div>
  </header>

  <!-- Hero Banner -->
  <section class="py-16 px-4 text-center max-w-3xl mx-auto">
    <span class="inline-block px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 text-xs font-mono mb-4">
      Accra, Ghana • October 2026
    </span>
    <h1 class="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
      The West African Developer & AI Gathering
    </h1>
    <p class="text-neutral-400 text-sm max-w-lg mx-auto mt-3">
      Connecting 2,000+ software engineers, fintech founders, and designers across Africa.
    </p>

    <!-- Countdown Timer -->
    <div class="grid grid-cols-4 gap-2 max-w-xs mx-auto my-6 font-mono text-center">
      <div class="bg-neutral-900 border border-neutral-800 p-2 rounded"><span class="text-lg font-bold text-white">18</span><p class="text-[9px] text-neutral-500">Days</p></div>
      <div class="bg-neutral-900 border border-neutral-800 p-2 rounded"><span class="text-lg font-bold text-white">08</span><p class="text-[9px] text-neutral-500">Hours</p></div>
      <div class="bg-neutral-900 border border-neutral-800 p-2 rounded"><span class="text-lg font-bold text-white">45</span><p class="text-[9px] text-neutral-500">Mins</p></div>
      <div class="bg-neutral-900 border border-neutral-800 p-2 rounded"><span id="secs" class="text-lg font-bold text-amber-400">30</span><p class="text-[9px] text-neutral-500">Secs</p></div>
    </div>
  </section>

  <!-- Speakers -->
  <section class="max-w-5xl mx-auto px-4 pb-16">
    <h3 class="text-sm font-semibold text-neutral-400 uppercase tracking-wider text-center mb-6">Keynote Speakers</h3>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="bg-neutral-900 border border-neutral-800 p-4 rounded-lg text-center">
        <h4 class="font-semibold text-white text-sm">Kojo Mensah</h4>
        <p class="text-xs text-neutral-400">Staff Engineer • Paystack GH</p>
      </div>
      <div class="bg-neutral-900 border border-neutral-800 p-4 rounded-lg text-center">
        <h4 class="font-semibold text-white text-sm">Akosua Frimpong</h4>
        <p class="text-xs text-neutral-400">VP Engineering • Hubtel</p>
      </div>
      <div class="bg-neutral-900 border border-neutral-800 p-4 rounded-lg text-center">
        <h4 class="font-semibold text-white text-sm">Dr. Kwesi Asante</h4>
        <p class="text-xs text-neutral-400">Founder • Accra Robotics</p>
      </div>
    </div>
  </section>

</body>
</html>`,
    css: `body {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}`,
    js: `let count = 30;
setInterval(() => {
  count = count > 0 ? count - 1 : 59;
  const el = document.getElementById('secs');
  if (el) el.innerText = count < 10 ? '0' + count : count;
}, 1000);`
  },
  {
    id: 'adinkra-canvas-art',
    name: 'Adinkra & Kente Generative Art',
    category: 'creative',
    badge: 'Creative',
    badgeColor: 'bg-neutral-800 text-neutral-300 border-neutral-700',
    description: 'Algorithmic geometric canvas generator rendering Ghanaian traditional Adinkra symbols.',
    icon: 'Palette',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Adinkra Canvas Art</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&display=swap" rel="stylesheet">
</head>
<body class="bg-neutral-950 text-neutral-100 min-h-screen flex flex-col items-center justify-center p-4 antialiased">

  <div class="w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-xl p-5 shadow-2xl text-center">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="font-semibold text-sm text-white">Adinkra Geometry</h2>
        <p class="text-xs text-neutral-500">HTML5 Generative Canvas</p>
      </div>
      <div class="flex gap-1.5">
        <button onclick="changePattern('kente')" class="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs py-1 px-2.5 rounded">Kente</button>
        <button onclick="changePattern('gyenyame')" class="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs py-1 px-2.5 rounded">Gye Nyame</button>
      </div>
    </div>

    <div class="rounded-lg overflow-hidden border border-neutral-800 bg-neutral-950 flex items-center justify-center">
      <canvas id="artCanvas" width="540" height="340" class="max-w-full"></canvas>
    </div>
  </div>

</body>
</html>`,
    css: `body {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}`,
    js: `const canvas = document.getElementById('artCanvas');
const ctx = canvas.getContext('2d');

function drawKente() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const colors = ['#EE9B00', '#10B981', '#EF4444', '#1E1B4B', '#F4B942'];
  const tileSize = 36;

  for (let x = 0; x < canvas.width; x += tileSize) {
    for (let y = 0; y < canvas.height; y += tileSize) {
      ctx.fillStyle = colors[(x / tileSize + y / tileSize) % colors.length];
      ctx.fillRect(x, y, tileSize, tileSize);
    }
  }
}

function drawGyeNyame() {
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#EE9B00';
  ctx.fillStyle = '#EE9B00';
  ctx.lineWidth = 10;

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  ctx.beginPath();
  ctx.arc(cx, cy, 25, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cx - 40, cy - 40, 60, 0.5 * Math.PI, 1.8 * Math.PI);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx + 40, cy + 40, 60, 1.5 * Math.PI, 2.8 * Math.PI);
  ctx.stroke();
}

function changePattern(mode) {
  if (mode === 'kente') drawKente();
  else drawGyeNyame();
}

drawKente();`
  },
  {
    id: 'ghana-dev-portfolio',
    name: 'Modern Ghanaian Dev Portfolio',
    category: 'portfolio',
    badge: 'Portfolio',
    badgeColor: 'bg-neutral-800 text-neutral-300 border-neutral-700',
    description: 'Sleek dark portfolio showcasing full-stack skills and Accra tech ecosystem projects.',
    icon: 'UserCheck',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kofi Mensah | Engineer</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body class="bg-neutral-950 text-neutral-100 min-h-screen antialiased">

  <nav class="max-w-3xl mx-auto px-4 py-6 flex justify-between items-center text-xs">
    <span class="font-mono text-neutral-200 font-semibold">kofi.dev</span>
    <div class="flex gap-4 text-neutral-400">
      <a href="#work" class="hover:text-white transition-colors">Work</a>
      <a href="https://wa.me/233241234567" target="_blank" class="text-neutral-200 hover:underline">Contact</a>
    </div>
  </nav>

  <main class="max-w-3xl mx-auto px-4 py-8">
    <h1 class="text-2xl sm:text-4xl font-bold text-white tracking-tight">
      Kofi Mensah
    </h1>
    <p class="text-neutral-400 text-sm mt-2 max-w-lg leading-relaxed">
      Full-Stack Software Engineer based in Accra, Ghana. Building reliable web applications, payments infrastructure, and developer tools.
    </p>

    <div class="mt-8">
      <h2 class="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">Technologies</h2>
      <div class="flex flex-wrap gap-1.5">
        <span class="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-xs font-mono text-neutral-300">TypeScript</span>
        <span class="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-xs font-mono text-neutral-300">React / Next.js</span>
        <span class="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-xs font-mono text-neutral-300">Node.js</span>
        <span class="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-xs font-mono text-neutral-300">MoMo / Paystack APIs</span>
      </div>
    </div>
  </main>

</body>
</html>`,
    css: `body {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}`,
    js: `console.log('Welcome to Kofi Mensah portfolio.');`
  }
];
