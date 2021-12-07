import { useRemirrorContext } from '@remirror/react-core';
import { SocialEditor } from '@remirror/react-editors/social';
import mammoth from 'mammoth';
import { useCallback, useState } from 'react';
import { htmlToProsemirrorNode } from 'remirror';

async function readFile(file: File) {
  return new Promise<ArrayBuffer>(resolve => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target!.result as ArrayBuffer);
    reader.readAsArrayBuffer(file);
  });
}

const MAMMOTH_OPTIONS = {
  styleMap: [
      `p[style-name='Title'] => h1`,
  ],
};

function FileSelector() {
  const { setContent, getState } = useRemirrorContext();
  const [html, setHtml] = useState('');

  const handleChange = useCallback(async (e: any) => {
    // Read file content
    const { files } = e.target;
    const file = files[0];
    const arrayBuffer = await readFile(file);

    // Convert to HTML
    const { value } = await mammoth.convertToHtml({ arrayBuffer }, MAMMOTH_OPTIONS);
    setHtml(value);

    // Convert to Prosemirror
    const doc = htmlToProsemirrorNode({ content: value , schema: getState().schema });

    // Fill editor
    setContent(doc);
  }, [setContent, getState]);

  return (
    <>
      <div style={{ margin: '8px 0 24px 0', padding: '8px', background: 'lightyellow' }}>
        <div>Choose file <code>data/word-file.docx</code></div>
        <div><input type="file" onChange={handleChange}></input></div>
      </div>
      {html && (
        <div style={{ background: '#eee', padding: '8px', fontSize: 'x-small' }}>
          <code>{html}</code>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <div style={{ padding: 16 }}>
      <SocialEditor>
        <FileSelector />
      </SocialEditor>
    </div>
  );
}
export default App;
