import { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './ui/resizable';
import { Badge } from './ui/badge';
import { 
  Save, 
  Download, 
  Settings, 
  Smartphone, 
  Tablet, 
  Monitor,
  Eye,
  Code2,
  FileText,
  Palette
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { DevToolsSidebar } from './DevToolsSidebar';

interface CodeEditorProps {
  initialHtml?: string;
  initialCss?: string;
  initialJs?: string;
  isReadOnly?: boolean;
  onSave?: (code: { html: string; css: string; js: string }) => void;
}

type ViewportSize = 'mobile' | 'tablet' | 'desktop';
type ActiveTab = 'html' | 'css' | 'js';

export function CodeEditor({
  initialHtml = '',
  initialCss = '',
  initialJs = '',
  isReadOnly = false,
  onSave
}: CodeEditorProps) {
  const [html, setHtml] = useState(initialHtml);
  const [css, setCss] = useState(initialCss);
  const [js, setJs] = useState(initialJs);
  
  useEffect(() => {
    if (initialHtml !== html) setHtml(initialHtml);
  }, [initialHtml]);
  
  useEffect(() => {
    if (initialCss !== css) setCss(initialCss);
  }, [initialCss]);
  
  useEffect(() => {
    if (initialJs !== js) setJs(initialJs);
  }, [initialJs]);

  const [activeTab, setActiveTab] = useState<ActiveTab>('html');
  const [viewportSize, setViewportSize] = useState<ViewportSize>('desktop');
  const [showDevTools, setShowDevTools] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [theme, setTheme] = useState<'vs-dark' | 'light'>('vs-dark');
  const [fontSize, setFontSize] = useState(14);
  const [autoSave, setAutoSave] = useState(true);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { toast } = useToast();
  const isInitialMount = useRef(true);

  // Auto-save functionality
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    if (autoSave && onSave && !isReadOnly) {
      const timer = setTimeout(() => {
        onSave({ html, css, js });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [html, css, js, autoSave, onSave, isReadOnly]);

  // Update preview when code changes
  useEffect(() => {
    updatePreview();
  }, [html, css, js]);

  const updatePreview = () => {
    if (!iframeRef.current) return;

    const combinedCode = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Preview</title>
        <style>
          body { margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
          ${css}
        </style>
      </head>
      <body>
        ${html}
        <script>
          // Capture console logs
          const originalLog = console.log;
          const originalError = console.error;
          const originalWarn = console.warn;
          
          console.log = function(...args) {
            window.parent.postMessage({ type: 'console', level: 'log', message: args.join(' ') }, '*');
            originalLog.apply(console, args);
          };
          
          console.error = function(...args) {
            window.parent.postMessage({ type: 'console', level: 'error', message: args.join(' ') }, '*');
            originalError.apply(console, args);
          };
          
          console.warn = function(...args) {
            window.parent.postMessage({ type: 'console', level: 'warn', message: args.join(' ') }, '*');
            originalWarn.apply(console, args);
          };
          
          // Capture runtime errors
          window.addEventListener('error', function(e) {
            window.parent.postMessage({ 
              type: 'console', 
              level: 'error', 
              message: e.message + ' at line ' + e.lineno 
            }, '*');
          });
          
          try {
            ${js}
          } catch (error) {
            console.error('JavaScript Error:', error.message);
          }
        </script>
      </body>
      </html>
    `;

    const blob = new Blob([combinedCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    iframeRef.current.src = url;
  };

  // Listen for console messages from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'console') {
        setConsoleOutput(prev => [...prev.slice(-49), 
          `[${event.data.level.toUpperCase()}] ${event.data.message}`
        ]);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleSave = () => {
    if (onSave) {
      onSave({ html, css, js });
      toast({
        title: "Code saved",
        description: "Your changes have been saved successfully"
      });
    }
  };

  const handleExport = () => {
    const combinedCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Project</title>
  <style>
${css}
  </style>
</head>
<body>
${html}
  <script>
${js}
  </script>
</body>
</html>`;

    const blob = new Blob([combinedCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getViewportDimensions = () => {
    switch (viewportSize) {
      case 'mobile': return { width: '375px', height: '667px' };
      case 'tablet': return { width: '768px', height: '1024px' };
      default: return { width: '100%', height: '100%' };
    }
  };

  const getCurrentCode = () => {
    switch (activeTab) {
      case 'html': return html;
      case 'css': return css;
      case 'js': return js;
    }
  };

  const setCurrentCode = (value: string) => {
    switch (activeTab) {
      case 'html': setHtml(value); break;
      case 'css': setCss(value); break;
      case 'js': setJs(value); break;
    }
  };

  const getLanguage = () => {
    switch (activeTab) {
      case 'html': return 'html';
      case 'css': return 'css';
      case 'js': return 'javascript';
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Toolbar */}
      <div className="border-b bg-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Code2 className="h-5 w-5" />
              Code Editor
            </h2>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
            >
              <Eye className="h-4 w-4 mr-2" />
              {isPreviewMode ? 'Code' : 'Preview'}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDevTools(!showDevTools)}
            >
              <Palette className="h-4 w-4 mr-2" />
              Tools
            </Button>

            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        <ResizablePanelGroup direction="horizontal">
          {/* Code Editor Panel */}
          {!isPreviewMode && (
            <>
              <ResizablePanel defaultSize={50} minSize={30}>
                <ResizablePanelGroup direction="vertical">
                  {/* Code Editor Section */}
                  <ResizablePanel defaultSize={75} minSize={30}>
                    <div className="h-full flex flex-col">
                      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ActiveTab)} className="flex-1 flex flex-col">
                        <TabsList className="w-full justify-start rounded-none border-b">
                          <TabsTrigger value="html" className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            HTML
                          </TabsTrigger>
                          <TabsTrigger value="css" className="flex items-center gap-2">
                            <Palette className="h-4 w-4" />
                            CSS
                          </TabsTrigger>
                          <TabsTrigger value="js" className="flex items-center gap-2">
                            <Code2 className="h-4 w-4" />
                            JavaScript
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value={activeTab} className="flex-1 m-0">
                          <Editor
                            height="100%"
                            language={getLanguage()}
                            theme={theme}
                            value={getCurrentCode()}
                            onChange={(value) => setCurrentCode(value || '')}
                            options={{
                              fontSize,
                              minimap: { enabled: false },
                              wordWrap: 'on',
                              lineNumbers: 'on',
                              folding: true,
                              bracketMatching: 'always',
                              autoIndent: 'full',
                              formatOnPaste: true,
                              formatOnType: true,
                              readOnly: isReadOnly,
                              suggestOnTriggerCharacters: true,
                              quickSuggestions: true,
                              parameterHints: { enabled: true },
                              hover: { enabled: true }
                            }}
                          />
                        </TabsContent>
                      </Tabs>
                    </div>
                  </ResizablePanel>
                  
                  <ResizableHandle withHandle />
                  
                  {/* Console Output Section */}
                  <ResizablePanel defaultSize={25} minSize={15}>
                    <div className="h-full bg-muted/30 p-4 overflow-y-auto">
                      <h4 className="text-sm font-medium mb-2">Console Output</h4>
                      <div className="text-xs font-mono space-y-1">
                        {consoleOutput.length === 0 ? (
                          <p className="text-muted-foreground">No output yet...</p>
                        ) : (
                          consoleOutput.map((output, index) => (
                            <div key={index} className={
                              output.includes('[ERROR]') ? 'text-red-500' :
                              output.includes('[WARN]') ? 'text-yellow-500' :
                              'text-foreground'
                            }>
                              {output}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
              <ResizableHandle />
            </>
          )}

          {/* Preview Panel */}
          <ResizablePanel defaultSize={isPreviewMode ? 100 : 50} minSize={30}>
            <div className="h-full flex flex-col">
              <div className="border-b p-2 bg-muted/30">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Live Preview</h3>
                  {isPreviewMode && (
                    <div className="flex items-center gap-1 border rounded-md p-1">
                      <Button
                        variant={viewportSize === 'mobile' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewportSize('mobile')}
                      >
                        <Smartphone className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewportSize === 'tablet' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewportSize('tablet')}
                      >
                        <Tablet className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewportSize === 'desktop' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewportSize('desktop')}
                      >
                        <Monitor className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex-1 p-4 bg-gray-100 dark:bg-gray-900 overflow-auto">
                <div 
                  className="mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
                  style={getViewportDimensions()}
                >
                  <iframe
                    ref={iframeRef}
                    className="w-full h-full border-0"
                    title="Preview"
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>

        {/* Developer Tools Sidebar */}
        {showDevTools && (
          <div className="w-80 border-l bg-card">
            <DevToolsSidebar 
              onColorSelect={(color) => {
                const colorCode = `color: ${color};`;
                setCurrentCode(getCurrentCode() + colorCode);
              }}
              onCodeInsert={(code) => {
                setCurrentCode(getCurrentCode() + code);
              }}
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t bg-card p-2 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} by Nyeya
      </footer>

    </div>
  );
}
