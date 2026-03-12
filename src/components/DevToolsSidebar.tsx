import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { 
  Palette, 
  Copy, 
  Type, 
  Box, 
  Sparkles,
  Phone,
  Code2,
  Check,
  Globe
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { 
  ADINKRA_SYMBOLS, 
  detectGhanaCarrier, 
  generateGhanaLorem, 
  formatGhanaCedi 
} from '../lib/ghanaUtils';

interface DevToolsSidebarProps {
  onColorSelect: (color: string) => void;
  onCodeInsert: (code: string) => void;
}

export function DevToolsSidebar({ onColorSelect, onCodeInsert }: DevToolsSidebarProps) {
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Color Picker State
  const [selectedColor, setSelectedColor] = useState('#EE9B00');
  const [colorFormat, setColorFormat] = useState<'hex' | 'rgb' | 'hsl'>('hex');
  
  // Ghana Dev Tools State
  const [ghPhone, setGhPhone] = useState('0241234567');
  const [cediAmount, setCediAmount] = useState('250');
  const [waNumber, setWaNumber] = useState('233241234567');
  const [waMessage, setWaMessage] = useState('Hello, I would like to place an order.');

  // Box Shadow State
  const [shadowX, setShadowX] = useState([0]);
  const [shadowY, setShadowY] = useState([4]);
  const [shadowBlur, setShadowBlur] = useState([16]);
  const [shadowSpread, setShadowSpread] = useState([0]);
  const [shadowColor, setShadowColor] = useState('#000000');
  const [shadowOpacity, setShadowOpacity] = useState([0.3]);
  
  // Border Radius State
  const [borderRadius, setBorderRadius] = useState([12]);
  
  // Glassmorphism State
  const [glassBlur, setGlassBlur] = useState([12]);
  const [glassOpacity, setGlassOpacity] = useState([0.6]);

  // Gradient State
  const [gradientColor1, setGradientColor1] = useState('#EE9B00');
  const [gradientColor2, setGradientColor2] = useState('#10B981');
  const [gradientDirection, setGradientDirection] = useState('135deg');
  
  // Lorem Ipsum
  const [loremMode, setLoremMode] = useState<'ghana' | 'classic'>('ghana');
  const [loremWords, setLoremWords] = useState(30);

  const copyToClipboard = (text: string, id?: string) => {
    navigator.clipboard.writeText(text);
    if (id) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    }
    toast({
      title: "Copied",
      description: "Code snippet copied to clipboard."
    });
  };

  const convertColor = (hex: string, format: 'hex' | 'rgb' | 'hsl') => {
    if (!hex.startsWith('#') || hex.length < 7) return hex;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    switch (format) {
      case 'rgb':
        return `rgb(${r}, ${g}, ${b})`;
      case 'hsl': {
        const rNorm = r / 255;
        const gNorm = g / 255;
        const bNorm = b / 255;
        const max = Math.max(rNorm, gNorm, bNorm);
        const min = Math.min(rNorm, gNorm, bNorm);
        let h = 0, s = 0, l = (max + min) / 2;

        if (max !== min) {
          const d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
            case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
            case gNorm: h = (bNorm - rNorm) / d + 2; break;
            case bNorm: h = (rNorm - gNorm) / d + 4; break;
          }
          h /= 6;
        }
        return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
      }
      default:
        return hex;
    }
  };

  const generateBoxShadow = () => {
    const r = parseInt(shadowColor.slice(1, 3) || '0', 16);
    const g = parseInt(shadowColor.slice(3, 5) || '0', 16);
    const b = parseInt(shadowColor.slice(5, 7) || '0', 16);
    const rgba = `rgba(${r}, ${g}, ${b}, ${shadowOpacity[0]})`;
    return `${shadowX[0]}px ${shadowY[0]}px ${shadowBlur[0]}px ${shadowSpread[0]}px ${rgba}`;
  };

  const generateGlassStyle = () => {
    return `background: rgba(18, 18, 24, ${glassOpacity[0]});
backdrop-filter: blur(${glassBlur[0]}px);
-webkit-backdrop-filter: blur(${glassBlur[0]}px);
border: 1px solid rgba(255, 255, 255, 0.08);
border-radius: ${borderRadius[0]}px;`;
  };

  const generateGradient = () => {
    return `linear-gradient(${gradientDirection}, ${gradientColor1}, ${gradientColor2})`;
  };

  const generateClassicLorem = (words: number) => {
    const loremText = "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur";
    const wordsArray = loremText.split(' ');
    const result = [];
    for (let i = 0; i < words; i++) {
      result.push(wordsArray[i % wordsArray.length]);
    }
    return result.join(' ') + '.';
  };

  const palettes = [
    { 
      name: 'Ghana Gold Coast', 
      colors: ['#0A0B10', '#EE9B00', '#10B981', '#EF4444', '#F4B942'] 
    },
    { 
      name: 'Royal Heritage', 
      colors: ['#D97706', '#991B1B', '#1E3A8A', '#065F46', '#FBBF24'] 
    },
    { 
      name: 'Accra Coastal', 
      colors: ['#0F172A', '#0284C7', '#38BDF8', '#F59E0B', '#F97316'] 
    },
    { 
      name: 'Fintech Essentials', 
      colors: ['#F59E0B', '#DC2626', '#0284C7', '#10B981', '#64748B'] 
    }
  ];

  const commonSnippets = [
    {
      title: 'MoMo Payment Card',
      category: 'Fintech',
      code: `<div class="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-white flex justify-between items-center">
  <div>
    <span class="text-xs text-amber-400 font-medium">MTN MoMo</span>
    <h4 class="text-base font-bold">GH₵ 250.00</h4>
  </div>
  <button class="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold px-3 py-1.5 rounded-lg text-xs">
    Pay Now
  </button>
</div>`
    },
    {
      title: 'WhatsApp Order Button',
      category: 'Commerce',
      code: `<a href="https://wa.me/233241234567?text=Hello%20I%20want%20to%20order" target="_blank" 
   class="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 px-4 rounded-lg text-xs transition-all">
  <i class="fa-brands fa-whatsapp text-sm"></i>
  <span>Order via WhatsApp</span>
</a>`
    },
    {
      title: 'Frosted Glass Surface',
      category: 'UI',
      code: `<div class="p-5 rounded-xl bg-neutral-900/70 backdrop-blur-md border border-white/10 shadow-lg text-white">
  <h3 class="text-base font-semibold">Glass Container</h3>
  <p class="text-neutral-400 text-xs mt-1">Sleek translucent container with subtle border.</p>
</div>`
    },
    {
      title: 'Dark Mode Switcher',
      category: 'JS',
      code: `function toggleTheme() {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
}`
    },
    {
      title: 'Responsive Card Grid',
      category: 'CSS',
      code: `display: grid;
grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
gap: 1rem;`
    }
  ];

  const currentCarrier = detectGhanaCarrier(ghPhone);

  return (
    <div className="h-full flex flex-col bg-card text-foreground select-none font-sans text-xs">
      {/* Header */}
      <div className="h-10 px-3 border-b border-border/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-xs text-neutral-200">DevTools</span>
          <span className="text-[10px] text-neutral-500 font-mono">Ghana Kit</span>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3">
          <Tabs defaultValue="ghana" className="space-y-3">
            <TabsList className="grid w-full grid-cols-5 bg-neutral-900/80 p-0.5 rounded-lg border border-neutral-800">
              <TabsTrigger value="ghana" className="text-[11px] h-6 data-[state=active]:bg-neutral-800 data-[state=active]:text-white font-medium">
                Ghana
              </TabsTrigger>
              <TabsTrigger value="colors" className="text-[11px] h-6 data-[state=active]:bg-neutral-800 data-[state=active]:text-white">
                <Palette className="h-3 w-3" />
              </TabsTrigger>
              <TabsTrigger value="effects" className="text-[11px] h-6 data-[state=active]:bg-neutral-800 data-[state=active]:text-white">
                <Box className="h-3 w-3" />
              </TabsTrigger>
              <TabsTrigger value="snippets" className="text-[11px] h-6 data-[state=active]:bg-neutral-800 data-[state=active]:text-white">
                <Code2 className="h-3 w-3" />
              </TabsTrigger>
              <TabsTrigger value="content" className="text-[11px] h-6 data-[state=active]:bg-neutral-800 data-[state=active]:text-white">
                <Type className="h-3 w-3" />
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: GHANA TOOLS */}
            <TabsContent value="ghana" className="space-y-3">
              
              {/* MoMo Carrier Detector */}
              <div className="p-3 rounded-lg border border-border/70 bg-neutral-900/40 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5">
                    <Phone className="h-3 w-3 text-neutral-400" /> MoMo Carrier Detector
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                    {currentCarrier.name}
                  </span>
                </div>

                <div>
                  <Label className="text-[10px] text-neutral-500">Phone / MoMo Number</Label>
                  <Input
                    value={ghPhone}
                    onChange={(e) => setGhPhone(e.target.value)}
                    placeholder="024XXXXXXX"
                    className="h-7 text-xs font-mono bg-neutral-900 border-neutral-800 mt-1"
                  />
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  className="w-full text-xs h-7 border-neutral-800 hover:bg-neutral-800 text-neutral-300"
                  onClick={() => {
                    const snippet = `<div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800">
  <span class="text-xs font-medium text-amber-400">${currentCarrier.name}</span>
  <span class="text-xs font-mono text-neutral-300">${ghPhone}</span>
</div>`;
                    onCodeInsert(snippet);
                    copyToClipboard(snippet);
                  }}
                >
                  <Copy className="h-3 w-3 mr-1.5 text-neutral-400" /> Insert Component
                </Button>
              </div>

              {/* Ghana Cedi Formatter */}
              <div className="p-3 rounded-lg border border-border/70 bg-neutral-900/40 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-200">Cedi Price Component</span>
                  <span className="font-mono text-xs font-semibold text-amber-400">
                    {formatGhanaCedi(parseFloat(cediAmount) || 0)}
                  </span>
                </div>

                <div>
                  <Label className="text-[10px] text-neutral-500">Amount (GH₵)</Label>
                  <Input
                    type="number"
                    value={cediAmount}
                    onChange={(e) => setCediAmount(e.target.value)}
                    className="h-7 text-xs font-mono bg-neutral-900 border-neutral-800 mt-1"
                  />
                </div>

                <Button
                  size="sm"
                  variant="secondary"
                  className="w-full text-xs h-7 bg-neutral-800 hover:bg-neutral-700 text-neutral-200"
                  onClick={() => {
                    const snippet = `<div class="inline-flex items-baseline gap-1 bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-lg">
  <span class="text-[11px] text-neutral-400 font-medium">GH₵</span>
  <span class="text-sm font-bold text-neutral-100 font-mono">${parseFloat(cediAmount || '0').toFixed(2)}</span>
</div>`;
                    onCodeInsert(snippet);
                    copyToClipboard(snippet);
                  }}
                >
                  <Copy className="h-3 w-3 mr-1.5 text-neutral-400" /> Insert Price Tag
                </Button>
              </div>

              {/* WhatsApp CTA Generator */}
              <div className="p-3 rounded-lg border border-border/70 bg-neutral-900/40 space-y-2.5">
                <span className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5">
                  <Globe className="h-3 w-3 text-neutral-400" /> WhatsApp Direct Order Button
                </span>

                <div className="space-y-1.5">
                  <div>
                    <Label className="text-[10px] text-neutral-500">Number (233XXXXXXXXX)</Label>
                    <Input
                      value={waNumber}
                      onChange={(e) => setWaNumber(e.target.value)}
                      className="h-7 text-xs font-mono bg-neutral-900 border-neutral-800 mt-0.5"
                    />
                  </div>
                  <div>
                    <Label className="text-[10px] text-neutral-500">Order Message</Label>
                    <Input
                      value={waMessage}
                      onChange={(e) => setWaMessage(e.target.value)}
                      className="h-7 text-xs bg-neutral-900 border-neutral-800 mt-0.5"
                    />
                  </div>
                </div>

                <Button
                  size="sm"
                  className="w-full text-xs h-7 bg-neutral-800 hover:bg-neutral-700 text-neutral-200"
                  onClick={() => {
                    const encoded = encodeURIComponent(waMessage);
                    const snippet = `<a href="https://wa.me/${waNumber}?text=${encoded}" target="_blank" class="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 px-3.5 rounded-lg text-xs transition-colors">
  <i class="fa-brands fa-whatsapp text-sm"></i>
  <span>Order on WhatsApp</span>
</a>`;
                    onCodeInsert(snippet);
                    copyToClipboard(snippet);
                  }}
                >
                  <Copy className="h-3 w-3 mr-1.5 text-neutral-400" /> Insert WhatsApp CTA
                </Button>
              </div>

              {/* Adinkra Vector Symbols */}
              <div className="p-3 rounded-lg border border-border/70 bg-neutral-900/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-200">Adinkra Vector Library</span>
                  <span className="text-[10px] text-neutral-500">SVG</span>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  {ADINKRA_SYMBOLS.map((symbol) => (
                    <div 
                      key={symbol.name}
                      className="p-2 rounded-md border border-neutral-800/80 bg-neutral-900/60 hover:border-neutral-700 hover:bg-neutral-900 transition-colors cursor-pointer group flex flex-col justify-between"
                      onClick={() => {
                        onCodeInsert(symbol.svg);
                        copyToClipboard(symbol.svg, symbol.name);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-neutral-300 group-hover:text-amber-400 truncate">
                          {symbol.name}
                        </span>
                        {copiedId === symbol.name ? <Check className="h-2.5 w-2.5 text-emerald-400" /> : <Copy className="h-2.5 w-2.5 text-neutral-600 group-hover:text-neutral-400" />}
                      </div>
                      <div className="w-6 h-6 text-neutral-300 group-hover:text-amber-400 mx-auto my-1 transition-colors" dangerouslySetInnerHTML={{ __html: symbol.svg }} />
                      <span className="text-[9px] text-neutral-500 truncate text-center">{symbol.literal}</span>
                    </div>
                  ))}
                </div>
              </div>

            </TabsContent>

            {/* TAB 2: PALETTES & COLORS */}
            <TabsContent value="colors" className="space-y-3">
              <div className="p-3 rounded-lg border border-border/70 bg-neutral-900/40 space-y-2.5">
                <span className="text-xs font-semibold text-neutral-200">Color Inspector</span>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="w-10 h-7 p-0.5 rounded cursor-pointer bg-neutral-900 border-neutral-800"
                  />
                  <Input
                    value={convertColor(selectedColor, colorFormat)}
                    readOnly
                    className="flex-1 h-7 font-mono text-xs bg-neutral-900 border-neutral-800"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-1">
                  {(['hex', 'rgb', 'hsl'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      className={`h-6 rounded text-[10px] font-mono transition-colors ${colorFormat === fmt ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-500 hover:text-neutral-300'}`}
                      onClick={() => setColorFormat(fmt)}
                    >
                      {fmt.toUpperCase()}
                    </button>
                  ))}
                </div>

                <Button
                  onClick={() => {
                    const colorVal = convertColor(selectedColor, colorFormat);
                    onColorSelect(colorVal);
                    copyToClipboard(colorVal);
                  }}
                  className="w-full h-7 text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-200"
                >
                  <Copy className="h-3 w-3 mr-1.5 text-neutral-400" /> Apply Color
                </Button>
              </div>

              {/* Curated Palettes */}
              <div className="p-3 rounded-lg border border-border/70 bg-neutral-900/40 space-y-2">
                <span className="text-xs font-semibold text-neutral-200">Curated Palettes</span>
                {palettes.map((palette) => (
                  <div key={palette.name} className="space-y-1">
                    <span className="text-[10px] text-neutral-400 font-medium">{palette.name}</span>
                    <div className="flex gap-1">
                      {palette.colors.map((color) => (
                        <button
                          key={color}
                          title={color}
                          className="flex-1 h-6 rounded border border-white/10 hover:scale-105 transition-transform"
                          style={{ backgroundColor: color }}
                          onClick={() => {
                            setSelectedColor(color);
                            onColorSelect(color);
                            copyToClipboard(color);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Gradient Builder */}
              <div className="p-3 rounded-lg border border-border/70 bg-neutral-900/40 space-y-2.5">
                <span className="text-xs font-semibold text-neutral-200">Gradient Builder</span>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="color"
                    value={gradientColor1}
                    onChange={(e) => setGradientColor1(e.target.value)}
                    className="w-full h-6 p-0.5 cursor-pointer bg-neutral-900 border-neutral-800"
                  />
                  <Input
                    type="color"
                    value={gradientColor2}
                    onChange={(e) => setGradientColor2(e.target.value)}
                    className="w-full h-6 p-0.5 cursor-pointer bg-neutral-900 border-neutral-800"
                  />
                </div>
                
                <div
                  className="h-8 rounded border border-white/10"
                  style={{ background: generateGradient() }}
                />
                
                <Button
                  onClick={() => {
                    const gradient = `background: ${generateGradient()};`;
                    onCodeInsert(gradient);
                    copyToClipboard(gradient);
                  }}
                  className="w-full h-7 text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-200"
                >
                  <Copy className="h-3 w-3 mr-1.5 text-neutral-400" /> Copy Gradient CSS
                </Button>
              </div>
            </TabsContent>

            {/* TAB 3: EFFECTS */}
            <TabsContent value="effects" className="space-y-3">
              {/* Glassmorphism */}
              <div className="p-3 rounded-lg border border-border/70 bg-neutral-900/40 space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-neutral-200">Glassmorphism</span>
                  <span className="font-mono text-[10px] text-neutral-500">{glassBlur[0]}px blur</span>
                </div>
                
                <Slider value={glassBlur} onValueChange={setGlassBlur} max={30} min={0} step={1} />
                
                <div 
                  className="p-3 text-center text-xs text-neutral-300 border border-white/10 rounded-lg"
                  style={{
                    background: `rgba(20, 20, 26, ${glassOpacity[0]})`,
                    backdropFilter: `blur(${glassBlur[0]}px)`,
                    WebkitBackdropFilter: `blur(${glassBlur[0]}px)`,
                  }}
                >
                  Surface Preview
                </div>

                <Button
                  onClick={() => {
                    const glass = generateGlassStyle();
                    onCodeInsert(glass);
                    copyToClipboard(glass);
                  }}
                  className="w-full h-7 text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-200"
                >
                  <Copy className="h-3 w-3 mr-1.5 text-neutral-400" /> Copy Glass CSS
                </Button>
              </div>

              {/* Box Shadow */}
              <div className="p-3 rounded-lg border border-border/70 bg-neutral-900/40 space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-neutral-200">Box Shadow</span>
                  <span className="font-mono text-[10px] text-neutral-500">{shadowBlur[0]}px blur</span>
                </div>
                
                <Slider value={shadowBlur} onValueChange={setShadowBlur} max={40} min={0} step={1} />

                <div className="py-2 flex justify-center">
                  <div
                    className="w-20 h-8 bg-neutral-800 border border-neutral-700 rounded-md"
                    style={{ boxShadow: generateBoxShadow() }}
                  />
                </div>
                
                <Button
                  onClick={() => {
                    const shadow = `box-shadow: ${generateBoxShadow()};`;
                    onCodeInsert(shadow);
                    copyToClipboard(shadow);
                  }}
                  className="w-full h-7 text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-200"
                >
                  <Copy className="h-3 w-3 mr-1.5 text-neutral-400" /> Copy Shadow CSS
                </Button>
              </div>
            </TabsContent>

            {/* TAB 4: CODE SNIPPETS */}
            <TabsContent value="snippets" className="space-y-2">
              {commonSnippets.map((snippet, idx) => (
                <div key={idx} className="p-2.5 rounded-lg border border-neutral-800 bg-neutral-900/50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-200">{snippet.title}</span>
                    <button
                      className="p-1 rounded text-neutral-500 hover:text-neutral-200"
                      onClick={() => {
                        onCodeInsert(snippet.code);
                        copyToClipboard(snippet.code, snippet.title);
                      }}
                    >
                      {copiedId === snippet.title ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    </button>
                  </div>
                  <pre className="p-1.5 rounded bg-neutral-950 text-[10px] font-mono text-neutral-400 overflow-x-auto max-h-20">
                    {snippet.code}
                  </pre>
                </div>
              ))}
            </TabsContent>

            {/* TAB 5: SMART LOREM */}
            <TabsContent value="content" className="space-y-3">
              <div className="p-3 rounded-lg border border-border/70 bg-neutral-900/40 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-200">Smart Filler Generator</span>
                  <div className="flex bg-neutral-900 rounded p-0.5 border border-neutral-800">
                    <button
                      className={`px-1.5 py-0.5 text-[10px] font-medium rounded ${loremMode === 'ghana' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
                      onClick={() => setLoremMode('ghana')}
                    >
                      Ghana Terms
                    </button>
                    <button
                      className={`px-1.5 py-0.5 text-[10px] font-medium rounded ${loremMode === 'classic' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
                      onClick={() => setLoremMode('classic')}
                    >
                      Latin
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] text-neutral-500 mb-1">
                    <span>Length</span>
                    <span className="font-mono">{loremWords} words</span>
                  </div>
                  <Slider
                    value={[loremWords]}
                    onValueChange={(val) => setLoremWords(val[0])}
                    max={80}
                    min={10}
                    step={5}
                  />
                </div>

                <div className="p-2 rounded bg-neutral-950 border border-neutral-800/80 text-[11px] text-neutral-400 max-h-24 overflow-y-auto leading-relaxed">
                  {loremMode === 'ghana' ? generateGhanaLorem(loremWords) : generateClassicLorem(loremWords)}
                </div>

                <Button
                  onClick={() => {
                    const text = loremMode === 'ghana' ? generateGhanaLorem(loremWords) : generateClassicLorem(loremWords);
                    onCodeInsert(text);
                    copyToClipboard(text);
                  }}
                  className="w-full h-7 text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-200"
                >
                  <Copy className="h-3 w-3 mr-1.5 text-neutral-400" /> Insert Text
                </Button>
              </div>
            </TabsContent>

          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
}
