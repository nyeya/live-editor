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
  Grid3X3, 
  Image,
  Zap
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface DevToolsSidebarProps {
  onColorSelect: (color: string) => void;
  onCodeInsert: (code: string) => void;
}

export function DevToolsSidebar({ onColorSelect, onCodeInsert }: DevToolsSidebarProps) {
  const { toast } = useToast();
  
  // Color Picker State
  const [selectedColor, setSelectedColor] = useState('#3b82f6');
  const [colorFormat, setColorFormat] = useState<'hex' | 'rgb' | 'hsl'>('hex');
  
  // Box Shadow State
  const [shadowX, setShadowX] = useState([0]);
  const [shadowY, setShadowY] = useState([4]);
  const [shadowBlur, setShadowBlur] = useState([8]);
  const [shadowSpread, setShadowSpread] = useState([0]);
  const [shadowColor, setShadowColor] = useState('#000000');
  const [shadowOpacity, setShadowOpacity] = useState([0.25]);
  
  // Border Radius State
  const [borderRadius, setBorderRadius] = useState([8]);
  
  // Gradient State
  const [gradientColor1, setGradientColor1] = useState('#3b82f6');
  const [gradientColor2, setGradientColor2] = useState('#8b5cf6');
  const [gradientDirection, setGradientDirection] = useState('to right');
  
  // Lorem Ipsum
  const [loremWords, setLoremWords] = useState(50);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code has been copied to your clipboard"
    });
  };

  const convertColor = (hex: string, format: 'hex' | 'rgb' | 'hsl') => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    switch (format) {
      case 'rgb':
        return `rgb(${r}, ${g}, ${b})`;
      case 'hsl':
        const hsl = rgbToHsl(r, g, b);
        return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
      default:
        return hex;
    }
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const generateBoxShadow = () => {
    const rgba = `rgba(${parseInt(shadowColor.slice(1, 3), 16)}, ${parseInt(shadowColor.slice(3, 5), 16)}, ${parseInt(shadowColor.slice(5, 7), 16)}, ${shadowOpacity[0]})`;
    return `${shadowX[0]}px ${shadowY[0]}px ${shadowBlur[0]}px ${shadowSpread[0]}px ${rgba}`;
  };

  const generateGradient = () => {
    return `linear-gradient(${gradientDirection}, ${gradientColor1}, ${gradientColor2})`;
  };

  const generateLorem = (words: number) => {
    const loremText = "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum";
    const wordsArray = loremText.split(' ');
    const result = [];
    for (let i = 0; i < words; i++) {
      result.push(wordsArray[i % wordsArray.length]);
    }
    return result.join(' ') + '.';
  };

  const commonSnippets = [
    {
      title: 'Flexbox Center',
      code: `display: flex;
justify-content: center;
align-items: center;`
    },
    {
      title: 'Grid Layout',
      code: `display: grid;
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
gap: 1rem;`
    },
    {
      title: 'Smooth Transition',
      code: `transition: all 0.3s ease-in-out;`
    },
    {
      title: 'Card Shadow',
      code: `box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
border-radius: 8px;`
    },
    {
      title: 'Responsive Text',
      code: `font-size: clamp(1rem, 2.5vw, 2rem);`
    }
  ];

  const colorPalettes = [
    { name: 'Blue Palette', colors: ['#3b82f6', '#1d4ed8', '#1e40af', '#1e3a8a'] },
    { name: 'Purple Palette', colors: ['#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6'] },
    { name: 'Green Palette', colors: ['#10b981', '#059669', '#047857', '#065f46'] },
    { name: 'Red Palette', colors: ['#ef4444', '#dc2626', '#b91c1c', '#991b1b'] },
    { name: 'Gray Palette', colors: ['#6b7280', '#4b5563', '#374151', '#1f2937'] }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Developer Tools
        </h3>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4">
          <Tabs defaultValue="colors" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="colors">
                <Palette className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="effects">
                <Box className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="layout">
                <Grid3X3 className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="content">
                <Type className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>

            {/* Colors Tab */}
            <TabsContent value="colors" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Color Picker</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Color</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        type="color"
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        value={convertColor(selectedColor, colorFormat)}
                        readOnly
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-1">
                    {['hex', 'rgb', 'hsl'].map((format) => (
                      <Button
                        key={format}
                        variant={colorFormat === format ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setColorFormat(format as any)}
                      >
                        {format.toUpperCase()}
                      </Button>
                    ))}
                  </div>

                  <Button
                    onClick={() => {
                      onColorSelect(convertColor(selectedColor, colorFormat));
                      copyToClipboard(convertColor(selectedColor, colorFormat));
                    }}
                    className="w-full"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Use Color
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Color Palettes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {colorPalettes.map((palette) => (
                    <div key={palette.name}>
                      <Label className="text-xs">{palette.name}</Label>
                      <div className="flex gap-1 mt-1">
                        {palette.colors.map((color) => (
                          <button
                            key={color}
                            className="w-8 h-8 rounded border-2 border-white shadow-sm hover:scale-110 transition-transform"
                            style={{ backgroundColor: color }}
                            onClick={() => {
                              setSelectedColor(color);
                              onColorSelect(color);
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Gradient Generator</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Color 1</Label>
                      <Input
                        type="color"
                        value={gradientColor1}
                        onChange={(e) => setGradientColor1(e.target.value)}
                        className="w-full h-8 p-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Color 2</Label>
                      <Input
                        type="color"
                        value={gradientColor2}
                        onChange={(e) => setGradientColor2(e.target.value)}
                        className="w-full h-8 p-1"
                      />
                    </div>
                  </div>
                  
                  <div
                    className="h-16 rounded border"
                    style={{ background: generateGradient() }}
                  />
                  
                  <Button
                    onClick={() => {
                      const gradient = `background: ${generateGradient()};`;
                      onCodeInsert(gradient);
                      copyToClipboard(gradient);
                    }}
                    className="w-full"
                    size="sm"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Gradient
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Effects Tab */}
            <TabsContent value="effects" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Box Shadow</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs">Horizontal Offset</Label>
                      <Slider
                        value={shadowX}
                        onValueChange={setShadowX}
                        max={50}
                        min={-50}
                        step={1}
                      />
                      <span className="text-xs text-muted-foreground">{shadowX[0]}px</span>
                    </div>
                    
                    <div>
                      <Label className="text-xs">Vertical Offset</Label>
                      <Slider
                        value={shadowY}
                        onValueChange={setShadowY}
                        max={50}
                        min={-50}
                        step={1}
                      />
                      <span className="text-xs text-muted-foreground">{shadowY[0]}px</span>
                    </div>
                    
                    <div>
                      <Label className="text-xs">Blur Radius</Label>
                      <Slider
                        value={shadowBlur}
                        onValueChange={setShadowBlur}
                        max={100}
                        min={0}
                        step={1}
                      />
                      <span className="text-xs text-muted-foreground">{shadowBlur[0]}px</span>
                    </div>
                    
                    <div>
                      <Label className="text-xs">Opacity</Label>
                      <Slider
                        value={shadowOpacity}
                        onValueChange={setShadowOpacity}
                        max={1}
                        min={0}
                        step={0.01}
                      />
                      <span className="text-xs text-muted-foreground">{shadowOpacity[0]}</span>
                    </div>
                  </div>
                  
                  <div
                    className="h-16 bg-white rounded border mx-4"
                    style={{ boxShadow: generateBoxShadow() }}
                  />
                  
                  <Button
                    onClick={() => {
                      const shadow = `box-shadow: ${generateBoxShadow()};`;
                      onCodeInsert(shadow);
                      copyToClipboard(shadow);
                    }}
                    className="w-full"
                    size="sm"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Shadow
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Border Radius</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-xs">Radius</Label>
                    <Slider
                      value={borderRadius}
                      onValueChange={setBorderRadius}
                      max={50}
                      min={0}
                      step={1}
                    />
                    <span className="text-xs text-muted-foreground">{borderRadius[0]}px</span>
                  </div>
                  
                  <div
                    className="h-16 bg-primary mx-4"
                    style={{ borderRadius: `${borderRadius[0]}px` }}
                  />
                  
                  <Button
                    onClick={() => {
                      const radius = `border-radius: ${borderRadius[0]}px;`;
                      onCodeInsert(radius);
                      copyToClipboard(radius);
                    }}
                    className="w-full"
                    size="sm"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Radius
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Layout Tab */}
            <TabsContent value="layout" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">CSS Snippets</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {commonSnippets.map((snippet, index) => (
                    <div key={index} className="p-3 border rounded">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {snippet.title}
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            onCodeInsert(snippet.code);
                            copyToClipboard(snippet.code);
                          }}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      <pre className="text-xs text-muted-foreground font-mono whitespace-pre-wrap">
                        {snippet.code}
                      </pre>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Content Tab */}
            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Lorem Ipsum</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-xs">Number of words</Label>
                    <Slider
                      value={[loremWords]}
                      onValueChange={(value) => setLoremWords(value[0])}
                      max={200}
                      min={5}
                      step={5}
                    />
                    <span className="text-xs text-muted-foreground">{loremWords} words</span>
                  </div>
                  
                  <div className="p-3 border rounded bg-muted/30 text-xs max-h-32 overflow-y-auto">
                    {generateLorem(loremWords)}
                  </div>
                  
                  <Button
                    onClick={() => {
                      const lorem = generateLorem(loremWords);
                      onCodeInsert(lorem);
                      copyToClipboard(lorem);
                    }}
                    className="w-full"
                    size="sm"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Text
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Image Placeholders</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    { size: '300x200', desc: 'Small' },
                    { size: '600x400', desc: 'Medium' },
                    { size: '1200x800', desc: 'Large' }
                  ].map((img) => (
                    <Button
                      key={img.size}
                      variant="outline"
                      className="w-full justify-between"
                      onClick={() => {
                        const imgTag = `<img src="https://picsum.photos/${img.size}" alt="Placeholder image" />`;
                        onCodeInsert(imgTag);
                        copyToClipboard(imgTag);
                      }}
                    >
                      <span className="flex items-center gap-2">
                        <Image className="h-4 w-4" />
                        {img.desc} ({img.size})
                      </span>
                      <Copy className="h-3 w-3" />
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
}
