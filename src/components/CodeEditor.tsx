import { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './ui/resizable';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from './ui/dialog';
import { 
  Save, 
  Download, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Eye, 
  Play, 
  RotateCw, 
  Trash2, 
  Terminal, 
  FolderOpen, 
  Plus, 
  Share2, 
  Wand2, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Package,
  Sparkles,
  PanelRightClose,
  PanelRightOpen,
  Check,
  MoreHorizontal,
  Code,
  SmartphoneNfc,
  Wifi,
  Battery
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { DevToolsSidebar } from './DevToolsSidebar';
import { STARTER_TEMPLATES, StarterTemplate } from '../lib/templates';
import { beautifyCode } from '../lib/devUtils';

interface ProjectData {
  id: string;
  name: string;
  html: string;
  css: string;
  js: string;
  updatedAt: number;
}

interface ConsoleMessage {
  id: string;
  level: 'log' | 'warn' | 'error' | 'info';
  message: string;
  time: string;
}

type ViewportSize = 'mobile-sm' | 'mobile' | 'tablet' | 'desktop';
type Orientation = 'portrait' | 'landscape';
type LayoutMode = 'split-horizontal' | 'split-vertical' | 'preview-only' | 'code-only';
type ActiveTab = 'html' | 'css' | 'js';
type MobileViewMode = 'code' | 'preview';

interface CodeEditorProps {
  initialHtml?: string;
  initialCss?: string;
  initialJs?: string;
  isReadOnly?: boolean;
  onSave?: (code: { html: string; css: string; js: string }) => void;
}

export function CodeEditor({
  initialHtml,
  initialCss,
  initialJs,
  isReadOnly = false,
  onSave
}: CodeEditorProps) {
  const { toast } = useToast();

  const defaultTemplate = STARTER_TEMPLATES[0]; // SaaS Analytics Dashboard
  
  const [currentProjectName, setCurrentProjectName] = useState('Analytics Dashboard');
  const [html, setHtml] = useState(initialHtml ?? defaultTemplate.html);
  const [css, setCss] = useState(initialCss ?? defaultTemplate.css);
  const [js, setJs] = useState(initialJs ?? defaultTemplate.js);

  // Projects in LocalStorage
  const [projects, setProjects] = useState<ProjectData[]>(() => {
    try {
      const saved = localStorage.getItem('nyeya_live_editor_projects');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 'proj-default',
        name: 'Analytics Dashboard',
        html: defaultTemplate.html,
        css: defaultTemplate.css,
        js: defaultTemplate.js,
        updatedAt: Date.now()
      }
    ];
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('html');
  const [viewportSize, setViewportSize] = useState<ViewportSize>('desktop');
  const [orientation, setOrientation] = useState<Orientation>('portrait');
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('split-vertical');
  const [showDevTools, setShowDevTools] = useState(true);
  const [fontSize, setFontSize] = useState(13);
  const [wordWrap, setWordWrap] = useState<'on' | 'off'>('on');
  const [autoSave, setAutoSave] = useState(true);
  const [isLiveAutoReload, setIsLiveAutoReload] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [copiedLink, setCopiedLink] = useState(false);

  // Mobile App Responsiveness State
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [mobileViewMode, setMobileViewMode] = useState<MobileViewMode>('code');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modals
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [cdnModalOpen, setCdnModalOpen] = useState(false);
  
  // Console state
  const [consoleMessages, setConsoleMessages] = useState<ConsoleMessage[]>([]);
  const [consoleFilter, setConsoleFilter] = useState<'all' | 'log' | 'warn' | 'error'>('all');
  const [replInput, setReplInput] = useState('');
  const [showConsole, setShowConsole] = useState(true);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isInitialMount = useRef(true);

  // Detect Mobile Screen Size
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileScreen(isMobile);
      if (isMobile) {
        setShowDevTools(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync initial props if changed externally
  useEffect(() => {
    if (initialHtml !== undefined) setHtml(initialHtml);
    if (initialCss !== undefined) setCss(initialCss);
    if (initialJs !== undefined) setJs(initialJs);
  }, [initialHtml, initialCss, initialJs]);

  // Save projects to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('nyeya_live_editor_projects', JSON.stringify(projects));
    } catch (e) {
      console.error(e);
    }
  }, [projects]);

  // Auto-save debounce
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    if (autoSave && !isReadOnly) {
      const timer = setTimeout(() => {
        handleSave(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [html, css, js, autoSave, isReadOnly]);

  // Live preview update
  useEffect(() => {
    if (isLiveAutoReload) {
      updatePreview();
    }
  }, [html, css, js, isLiveAutoReload]);

  const buildCombinedHtml = (rawHtml: string, rawCss: string, rawJs: string): string => {
    const consoleScript = `
      <script>
        (function() {
          function send(level, args) {
            try {
              const message = args.map(arg => {
                if (typeof arg === 'object') {
                  try { return JSON.stringify(arg, null, 2); } catch(e) { return String(arg); }
                }
                return String(arg);
              }).join(' ');
              window.parent.postMessage({ type: 'nyeya_console', level: level, message: message }, '*');
            } catch(e) {}
          }

          const origLog = console.log;
          const origWarn = console.warn;
          const origError = console.error;
          const origInfo = console.info;

          console.log = function(...args) { send('log', args); origLog.apply(console, args); };
          console.warn = function(...args) { send('warn', args); origWarn.apply(console, args); };
          console.error = function(...args) { send('error', args); origError.apply(console, args); };
          console.info = function(...args) { send('info', args); origInfo.apply(console, args); };

          window.addEventListener('error', function(e) {
            send('error', [e.message + (e.lineno ? ' (line ' + e.lineno + ')' : '')]);
          });

          window.addEventListener('message', function(e) {
            if (e.data && e.data.type === 'nyeya_eval') {
              try {
                const result = eval(e.data.code);
                send('info', ['> ' + e.data.code, String(result)]);
              } catch(err) {
                send('error', ['> ' + e.data.code, err.message]);
              }
            }
          });
        })();

        try {
          ${rawJs}
        } catch (error) {
          console.error('Runtime Error:', error.message);
        }
      </script>
    `;

    const styleTag = `<style>\n${rawCss}\n</style>`;

    // Check if rawHtml is already a full document
    const hasHtmlTag = /<html[\s>]/i.test(rawHtml);
    const hasHeadTag = /<\/head>/i.test(rawHtml);
    const hasBodyTag = /<\/body>/i.test(rawHtml);

    if (hasHtmlTag || hasHeadTag || hasBodyTag) {
      let result = rawHtml;
      
      // Inject style into head if exists, or before body
      if (hasHeadTag) {
        result = result.replace(/<\/head>/i, `${styleTag}\n</head>`);
      } else if (hasBodyTag) {
        result = result.replace(/<body[\s>]/i, match => `${styleTag}\n${match}`);
      } else {
        result = `${styleTag}\n${result}`;
      }

      // Inject script inside body before </body> if exists, or append
      if (hasBodyTag) {
        result = result.replace(/<\/body>/i, `${consoleScript}\n</body>`);
      } else {
        result = `${result}\n${consoleScript}`;
      }

      return result;
    }

    // Otherwise, wrap fragment in valid HTML5 boilerplate
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview</title>
  ${styleTag}
</head>
<body>
  ${rawHtml}
  ${consoleScript}
</body>
</html>`;
  };

  const updatePreview = () => {
    if (!iframeRef.current) return;
    const combinedCode = buildCombinedHtml(html, css, js);
    iframeRef.current.srcdoc = combinedCode;
  };

  // Listen for console messages from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'nyeya_console') {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setConsoleMessages(prev => [
          ...prev.slice(-99),
          {
            id: Math.random().toString(36).substring(2, 9),
            level: event.data.level,
            message: event.data.message,
            time
          }
        ]);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleSave = (showNotification = true) => {
    if (onSave) {
      onSave({ html, css, js });
    }

    setProjects(prev => {
      const existing = prev.find(p => p.name === currentProjectName);
      if (existing) {
        return prev.map(p => p.name === currentProjectName ? { ...p, html, css, js, updatedAt: Date.now() } : p);
      }
      return [
        ...prev,
        {
          id: 'proj-' + Date.now(),
          name: currentProjectName,
          html,
          css,
          js,
          updatedAt: Date.now()
        }
      ];
    });

    if (showNotification) {
      toast({
        title: "Saved",
        description: `Project "${currentProjectName}" saved.`
      });
    }
  };

  const handleExport = () => {
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${currentProjectName}</title>
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

    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentProjectName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.html`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Exported",
      description: "Downloaded standalone HTML file."
    });
  };

  const handleShare = () => {
    const payload = JSON.stringify({ name: currentProjectName, html, css, js });
    const encoded = encodeURIComponent(payload);
    const shareUrl = `${window.location.origin}${window.location.pathname}#code=${encoded}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
    toast({
      title: "Link Copied",
      description: "Shareable project URL copied to clipboard."
    });
  };

  const handleLoadTemplate = (template: StarterTemplate) => {
    setHtml(template.html);
    setCss(template.css);
    setJs(template.js);
    setCurrentProjectName(template.name);
    setTemplateModalOpen(false);
    setConsoleMessages([]);
    toast({
      title: "Template Loaded",
      description: `Loaded "${template.name}".`
    });
  };

  const handleFormatCode = () => {
    if (activeTab === 'html') {
      setHtml(beautifyCode(html, 'html'));
    } else if (activeTab === 'css') {
      setCss(beautifyCode(css, 'css'));
    } else if (activeTab === 'js') {
      setJs(beautifyCode(js, 'javascript'));
    }
    toast({
      title: "Formatted",
      description: `Formatted ${activeTab.toUpperCase()} code.`
    });
  };

  const handleReplSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replInput.trim() || !iframeRef.current?.contentWindow) return;
    
    iframeRef.current.contentWindow.postMessage({
      type: 'nyeya_eval',
      code: replInput
    }, '*');
    setReplInput('');
  };

  const handleInjectCdn = (tag: string, name: string) => {
    if (tag.includes('<link') || tag.includes('<script')) {
      setHtml(prev => {
        if (prev.includes(tag)) return prev;
        if (prev.includes('</head>')) {
          return prev.replace('</head>', `  ${tag}\n</head>`);
        }
        return `${tag}\n${prev}`;
      });
      toast({
        title: "Library Injected",
        description: `Added ${name} to HTML head.`
      });
    }
  };

  const getViewportDimensions = () => {
    const isPortrait = orientation === 'portrait';
    switch (viewportSize) {
      case 'mobile-sm': 
        return isPortrait ? { width: '320px', height: '568px' } : { width: '568px', height: '320px' };
      case 'mobile': 
        return isPortrait ? { width: '375px', height: '667px' } : { width: '667px', height: '375px' };
      case 'tablet': 
        return isPortrait ? { width: '768px', height: '1024px' } : { width: '1024px', height: '768px' };
      default: 
        return { width: '100%', height: '100%' };
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

  const filteredConsoleMessages = consoleMessages.filter(msg => {
    if (consoleFilter === 'all') return true;
    return msg.level === consoleFilter;
  });

  const getLineCount = (code: string) => code.split('\n').length;

  const handleCodeInsert = (code: string, target?: 'html' | 'css' | 'js') => {
    if (target === 'html' || (!target && code.trim().startsWith('<'))) {
      setHtml(prev => {
        if (prev.includes('</body>')) {
          return prev.replace('</body>', `  ${code}\n</body>`);
        }
        return `${prev}\n${code}`;
      });
      setActiveTab('html');
      if (isMobileScreen) setMobileViewMode('code');
      toast({
        title: "Component Inserted",
        description: "Added to index.html within <body>."
      });
    } else if (target === 'css' || (!target && (code.includes('{') || code.includes('background:') || code.includes('box-shadow:') || code.includes('border-radius:')))) {
      setCss(prev => `${prev}\n\n${code}`);
      setActiveTab('css');
      if (isMobileScreen) setMobileViewMode('code');
      toast({
        title: "Styles Inserted",
        description: "Added to styles.css."
      });
    } else if (target === 'js' || (!target && code.includes('function') && !code.startsWith('<'))) {
      setJs(prev => `${prev}\n\n${code}`);
      setActiveTab('js');
      if (isMobileScreen) setMobileViewMode('code');
      toast({
        title: "Script Inserted",
        description: "Added to script.js."
      });
    } else {
      if (activeTab === 'html') setHtml(prev => prev + '\n' + code);
      else if (activeTab === 'css') setCss(prev => prev + '\n' + code);
      else setJs(prev => prev + '\n' + code);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden font-sans">
      
      {/* TOP HEADER */}
      <header className="h-12 border-b border-border/80 bg-card px-2.5 sm:px-3 flex items-center justify-between z-30 select-none shrink-0">
        
        {/* Left: Brand & Project Name */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <div className="w-6 h-6 rounded-md bg-neutral-900 border border-neutral-700 flex items-center justify-center text-indigo-400 font-bold text-xs shadow-sm">
              ★
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-xs tracking-tight font-display text-neutral-100 hidden sm:inline">
                Nyeya
              </span>
              <span className="text-[10px] text-neutral-500 font-mono hidden sm:inline">
                studio
              </span>
            </div>
          </div>

          <div className="h-3.5 w-[1px] bg-border mx-0.5 hidden sm:block" />

          {/* Project Input & File Switcher */}
          <div className="flex items-center gap-1 min-w-0">
            <input
              type="text"
              value={currentProjectName}
              onChange={(e) => setCurrentProjectName(e.target.value)}
              className="h-7 text-xs font-medium px-2 rounded-md bg-transparent hover:bg-neutral-800/40 focus:bg-neutral-800/80 focus:ring-1 focus:ring-neutral-600 border-none text-neutral-200 w-28 sm:w-44 truncate transition-colors"
              placeholder="Untitled Project"
            />
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60 shrink-0"
              onClick={() => setProjectModalOpen(true)}
              title="Open Projects"
            >
              <FolderOpen className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {/* Center: Desktop Triggers & Mobile View Switcher */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          
          {/* Mobile Screen Code vs Preview Segmented Toggle */}
          {isMobileScreen && (
            <div className="flex items-center bg-neutral-900 border border-neutral-800 p-0.5 rounded-lg">
              <button
                onClick={() => setMobileViewMode('code')}
                className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1 transition-all ${mobileViewMode === 'code' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-400 hover:text-neutral-200'}`}
              >
                <Code className="h-3 w-3" />
                <span>Code</span>
              </button>
              <button
                onClick={() => {
                  setMobileViewMode('preview');
                  updatePreview();
                }}
                className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1 transition-all ${mobileViewMode === 'preview' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-400 hover:text-neutral-200'}`}
              >
                <Eye className="h-3 w-3" />
                <span>Preview</span>
              </button>
            </div>
          )}

          {/* Desktop Templates & Libraries */}
          {!isMobileScreen && (
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-800/70"
                onClick={() => setTemplateModalOpen(true)}
              >
                <Sparkles className="h-3 w-3 mr-1.5 text-indigo-400" />
                Templates
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs font-medium text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
                onClick={() => setCdnModalOpen(true)}
              >
                <Package className="h-3 w-3 mr-1.5" />
                Libraries
              </Button>
            </div>
          )}

        </div>

        {/* Right Tools & Actions */}
        <div className="flex items-center gap-1">
          
          {/* Format (Desktop) */}
          {!isMobileScreen && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
              onClick={handleFormatCode}
              title="Format Code"
            >
              <Wand2 className="h-3.5 w-3.5 mr-1" />
              <span>Format</span>
            </Button>
          )}

          {/* Run (Desktop & Mobile) */}
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2.5 text-xs font-medium text-emerald-400 hover:bg-emerald-950/40 hover:text-emerald-300"
            onClick={() => {
              updatePreview();
              if (isMobileScreen) setMobileViewMode('preview');
            }}
            title="Run Code (Refresh Preview)"
          >
            <Play className="h-3 w-3 mr-1 fill-emerald-400" />
            <span>Run</span>
          </Button>

          {/* Save (Desktop) */}
          {!isMobileScreen && (
            <Button
              variant="secondary"
              size="sm"
              className="h-7 px-2.5 text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700/60"
              onClick={() => handleSave(true)}
            >
              <Save className="h-3 w-3 mr-1 text-neutral-400" />
              <span>Save</span>
            </Button>
          )}

          {/* Desktop Export & Share */}
          {!isMobileScreen && (
            <>
              <div className="h-3.5 w-[1px] bg-border mx-1" />

              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 text-neutral-400 hover:text-neutral-200"
                onClick={handleExport}
                title="Download HTML"
              >
                <Download className="h-3.5 w-3.5" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 text-neutral-400 hover:text-neutral-200"
                onClick={handleShare}
                title="Copy Share Link"
              >
                {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5" />}
              </Button>

              <div className="h-3.5 w-[1px] bg-border mx-1" />

              {/* Segmented Layout Selector */}
              <div className="flex items-center bg-neutral-900 border border-neutral-800 p-0.5 rounded-md">
                <button
                  onClick={() => setLayoutMode('split-vertical')}
                  className={`p-1 rounded text-xs transition-colors ${layoutMode === 'split-vertical' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-neutral-200'}`}
                  title="Split Vertical"
                >
                  <ColumnsIcon />
                </button>
                <button
                  onClick={() => setLayoutMode('split-horizontal')}
                  className={`p-1 rounded text-xs transition-colors ${layoutMode === 'split-horizontal' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-neutral-200'}`}
                  title="Split Horizontal"
                >
                  <RowsIcon />
                </button>
                <button
                  onClick={() => setLayoutMode('preview-only')}
                  className={`p-1 rounded text-xs transition-colors ${layoutMode === 'preview-only' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-neutral-200'}`}
                  title="Preview Only"
                >
                  <Eye className="h-3.5 w-3.5" />
                </button>
              </div>
            </>
          )}

          {/* DevTools Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className={`h-7 px-2 text-xs font-medium ${showDevTools ? 'text-indigo-400 bg-neutral-800/80' : 'text-neutral-400 hover:text-neutral-200'}`}
            onClick={() => setShowDevTools(!showDevTools)}
            title="Toggle DevTools Sidebar"
          >
            {showDevTools ? <PanelRightClose className="h-3.5 w-3.5 sm:mr-1" /> : <PanelRightOpen className="h-3.5 w-3.5 sm:mr-1" />}
            <span className="hidden sm:inline">Tools</span>
          </Button>

          {/* Mobile More Actions Menu Trigger */}
          {isMobileScreen && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
              onClick={() => setMobileMenuOpen(true)}
              title="More Actions"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          )}

        </div>
      </header>

      {/* MAIN WORKSPACE LAYOUT */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* DESKTOP SPLIT VIEW OR MOBILE TABBED VIEW */}
        {isMobileScreen ? (
          /* MOBILE WORKSPACE CONTAINER */
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            {mobileViewMode === 'code' ? (
              /* Mobile Code Editor View */
              <div className="flex-1 flex flex-col bg-card overflow-hidden">
                {/* File Tabs & Controls */}
                <div className="border-b border-border/80 bg-neutral-900/50 px-2 py-1 flex items-center justify-between overflow-x-auto no-scrollbar shrink-0">
                  <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as ActiveTab)} className="w-auto">
                    <TabsList className="bg-transparent h-8 p-0 gap-1">
                      <TabsTrigger 
                        value="html" 
                        className="data-[state=active]:bg-neutral-800/90 data-[state=active]:text-neutral-100 rounded-md h-7 px-2 text-xs font-mono font-medium flex items-center gap-1.5 text-neutral-400"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        <span>HTML</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="css" 
                        className="data-[state=active]:bg-neutral-800/90 data-[state=active]:text-neutral-100 rounded-md h-7 px-2 text-xs font-mono font-medium flex items-center gap-1.5 text-neutral-400"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                        <span>CSS</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="js" 
                        className="data-[state=active]:bg-neutral-800/90 data-[state=active]:text-neutral-100 rounded-md h-7 px-2 text-xs font-mono font-medium flex items-center gap-1.5 text-neutral-400"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                        <span>JS</span>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={handleFormatCode}
                      className="p-1.5 text-neutral-400 hover:text-white rounded bg-neutral-900 border border-neutral-800 text-xs"
                      title="Format"
                    >
                      <Wand2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* Monaco Editor */}
                <div className="flex-1 relative overflow-hidden bg-neutral-950/90">
                  <Editor
                    height="100%"
                    language={getLanguage()}
                    theme="vs-dark"
                    value={getCurrentCode()}
                    onChange={(val) => setCurrentCode(val || '')}
                    options={{
                      fontSize: 13,
                      fontFamily: '"JetBrains Mono", Menlo, Consolas, monospace',
                      minimap: { enabled: false },
                      wordWrap: 'on',
                      lineNumbers: 'on',
                      lineNumbersMinChars: 2,
                      folding: false,
                      readOnly: isReadOnly,
                      scrollBeyondLastLine: false,
                      smoothScrolling: true,
                      padding: { top: 8, bottom: 8 }
                    }}
                  />
                </div>
              </div>
            ) : (
              /* Mobile Preview View */
              <div className="flex-1 flex flex-col bg-neutral-950 overflow-hidden">
                <PreviewStageContent
                  viewportSize={viewportSize}
                  setViewportSize={setViewportSize}
                  orientation={orientation}
                  setOrientation={setOrientation}
                  zoomLevel={zoomLevel}
                  setZoomLevel={setZoomLevel}
                  isLiveAutoReload={isLiveAutoReload}
                  setIsLiveAutoReload={setIsLiveAutoReload}
                  showConsole={showConsole}
                  setShowConsole={setShowConsole}
                  getViewportDimensions={getViewportDimensions}
                  iframeRef={iframeRef}
                  showConsolePanel={showConsole}
                  consoleFilter={consoleFilter}
                  setConsoleFilter={setConsoleFilter}
                  filteredConsoleMessages={filteredConsoleMessages}
                  setConsoleMessages={setConsoleMessages}
                  replInput={replInput}
                  setReplInput={setReplInput}
                  handleReplSubmit={handleReplSubmit}
                  isMobile={true}
                />
              </div>
            )}
          </div>
        ) : (
          /* DESKTOP RESIZABLE SPLIT PANELS */
          <ResizablePanelGroup direction={layoutMode === 'split-horizontal' ? 'vertical' : 'horizontal'}>
            
            {/* CODE EDITOR PANEL */}
            {layoutMode !== 'preview-only' && (
              <>
                <ResizablePanel 
                  defaultSize={layoutMode === 'code-only' ? 100 : 50} 
                  minSize={25}
                  className="flex flex-col bg-card border-r border-border/80"
                >
                  {/* Editor File Tabs & Controls */}
                  <div className="border-b border-border/80 bg-neutral-900/50 px-2 flex items-center justify-between shrink-0">
                    
                    {/* File Tabs */}
                    <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as ActiveTab)} className="w-auto">
                      <TabsList className="bg-transparent h-8 p-0 gap-1">
                        <TabsTrigger 
                          value="html" 
                          className="data-[state=active]:bg-neutral-800/90 data-[state=active]:text-neutral-100 rounded-md h-7 px-2.5 text-xs font-mono font-medium flex items-center gap-1.5 transition-all text-neutral-400 hover:text-neutral-200"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                          <span>index.html</span>
                          <span className="text-[10px] text-neutral-500 font-normal ml-0.5">{getLineCount(html)}L</span>
                        </TabsTrigger>

                        <TabsTrigger 
                          value="css" 
                          className="data-[state=active]:bg-neutral-800/90 data-[state=active]:text-neutral-100 rounded-md h-7 px-2.5 text-xs font-mono font-medium flex items-center gap-1.5 transition-all text-neutral-400 hover:text-neutral-200"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                          <span>styles.css</span>
                          <span className="text-[10px] text-neutral-500 font-normal ml-0.5">{getLineCount(css)}L</span>
                        </TabsTrigger>

                        <TabsTrigger 
                          value="js" 
                          className="data-[state=active]:bg-neutral-800/90 data-[state=active]:text-neutral-100 rounded-md h-7 px-2.5 text-xs font-mono font-medium flex items-center gap-1.5 transition-all text-neutral-400 hover:text-neutral-200"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                          <span>script.js</span>
                          <span className="text-[10px] text-neutral-500 font-normal ml-0.5">{getLineCount(js)}L</span>
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>

                    {/* Editor Quick Configs */}
                    <div className="flex items-center gap-1">
                      <select
                        value={fontSize}
                        onChange={(e) => setFontSize(Number(e.target.value))}
                        className="bg-neutral-900 text-neutral-400 hover:text-neutral-200 text-[11px] font-mono py-0.5 px-1.5 rounded border border-neutral-800 focus:outline-none"
                      >
                        <option value={12}>12px</option>
                        <option value={13}>13px</option>
                        <option value={14}>14px</option>
                        <option value={16}>16px</option>
                      </select>

                      <button
                        className={`h-6 px-1.5 text-[11px] font-mono rounded transition-colors ${wordWrap === 'on' ? 'text-indigo-400 bg-neutral-800' : 'text-neutral-500 hover:text-neutral-300'}`}
                        onClick={() => setWordWrap(wordWrap === 'on' ? 'off' : 'on')}
                        title="Word Wrap"
                      >
                        Wrap
                      </button>
                    </div>
                  </div>

                  {/* Monaco Editor */}
                  <div className="flex-1 relative overflow-hidden bg-neutral-950/90">
                    <Editor
                      height="100%"
                      language={getLanguage()}
                      theme="vs-dark"
                      value={getCurrentCode()}
                      onChange={(val) => setCurrentCode(val || '')}
                      options={{
                        fontSize,
                        fontFamily: '"JetBrains Mono", Menlo, Consolas, monospace',
                        fontLigatures: true,
                        minimap: { enabled: false },
                        wordWrap,
                        lineNumbers: 'on',
                        lineNumbersMinChars: 3,
                        folding: true,
                        bracketMatching: 'always',
                        autoIndent: 'full',
                        formatOnPaste: true,
                        formatOnType: true,
                        readOnly: isReadOnly,
                        scrollBeyondLastLine: false,
                        smoothScrolling: true,
                        cursorBlinking: 'smooth',
                        padding: { top: 10, bottom: 10 }
                      }}
                    />
                  </div>
                </ResizablePanel>

                {layoutMode !== 'code-only' && <ResizableHandle withHandle />}
              </>
            )}

            {/* LIVE PREVIEW & REPL CONSOLE */}
            {layoutMode !== 'code-only' && (
              <ResizablePanel 
                defaultSize={layoutMode === 'preview-only' ? 100 : 50} 
                minSize={25}
                className="flex flex-col bg-neutral-950/40 overflow-hidden"
              >
                <PreviewStageContent
                  viewportSize={viewportSize}
                  setViewportSize={setViewportSize}
                  orientation={orientation}
                  setOrientation={setOrientation}
                  zoomLevel={zoomLevel}
                  setZoomLevel={setZoomLevel}
                  isLiveAutoReload={isLiveAutoReload}
                  setIsLiveAutoReload={setIsLiveAutoReload}
                  showConsole={showConsole}
                  setShowConsole={setShowConsole}
                  getViewportDimensions={getViewportDimensions}
                  iframeRef={iframeRef}
                  showConsolePanel={showConsole}
                  consoleFilter={consoleFilter}
                  setConsoleFilter={setConsoleFilter}
                  filteredConsoleMessages={filteredConsoleMessages}
                  setConsoleMessages={setConsoleMessages}
                  replInput={replInput}
                  setReplInput={setReplInput}
                  handleReplSubmit={handleReplSubmit}
                  isMobile={false}
                />
              </ResizablePanel>
            )}

          </ResizablePanelGroup>
        )}

        {/* DEVTOOLS SIDEBAR (DESKTOP DOCK OR MOBILE SLIDE-IN SHEET) */}
        {showDevTools && (
          isMobileScreen ? (
            /* Mobile Slide-in Drawer with Backdrop */
            <div className="fixed inset-0 z-50 flex">
              <div 
                className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
                onClick={() => setShowDevTools(false)}
              />
              <div className="relative ml-auto w-full max-w-sm h-full bg-card border-l border-border shadow-2xl z-10 flex flex-col">
                <DevToolsSidebar 
                  onColorSelect={(color) => {
                    const colorSnippet = `color: ${color};`;
                    handleCodeInsert(colorSnippet, 'css');
                  }}
                  onCodeInsert={handleCodeInsert}
                  onClose={() => setShowDevTools(false)}
                />
              </div>
            </div>
          ) : (
            /* Desktop Static Dock */
            <div className="w-80 border-l border-border/80 bg-card z-20 shrink-0">
              <DevToolsSidebar 
                onColorSelect={(color) => {
                  const colorSnippet = `color: ${color};`;
                  handleCodeInsert(colorSnippet, 'css');
                }}
                onCodeInsert={handleCodeInsert}
              />
            </div>
          )
        )}

      </div>

      {/* FOOTER STATUS BAR */}
      <footer className="h-6 border-t border-border/80 bg-card px-3 flex items-center justify-between text-[10px] text-neutral-500 font-mono select-none z-30 shrink-0">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Ready
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">UTF-8</span>
          <span>Auto-Save {autoSave ? 'On' : 'Off'}</span>
          <span>Nyeya Live Editor</span>
        </div>
      </footer>

      {/* MOBILE MORE ACTIONS MODAL */}
      <Dialog open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <DialogContent className="max-w-sm bg-neutral-950 border-neutral-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold font-display">Workspace Actions</DialogTitle>
            <DialogDescription className="text-xs text-neutral-400">Quick project actions and settings</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-2 my-2 text-xs">
            <button
              onClick={() => { setMobileMenuOpen(false); setTemplateModalOpen(true); }}
              className="p-3 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-900 flex flex-col items-center gap-2 text-center text-neutral-200"
            >
              <Sparkles className="h-4 w-4 text-indigo-400" />
              <span>Templates</span>
            </button>

            <button
              onClick={() => { setMobileMenuOpen(false); setCdnModalOpen(true); }}
              className="p-3 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-900 flex flex-col items-center gap-2 text-center text-neutral-200"
            >
              <Package className="h-4 w-4 text-sky-400" />
              <span>Libraries</span>
            </button>

            <button
              onClick={() => { setMobileMenuOpen(false); handleSave(true); }}
              className="p-3 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-900 flex flex-col items-center gap-2 text-center text-neutral-200"
            >
              <Save className="h-4 w-4 text-emerald-400" />
              <span>Save Project</span>
            </button>

            <button
              onClick={() => { setMobileMenuOpen(false); handleExport(); }}
              className="p-3 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-900 flex flex-col items-center gap-2 text-center text-neutral-200"
            >
              <Download className="h-4 w-4 text-amber-400" />
              <span>Export HTML</span>
            </button>

            <button
              onClick={() => { setMobileMenuOpen(false); handleShare(); }}
              className="p-3 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-900 flex flex-col items-center gap-2 text-center text-neutral-200 col-span-2"
            >
              <Share2 className="h-4 w-4 text-purple-400" />
              <span>Copy Shareable URL</span>
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* TEMPLATES HUB MODAL */}
      <Dialog open={templateModalOpen} onOpenChange={setTemplateModalOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-neutral-950 border-neutral-800 text-white p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-base font-bold font-display">
              Starter Templates Gallery
            </DialogTitle>
            <DialogDescription className="text-neutral-400 text-xs">
              Select a production-ready starter template for rapid prototyping.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2">
            {STARTER_TEMPLATES.map((tmpl) => (
              <div
                key={tmpl.id}
                className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 hover:bg-neutral-900 transition-all flex flex-col justify-between cursor-pointer group"
                onClick={() => handleLoadTemplate(tmpl)}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700/60">
                      {tmpl.badge}
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 text-neutral-600 group-hover:text-neutral-300 transition-colors" />
                  </div>
                  <h4 className="font-semibold text-neutral-100 text-sm group-hover:text-indigo-400 transition-colors">
                    {tmpl.name}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed line-clamp-2">
                    {tmpl.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-neutral-800/80 flex items-center justify-between">
                  <span className="text-[10px] text-neutral-500 font-mono">HTML • CSS • JS</span>
                  <span className="text-xs text-indigo-400 font-medium group-hover:underline">Use Template &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* SAVED PROJECTS MODAL */}
      <Dialog open={projectModalOpen} onOpenChange={setProjectModalOpen}>
        <DialogContent className="max-w-md bg-neutral-950 border-neutral-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-base font-bold font-display">
              Saved Projects
            </DialogTitle>
            <DialogDescription className="text-xs text-neutral-400">
              Switch or create sandboxes stored in local storage.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-1.5 max-h-56 overflow-y-auto my-2">
            {projects.map((proj) => (
              <div 
                key={proj.id} 
                className="p-2.5 rounded-lg border border-neutral-800 bg-neutral-900/50 flex items-center justify-between hover:border-neutral-700 transition-colors"
              >
                <div>
                  <h5 className="font-medium text-xs text-neutral-200">{proj.name}</h5>
                  <p className="text-[10px] text-neutral-500 font-mono">
                    {new Date(proj.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  size="sm"
                  className="h-6 text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium"
                  onClick={() => {
                    setCurrentProjectName(proj.name);
                    setHtml(proj.html);
                    setCss(proj.css);
                    setJs(proj.js);
                    setProjectModalOpen(false);
                    toast({ title: "Opened", description: `Loaded "${proj.name}".` });
                  }}
                >
                  Open
                </Button>
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button
              className="w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs h-8"
              onClick={() => {
                const newTitle = `Project ${projects.length + 1}`;
                setCurrentProjectName(newTitle);
                setHtml(STARTER_TEMPLATES[0].html);
                setCss(STARTER_TEMPLATES[0].css);
                setJs(STARTER_TEMPLATES[0].js);
                setProjectModalOpen(false);
                toast({ title: "New Project", description: `Created "${newTitle}".` });
              }}
            >
              <Plus className="h-3.5 w-3.5 mr-1" /> New Blank Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* CDN LIBRARIES MODAL */}
      <Dialog open={cdnModalOpen} onOpenChange={setCdnModalOpen}>
        <DialogContent className="max-w-md bg-neutral-950 border-neutral-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-base font-bold font-display">
              Add Libraries (CDN)
            </DialogTitle>
            <DialogDescription className="text-xs text-neutral-400">
              One-click insert popular CSS frameworks and script utilities into your HTML head.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 my-2">
            {[
              { name: 'Tailwind CSS CDN', tag: '<script src="https://cdn.tailwindcss.com"></script>', desc: 'Utility-first modern CSS framework' },
              { name: 'Font Awesome 6 Icons', tag: '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">', desc: 'Comprehensive vector icon library' },
              { name: 'Chart.js', tag: '<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>', desc: 'Flexible JavaScript charting library' },
              { name: 'Google Fonts (Plus Jakarta & Outfit)', tag: '<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">', desc: 'Modern typography' },
              { name: 'Animate.css', tag: '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>', desc: 'Cross-browser CSS animations' },
              { name: 'Canvas Confetti', tag: '<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>', desc: 'Celebration confetti particle effect' }
            ].map((lib) => (
              <div key={lib.name} className="p-2.5 rounded-lg border border-neutral-800 bg-neutral-900/60 flex items-center justify-between">
                <div>
                  <h5 className="font-medium text-xs text-neutral-200">{lib.name}</h5>
                  <p className="text-[10px] text-neutral-500">{lib.desc}</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-6 text-xs border-neutral-700 text-neutral-300 hover:bg-neutral-800"
                  onClick={() => handleInjectCdn(lib.tag, lib.name)}
                >
                  <Plus className="h-3 w-3 mr-1" /> Add
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}

// Sub-component for Live Preview Stage & Console
interface PreviewStageContentProps {
  viewportSize: ViewportSize;
  setViewportSize: (size: ViewportSize) => void;
  orientation: Orientation;
  setOrientation: (o: Orientation) => void;
  zoomLevel: number;
  setZoomLevel: (z: number) => void;
  isLiveAutoReload: boolean;
  setIsLiveAutoReload: (r: boolean) => void;
  showConsole: boolean;
  setShowConsole: (s: boolean) => void;
  getViewportDimensions: () => { width: string; height: string };
  iframeRef: React.RefObject<HTMLIFrameElement>;
  showConsolePanel: boolean;
  consoleFilter: 'all' | 'log' | 'warn' | 'error';
  setConsoleFilter: (f: 'all' | 'log' | 'warn' | 'error') => void;
  filteredConsoleMessages: ConsoleMessage[];
  setConsoleMessages: React.Dispatch<React.SetStateAction<ConsoleMessage[]>>;
  replInput: string;
  setReplInput: (s: string) => void;
  handleReplSubmit: (e: React.FormEvent) => void;
  isMobile: boolean;
}

function PreviewStageContent({
  viewportSize,
  setViewportSize,
  orientation,
  setOrientation,
  zoomLevel,
  setZoomLevel,
  isLiveAutoReload,
  setIsLiveAutoReload,
  showConsole,
  setShowConsole,
  getViewportDimensions,
  iframeRef,
  consoleFilter,
  setConsoleFilter,
  filteredConsoleMessages,
  setConsoleMessages,
  replInput,
  setReplInput,
  handleReplSubmit,
  isMobile
}: PreviewStageContentProps) {
  
  const isCustomFrame = viewportSize !== 'desktop';

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      
      {/* Preview Toolbar (Horizontally Scrollable) */}
      <div className="h-9 border-b border-border/80 bg-neutral-900/40 px-2 sm:px-2.5 flex items-center justify-between shrink-0 overflow-x-auto no-scrollbar gap-2">
        
        {/* Viewport Simulation Switches */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            className={`h-6 px-2 rounded text-[11px] font-mono transition-colors ${viewportSize === 'mobile-sm' ? 'bg-neutral-800 text-white font-medium shadow-sm' : 'text-neutral-400 hover:text-neutral-200'}`}
            onClick={() => setViewportSize('mobile-sm')}
            title="Small Mobile (320px)"
          >
            320p
          </button>
          <button
            className={`h-6 px-2 rounded text-[11px] flex items-center gap-1 transition-colors ${viewportSize === 'mobile' ? 'bg-neutral-800 text-white font-medium shadow-sm' : 'text-neutral-400 hover:text-neutral-200'}`}
            onClick={() => setViewportSize('mobile')}
            title="Mobile (375px)"
          >
            <Smartphone className="h-3 w-3" />
            <span>Mobile</span>
          </button>
          <button
            className={`h-6 px-2 rounded text-[11px] flex items-center gap-1 transition-colors ${viewportSize === 'tablet' ? 'bg-neutral-800 text-white font-medium shadow-sm' : 'text-neutral-400 hover:text-neutral-200'}`}
            onClick={() => setViewportSize('tablet')}
            title="Tablet (768px)"
          >
            <Tablet className="h-3 w-3" />
            <span>Tablet</span>
          </button>
          <button
            className={`h-6 px-2 rounded text-[11px] flex items-center gap-1 transition-colors ${viewportSize === 'desktop' ? 'bg-neutral-800 text-white font-medium shadow-sm' : 'text-neutral-400 hover:text-neutral-200'}`}
            onClick={() => setViewportSize('desktop')}
            title="Fluid Desktop (100%)"
          >
            <Monitor className="h-3 w-3" />
            <span>Desktop</span>
          </button>
        </div>

        {/* Preview Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          
          {/* Orientation Toggle (Portrait / Landscape) */}
          {isCustomFrame && (
            <button
              className="h-6 px-1.5 rounded text-[10px] font-mono flex items-center gap-1 bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white"
              onClick={() => setOrientation(orientation === 'portrait' ? 'landscape' : 'portrait')}
              title="Toggle Orientation (Portrait / Landscape)"
            >
              <SmartphoneNfc className="h-3 w-3" />
              <span className="capitalize hidden sm:inline">{orientation}</span>
            </button>
          )}

          {/* Zoom Controls */}
          <div className="flex items-center bg-neutral-900 rounded border border-neutral-800 px-0.5">
            <button
              className="h-5 w-5 flex items-center justify-center text-neutral-400 hover:text-neutral-200"
              onClick={() => setZoomLevel(Math.max(50, zoomLevel - 15))}
              title="Zoom Out"
            >
              <ZoomOut className="h-2.5 w-2.5" />
            </button>
            <button
              onClick={() => setZoomLevel(100)}
              className="text-[10px] font-mono px-1 text-neutral-400 hover:text-white"
              title="Reset Zoom (100%)"
            >
              {zoomLevel}%
            </button>
            <button
              className="h-5 w-5 flex items-center justify-center text-neutral-400 hover:text-neutral-200"
              onClick={() => setZoomLevel(Math.min(150, zoomLevel + 15))}
              title="Zoom In"
            >
              <ZoomIn className="h-2.5 w-2.5" />
            </button>
          </div>

          {/* Auto-Reload Toggle */}
          <button
            className={`h-6 px-2 rounded text-[11px] font-mono flex items-center gap-1 transition-colors ${isLiveAutoReload ? 'text-emerald-400' : 'text-neutral-500 hover:text-neutral-300'}`}
            onClick={() => setIsLiveAutoReload(!isLiveAutoReload)}
            title="Live Auto Reload"
          >
            <RotateCw className="h-2.5 w-2.5" />
            <span className="hidden sm:inline">Live</span>
          </button>

          {/* Console Toggle */}
          <button
            className={`h-6 px-2 rounded text-[11px] flex items-center gap-1 transition-colors ${showConsole ? 'text-indigo-400 bg-neutral-800' : 'text-neutral-400 hover:text-neutral-200'}`}
            onClick={() => setShowConsole(!showConsole)}
            title="Toggle Console"
          >
            <Terminal className="h-3 w-3" />
            <span className="hidden sm:inline">Console</span>
          </button>
        </div>
      </div>

      {/* Sandboxed Stage Area - FIX: Starts from top (items-center justify-start) and scrolls down smoothly without clipping */}
      <div className="flex-1 bg-neutral-950/80 overflow-auto flex flex-col items-center justify-start py-4 sm:py-6 px-2 sm:px-4 relative min-h-0 select-none">
        
        {isCustomFrame ? (
          /* Sleek Device Mockup Frame */
          <div 
            className="flex flex-col shrink-0 bg-neutral-900 border border-neutral-700/80 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden transition-all duration-150"
            style={{
              ...getViewportDimensions(),
              transform: zoomLevel !== 100 ? `scale(${zoomLevel / 100})` : undefined,
              transformOrigin: 'top center'
            }}
          >
            {/* Device Hardware Top Status Bar */}
            <div className="h-6 bg-neutral-950 border-b border-neutral-800 px-3 flex items-center justify-between text-[10px] text-neutral-400 font-mono select-none shrink-0">
              <span>9:41</span>
              {/* Dynamic Island / Speaker notch */}
              <div className="w-16 h-3 rounded-full bg-neutral-800 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-950"></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Wifi className="h-2.5 w-2.5" />
                <Battery className="h-2.5 w-2.5" />
              </div>
            </div>

            {/* Iframe Viewport Surface */}
            <div className="flex-1 w-full bg-white dark:bg-neutral-950 overflow-hidden relative">
              <iframe
                ref={iframeRef}
                srcDoc={buildCombinedHtml(html, css, js)}
                className="w-full h-full border-0"
                title="Live Mobile Preview"
                sandbox="allow-scripts allow-same-origin allow-modals allow-forms allow-popups"
              />
            </div>
          </div>
        ) : (
          /* Desktop Fluid Full-Size Viewport */
          <div 
            className="w-full h-full min-h-[350px] bg-white dark:bg-neutral-950 rounded-lg overflow-hidden border border-neutral-800/80 shadow-sm"
            style={{
              transform: zoomLevel !== 100 ? `scale(${zoomLevel / 100})` : undefined,
              transformOrigin: 'top center'
            }}
          >
            <iframe
              ref={iframeRef}
              srcDoc={buildCombinedHtml(html, css, js)}
              className="w-full h-full border-0"
              title="Live Desktop Preview"
              sandbox="allow-scripts allow-same-origin allow-modals allow-forms allow-popups"
            />
          </div>
        )}

      </div>

      {/* CONSOLE & REPL DOCK */}
      {showConsole && (
        <div className="h-44 sm:h-48 border-t border-border/80 bg-neutral-950 flex flex-col shrink-0">
          
          {/* Console Header Bar */}
          <div className="h-7 px-2.5 border-b border-border/60 bg-neutral-900/60 flex items-center justify-between text-xs shrink-0">
            <div className="flex items-center gap-2">
              <Terminal className="h-3 w-3 text-neutral-400" />
              <span className="font-mono text-[11px] text-neutral-300">Console</span>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1">
              {(['all', 'log', 'warn', 'error'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setConsoleFilter(filter)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${consoleFilter === filter ? 'bg-neutral-800 text-neutral-200 font-semibold' : 'text-neutral-500 hover:text-neutral-300'}`}
                >
                  {filter.toUpperCase()}
                </button>
              ))}

              <button
                className="h-5 w-5 flex items-center justify-center text-neutral-500 hover:text-red-400 rounded ml-1"
                onClick={() => setConsoleMessages([])}
                title="Clear Console"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Log Stream */}
          <div className="flex-1 p-2 overflow-y-auto font-mono text-[11px] space-y-1 select-text">
            {filteredConsoleMessages.length === 0 ? (
              <p className="text-neutral-600 italic text-[11px] p-1">No console logs.</p>
            ) : (
              filteredConsoleMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`py-0.5 px-1.5 rounded flex items-start justify-between gap-2 leading-relaxed ${
                    msg.level === 'error' ? 'text-red-400 bg-red-950/20' :
                    msg.level === 'warn' ? 'text-yellow-400 bg-yellow-950/20' :
                    msg.level === 'info' ? 'text-cyan-400 bg-cyan-950/20' :
                    'text-neutral-300'
                  }`}
                >
                  <div className="flex-1 break-all whitespace-pre-wrap">
                    {msg.message}
                  </div>
                  <span className="text-[10px] text-neutral-600 shrink-0">{msg.time}</span>
                </div>
              ))
            )}
          </div>

          {/* REPL Input */}
          <form onSubmit={handleReplSubmit} className="border-t border-border/60 bg-neutral-900/80 p-1 flex items-center gap-1.5 shrink-0">
            <span className="text-neutral-500 font-mono text-xs pl-1.5">&gt;</span>
            <input
              type="text"
              value={replInput}
              onChange={(e) => setReplInput(e.target.value)}
              placeholder="Execute JavaScript in iframe..."
              className="flex-1 bg-transparent border-none text-xs font-mono text-neutral-200 placeholder-neutral-600 focus:outline-none"
            />
            <Button type="submit" size="sm" className="h-5 text-[10px] font-medium bg-neutral-800 text-neutral-200 px-2 hover:bg-neutral-700">
              Eval
            </Button>
          </form>

        </div>
      )}

    </div>
  );
}

function ColumnsIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M12 3v18" />
    </svg>
  );
}

function RowsIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 12h18" />
    </svg>
  );
}
