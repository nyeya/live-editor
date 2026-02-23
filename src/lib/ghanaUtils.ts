// Ghana Tech & Ecosystem Utilities for Nyeya Code Studio

export interface AdinkraSymbol {
  name: string;
  literal: string;
  meaning: string;
  category: string;
  svg: string;
}

export const ADINKRA_SYMBOLS: AdinkraSymbol[] = [
  {
    name: "Gye Nyame",
    literal: "Except for God",
    meaning: "Supreme power, omnipotence, and the immortality of God",
    category: "Spiritual",
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full" fill="currentColor">
  <path d="M50 5 C35 5 25 15 25 30 C25 45 40 50 40 50 C40 50 25 55 25 70 C25 85 35 95 50 95 C65 95 75 85 75 70 C75 55 60 50 60 50 C60 50 75 45 75 30 C75 15 65 5 50 5 Z M50 18 C58 18 63 23 63 30 C63 38 55 42 50 44 C45 42 37 38 37 30 C37 23 42 18 50 18 Z M50 82 C42 82 37 77 37 70 C37 62 45 58 50 56 C55 58 63 62 63 70 C63 77 58 82 50 82 Z" />
  <circle cx="50" cy="50" r="6" />
</svg>`
  },
  {
    name: "Sankofa",
    literal: "Go back and get it",
    meaning: "Learning from the past to build a prosperous future",
    category: "Wisdom",
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full" fill="currentColor">
  <path d="M48 20 C35 20 25 30 25 45 C25 65 45 80 50 85 C55 80 75 65 75 45 C75 30 65 20 52 20 C46 20 40 24 37 30 C34 24 40 15 50 10 C65 10 82 25 82 46 C82 72 54 90 50 92 C46 90 18 72 18 46 C18 25 34 10 50 10 C50 14 48 18 48 20 Z" />
  <circle cx="50" cy="38" r="8" />
  <path d="M50 48 C45 48 42 52 42 56 C42 62 58 62 58 56 C58 52 55 48 50 48 Z" />
</svg>`
  },
  {
    name: "Dwennimmen",
    literal: "Ram's Horns",
    meaning: "Humility combined with immense strength",
    category: "Character",
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full" fill="currentColor">
  <path d="M50 30 C40 10 15 15 15 35 C15 55 40 60 50 80 C60 60 85 55 85 35 C85 15 60 10 50 30 Z M30 35 C30 25 42 22 47 32 C40 45 28 45 30 35 Z M70 35 C72 45 60 45 53 32 C58 22 70 25 70 35 Z" />
</svg>`
  },
  {
    name: "Aya",
    literal: "The Fern",
    meaning: "Endurance, defiance, and resourcefulness",
    category: "Perseverance",
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full" fill="currentColor">
  <path d="M50 10 L50 90 M50 25 C65 15 75 25 50 35 M50 35 C35 25 25 35 50 45 M50 45 C70 35 80 45 50 60 M50 60 C30 50 20 60 50 75 M50 75 C68 68 76 76 50 85" stroke="currentColor" stroke-width="6" stroke-linecap="round" fill="none"/>
</svg>`
  },
  {
    name: "Fawohodie",
    literal: "Independence",
    meaning: "Freedom, emancipation, and self-determination",
    category: "Freedom",
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full" fill="currentColor">
  <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" stroke-width="6" />
  <path d="M50 18 L50 82 M18 50 L82 50" stroke="currentColor" stroke-width="6" />
  <circle cx="50" cy="50" r="16" fill="none" stroke="currentColor" stroke-width="6" />
</svg>`
  },
  {
    name: "Mate Masie",
    literal: "What I hear, I keep",
    meaning: "Wisdom, knowledge, and prudent understanding",
    category: "Wisdom",
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full" fill="currentColor">
  <circle cx="32" cy="32" r="16" fill="none" stroke="currentColor" stroke-width="6"/>
  <circle cx="68" cy="32" r="16" fill="none" stroke="currentColor" stroke-width="6"/>
  <circle cx="32" cy="68" r="16" fill="none" stroke="currentColor" stroke-width="6"/>
  <circle cx="68" cy="68" r="16" fill="none" stroke="currentColor" stroke-width="6"/>
  <path d="M32 48 L32 52 M68 48 L68 52 M48 32 L52 32 M48 68 L52 68" stroke="currentColor" stroke-width="6"/>
</svg>`
  }
];

// Ghana Mobile Network Carrier detection
export interface GhanaCarrier {
  name: string;
  code: 'mtn' | 'telecel' | 'at' | 'unknown';
  color: string;
  bgColor: string;
  badge: string;
}

