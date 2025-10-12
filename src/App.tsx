import { useState } from 'react';
import { CodeEditor } from './components/CodeEditor';
import { Toaster } from './components/ui/toaster';

function App() {
  const [html, setHtml] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Project</title>
</head>
<body>
    <h1>Hello World!</h1>
    <p>Start coding your amazing project here!</p>
</body>
</html>`);

  const [css, setCss] = useState(`/* Add your CSS styles here */
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    min-height: 100vh;
}

h1 {
    text-align: center;
    font-size: 3rem;
    margin-bottom: 1rem;
}

p {
    text-align: center;
    font-size: 1.2rem;
    opacity: 0.9;
}`);

  const [js, setJs] = useState(`// Add your JavaScript code here
console.log('Welcome to the Code Editor!');

// Example: Add some interactivity
document.addEventListener('DOMContentLoaded', function() {
    const heading = document.querySelector('h1');
    if (heading) {
        heading.addEventListener('click', function() {
            this.style.color = this.style.color === 'yellow' ? 'white' : 'yellow';
        });
    }
});`);

  const handleSave = (code: { html: string; css: string; js: string }) => {
    setHtml(code.html);
    setCss(code.css);
    setJs(code.js);
    console.log('Code saved:', code);
  };

  return (
    <>
      <CodeEditor
        initialHtml={html}
        initialCss={css}
        initialJs={js}
        onSave={handleSave}
      />
      <Toaster />
    </>
  );
}

export default App;
