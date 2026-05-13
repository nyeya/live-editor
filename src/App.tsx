import { useState, useEffect } from 'react';
import { CodeEditor } from './components/CodeEditor';
import { Toaster } from './components/ui/toaster';
import { STARTER_TEMPLATES } from './lib/templates';

function App() {
  const defaultTemplate = STARTER_TEMPLATES[0]; // SaaS Analytics Dashboard
  const [initialData, setInitialData] = useState<{ html: string; css: string; js: string }>({
    html: defaultTemplate.html,
    css: defaultTemplate.css,
    js: defaultTemplate.js
  });

  // Check URL hash for shared projects
  useEffect(() => {
    try {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#code=')) {
        const payloadStr = decodeURIComponent(hash.replace('#code=', ''));
        const parsed = JSON.parse(payloadStr);
        if (parsed.html || parsed.css || parsed.js) {
          setInitialData({
            html: parsed.html || '',
            css: parsed.css || '',
            js: parsed.js || ''
          });
        }
      }
    } catch (e) {
      console.error('Failed to parse shared code hash:', e);
    }
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden bg-background text-foreground antialiased select-none">
      <CodeEditor
        initialHtml={initialData.html}
        initialCss={initialData.css}
        initialJs={initialData.js}
      />
      <Toaster />
    </div>
  );
}

export default App;
