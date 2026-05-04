import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Slider } from './ui/slider';
import { ScrollArea } from './ui/scroll-area';
import { 
  Palette, 
  Copy, 
  Type, 
  Box, 
  Code2, 
  Check, 
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { 
  VECTOR_ICONS, 
  DESIGNER_PALETTES, 
  generateLorem 
} from '../lib/devUtils';

interface DevToolsSidebarProps {
  onColorSelect: (color: string) => void;
  onCodeInsert: (code: string) => void;
}

export function DevToolsSidebar({ onColorSelect, onCodeInsert }: DevToolsSidebarProps) {
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Color Picker State
  const [selectedColor, setSelectedColor] = useState('#6366F1');
  const [colorFormat, setColorFormat] = useState<'hex' | 'rgb' | 'hsl'>('hex');
  
  // Box Shadow State
  const [shadowX, setShadowX] = useState([0]);
  const [shadowY, setShadowY] = useState([4]);
  const [shadowBlur, setShadowBlur] = useState([16]);
  const [shadowSpread, setShadowSpread] = useState([0]);
  const [shadowColor, setShadowColor] = useState('#000000');
  const [shadowOpacity, setShadowOpacity] = useState([0.35]);
  
  // Border Radius State
  const [borderRadius, setBorderRadius] = useState([12]);
  
  // Glassmorphism State
  const [glassBlur, setGlassBlur] = useState([12]);
  const [glassOpacity, setGlassOpacity] = useState([0.65]);

  // Gradient State
  const [gradientColor1, setGradientColor1] = useState('#6366F1');
  const [gradientColor2, setGradientColor2] = useState('#3B82F6');
  const [gradientDirection, setGradientDirection] = useState('135deg');
  
  // Lorem Ipsum
  const [loremMode, setLoremMode] = useState<'tech' | 'classic'>('tech');
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

  const uiSnippets = [
    {
      title: 'Responsive Navbar',
      category: 'Navigation',
      code: `<header class="border-b border-neutral-800 bg-neutral-900/60 backdrop-blur px-6 py-3 flex items-center justify-between">
  <div class="flex items-center gap-2">
    <div class="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">A</div>
    <span class="font-bold text-sm text-white">AppLogo</span>
  </div>
  <nav class="hidden md:flex gap-6 text-xs text-neutral-400">
    <a href="#" class="hover:text-white transition-colors">Features</a>
    <a href="#" class="hover:text-white transition-colors">Pricing</a>
    <a href="#" class="hover:text-white transition-colors">Docs</a>
  </nav>
  <button class="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs px-3.5 py-1.5 rounded-lg transition-colors">
    Get Started
  </button>
</header>`
    },
    {
      title: 'Modal Dialog Box',
      category: 'Overlay',
      code: `<div class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
  <div class="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl space-y-4">
    <h3 class="text-lg font-bold text-white">Confirm Action</h3>
    <p class="text-xs text-neutral-400">Are you sure you want to proceed with this operation?</p>
    <div class="flex justify-end gap-2 pt-2">
      <button class="px-3.5 py-1.5 rounded-lg text-xs text-neutral-400 hover:bg-neutral-800">Cancel</button>
      <button class="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white">Confirm</button>
    </div>
  </div>
</div>`
    },
    {
      title: 'Shimmer Skeleton Loader',
      category: 'Feedback',
      code: `<div class="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-3 animate-pulse">
  <div class="h-4 bg-neutral-800 rounded w-1/3"></div>
  <div class="h-3 bg-neutral-800/60 rounded w-full"></div>
  <div class="h-3 bg-neutral-800/60 rounded w-4/5"></div>
</div>`
    },
    {
      title: 'Gradient CTA Button',
      category: 'Buttons',
      code: `<button class="relative group overflow-hidden rounded-xl p-[1px] font-semibold text-xs transition-all active:scale-95 shadow-lg shadow-indigo-500/20">
  <span class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:opacity-90"></span>
  <span class="relative block px-4 py-2 rounded-[11px] bg-neutral-950 text-white transition-colors group-hover:bg-transparent">
    Explore Platform &rarr;
  </span>
</button>`
    },
    {
      title: 'Dark Mode Switcher',
      category: 'JavaScript',
      code: `function toggleTheme() {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
}`
    }
  ];

  return (
    <div className="h-full flex flex-col bg-card text-foreground select-none font-sans text-xs">
      {/* Header */}
      <div className="h-10 px-3 border-b border-border/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-xs text-neutral-200">DevTools</span>
          <span className="text-[10px] text-neutral-500 font-mono">Workspace Suite</span>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3">
          <Tabs defaultValue="colors" className="space-y-3">
            <TabsList className="grid w-full grid-cols-5 bg-neutral-900/80 p-0.5 rounded-lg border border-neutral-800">
              <TabsTrigger value="colors" title="Colors & Palettes" className="text-[11px] h-6 data-[state=active]:bg-neutral-800 data-[state=active]:text-white">
                <Palette className="h-3 w-3" />
              </TabsTrigger>
              <TabsTrigger value="effects" title="CSS Generators" className="text-[11px] h-6 data-[state=active]:bg-neutral-800 data-[state=active]:text-white">
                <Box className="h-3 w-3" />
              </TabsTrigger>
              <TabsTrigger value="snippets" title="UI Components" className="text-[11px] h-6 data-[state=active]:bg-neutral-800 data-[state=active]:text-white">
                <Code2 className="h-3 w-3" />
              </TabsTrigger>
              <TabsTrigger value="icons" title="Vector Icons" className="text-[11px] h-6 data-[state=active]:bg-neutral-800 data-[state=active]:text-white">
                <Sparkles className="h-3 w-3" />
              </TabsTrigger>
              <TabsTrigger value="content" title="Lorem Generator" className="text-[11px] h-6 data-[state=active]:bg-neutral-800 data-[state=active]:text-white">
                <Type className="h-3 w-3" />
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: COLORS & PALETTES */}
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

              {/* Curated Designer Palettes */}
              <div className="p-3 rounded-lg border border-border/70 bg-neutral-900/40 space-y-2">
                <span className="text-xs font-semibold text-neutral-200">Designer Palettes</span>
                {DESIGNER_PALETTES.map((palette) => (
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
                <span className="text-xs font-semibold text-neutral-200">Gradient Generator</span>
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

            {/* TAB 2: VISUAL FX & GENERATORS */}
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
                  Glass Surface Preview
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

              {/* Border Radius */}
              <div className="p-3 rounded-lg border border-border/70 bg-neutral-900/40 space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-neutral-200">Border Radius</span>
                  <span className="font-mono text-[10px] text-neutral-500">{borderRadius[0]}px</span>
                </div>
                
                <Slider value={borderRadius} onValueChange={setBorderRadius} max={32} min={0} step={1} />
                
                <Button
                  onClick={() => {
                    const radius = `border-radius: ${borderRadius[0]}px;`;
                    onCodeInsert(radius);
                    copyToClipboard(radius);
                  }}
                  className="w-full h-7 text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-200"
                >
                  <Copy className="h-3 w-3 mr-1.5 text-neutral-400" /> Copy Radius CSS
                </Button>
              </div>
            </TabsContent>

            {/* TAB 3: UI COMPONENTS */}
            <TabsContent value="snippets" className="space-y-2">
              {uiSnippets.map((snippet, idx) => (
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

            {/* TAB 4: ICONS & ASSETS */}
            <TabsContent value="icons" className="space-y-3">
              <div className="p-3 rounded-lg border border-border/70 bg-neutral-900/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-200">Vector SVG Icons</span>
                  <span className="text-[10px] text-neutral-500">Click to insert</span>
                </div>

                <div className="grid grid-cols-4 gap-1.5">
                  {VECTOR_ICONS.map((icon) => (
                    <button
                      key={icon.name}
                      title={icon.name}
                      className="p-2 rounded-md border border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 hover:bg-neutral-800 text-neutral-300 hover:text-white flex flex-col items-center justify-center gap-1 transition-colors"
                      onClick={() => {
                        onCodeInsert(icon.svg);
                        copyToClipboard(icon.svg, icon.name);
                      }}
                    >
                      <div dangerouslySetInnerHTML={{ __html: icon.svg }} />
                      <span className="text-[9px] text-neutral-500 truncate max-w-full">{icon.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Unsplash Image Placeholders */}
              <div className="p-3 rounded-lg border border-border/70 bg-neutral-900/40 space-y-2">
                <span className="text-xs font-semibold text-neutral-200">Image Placeholders</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { label: 'Abstract Tech', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80' },
                    { label: 'Modern Office', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80' },
                    { label: 'User Avatar', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80' },
                    { label: 'Dark Minimal', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80' }
                  ].map((img) => (
                    <button
                      key={img.label}
                      className="p-2 rounded-md border border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 hover:bg-neutral-800 text-left text-xs text-neutral-300 transition-colors flex items-center justify-between"
                      onClick={() => {
                        const tag = `<img src="${img.url}" alt="${img.label}" class="rounded-xl w-full object-cover" />`;
                        onCodeInsert(tag);
                        copyToClipboard(tag);
                      }}
                    >
                      <span className="truncate">{img.label}</span>
                      <ImageIcon className="h-3 w-3 text-neutral-500" />
                    </button>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* TAB 5: LOREM GENERATOR */}
            <TabsContent value="content" className="space-y-3">
              <div className="p-3 rounded-lg border border-border/70 bg-neutral-900/40 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-200">Lorem Ipsum Generator</span>
                  <div className="flex bg-neutral-900 rounded p-0.5 border border-neutral-800">
                    <button
                      className={`px-1.5 py-0.5 text-[10px] font-medium rounded ${loremMode === 'tech' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
                      onClick={() => setLoremMode('tech')}
                    >
                      Tech Terms
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

                <div className="p-2.5 rounded bg-neutral-950 border border-neutral-800/80 text-[11px] text-neutral-400 max-h-28 overflow-y-auto leading-relaxed">
                  {generateLorem(loremMode, loremWords)}
                </div>

                <Button
                  onClick={() => {
                    const text = generateLorem(loremMode, loremWords);
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