export function detectGhanaCarrier(phoneNumber: string): GhanaCarrier {
  const clean = phoneNumber.replace(/[\s+-]/g, '');
  let prefix = '';
  
  if (clean.startsWith('233')) {
    prefix = '0' + clean.slice(3, 5);
  } else if (clean.startsWith('0')) {
    prefix = clean.slice(0, 3);
  }

  const mtnPrefixes = ['024', '025', '053', '054', '055', '059'];
  const telecelPrefixes = ['020', '050'];
  const atPrefixes = ['026', '027', '056', '057'];

  if (mtnPrefixes.includes(prefix)) {
    return { name: 'MTN MoMo', code: 'mtn', color: '#EAB308', bgColor: 'rgba(234, 179, 8, 0.15)', badge: 'MTN Mobile Money' };
  }
  if (telecelPrefixes.includes(prefix)) {
    return { name: 'Telecel Cash', code: 'telecel', color: '#EF4444', bgColor: 'rgba(239, 68, 68, 0.15)', badge: 'Telecel Cash' };
  }
  if (atPrefixes.includes(prefix)) {
    return { name: 'AT Money', code: 'at', color: '#3B82F6', bgColor: 'rgba(59, 130, 246, 0.15)', badge: 'AT Money' };
  }

  return { name: 'Ghana Telecom', code: 'unknown', color: '#9CA3AF', bgColor: 'rgba(156, 163, 175, 0.15)', badge: 'Local Network' };
}

// Currency Formatter
export function formatGhanaCedi(amount: number): string {
  return `GH₵ ${amount.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Ghana Digital Address Validator
export function isValidGhanaAddress(address: string): boolean {
  // Typical formats: AK-484-9321, GA-183-9920, WS-204-1029
  const pattern = /^[A-Z]{2}-\d{3,4}-\d{4}$/i;
  return pattern.test(address.trim());
}

// Ghana Cultural & Tech Lorem Generator
export const GHANA_LOREM_WORDS = [
  "Akwaaba", "Accra", "Kumasi", "Kejetia", "Makola", "Osu", "Labadi", "Jamestown",
  "Chale Wote", "Kente", "Adinkra", "Black Star", "Gold Coast", "Cape Coast",
  "Elmina", "Aburi", "Volta", "Dodi Island", "Kakum", "Boti Falls", "Mole Park",
  "Jollof", "Waakye", "Kenkey", "Fufu", "Kelewele", "Banku", "Red Red", "Bofrot",
  "MoMo", "Paystack", "Hubtel", "Telecel", "MTN", "Fintech", "DevCongress",
  "Silicon Accra", "Afrochella", "AfroFuture", "Independence Square", "Kwame Nkrumah",
  "Yaa Asantewaa", "Sankofa", "Gye Nyame", "Ashanti", "Ga-Adangbe", "Fante", "Ewe", "Dagbon"
];

export function generateGhanaLorem(wordCount: number = 30): string {
  const result: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    const word = GHANA_LOREM_WORDS[Math.floor(Math.random() * GHANA_LOREM_WORDS.length)];
    if (i === 0 || (i > 0 && Math.random() < 0.15)) {
      result.push(word);
    } else {
      result.push(word.toLowerCase());
    }
  }
  let sentence = result.join(' ');
  // Capitalize first letter and add period
  sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
  if (!sentence.endsWith('.')) sentence += '.';
  return sentence;
}

// Code beautifier & Formatter (HTML, CSS, JS)
export function beautifyCode(code: string, language: 'html' | 'css' | 'javascript'): string {
  if (!code || typeof code !== 'string') return code;
  
  if (language === 'html') {
    let formatted = '';
    let indent = 0;
    const tab = '  ';
    
    // Simple HTML formatter regex
    const tokens = code
      .replace(/>\s*</g, '><')
      .replace(/</g, '~::~<')
      .replace(/>/g, '>~::~')
      .split('~::~')
      .filter(t => t.trim().length > 0);

    for (let token of tokens) {
      token = token.trim();
      if (token.startsWith('</')) {
        indent = Math.max(0, indent - 1);
        formatted += tab.repeat(indent) + token + '\n';
      } else if (token.startsWith('<') && !token.startsWith('<!') && !token.endsWith('/>') && !token.includes('</') && !token.startsWith('<img') && !token.startsWith('<input') && !token.startsWith('<br') && !token.startsWith('<hr') && !token.startsWith('<meta') && !token.startsWith('<link')) {
        formatted += tab.repeat(indent) + token + '\n';
        indent++;
      } else {
        formatted += tab.repeat(indent) + token + '\n';
      }
    }
    return formatted.trim();
  }

  if (language === 'css') {
    return code
      .replace(/\s*{\s*/g, ' {\n  ')
      .replace(/;\s*/g, ';\n  ')
      .replace(/\s*}\s*/g, '\n}\n\n')
      .replace(/\n\s*\n\s*\n/g, '\n\n')
      .trim();
  }

  if (language === 'javascript') {
    // Basic JS indentation formatting
    const lines = code.split('\n');
    let indent = 0;
    const tab = '  ';
    const result: string[] = [];

    for (let line of lines) {
      const trimmed = line.trim();
      if (!trimmed) {
        result.push('');
        continue;
      }
      if (trimmed.startsWith('}') || trimmed.startsWith(']') || trimmed.startsWith(')')) {
        indent = Math.max(0, indent - 1);
      }
      result.push(tab.repeat(indent) + trimmed);
      if (trimmed.endsWith('{') || trimmed.endsWith('[') || trimmed.endsWith('(')) {
        indent++;
      }
    }
    return result.join('\n');
  }

  return code;
}
