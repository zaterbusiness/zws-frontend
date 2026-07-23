import React, { useState } from 'react'
import {
  SandpackProvider,
  SandpackPreview,
  useSandpack,
} from '@codesandbox/sandpack-react'

// Convert flat {path: content} map (e.g. "src/App.jsx") into Sandpack's
// expected shape: { "/src/App.jsx": { code: "..." } }
function toSandpackFiles(flatFiles) {
  const result = {}
  for (const [path, content] of Object.entries(flatFiles)) {
    let key = path.startsWith('/') ? path : `/${path}`
    if (key === '/src/main.jsx') key = '/src/index.js'  // classic template's expected entry
    result[key] = { code: content }
  }
  return result
}

// Small child so it can read Sandpack's live status via the hook
// (must live inside SandpackProvider).
function StatusOverlay() {
  const { sandpack } = useSandpack()
  const { status, error } = sandpack

  if (status === 'running' && !error) return null

  if (error) {
    return (
      <div style={{ padding: 20, height: '100%', overflow: 'auto', background: '#0d0d1a', color: '#f87171' }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Preview failed to start</div>
        <pre style={{ whiteSpace: 'pre-wrap', fontSize: 12, color: '#c8d3f5' }}>
          {error.message}
        </pre>
      </div>
    )
  }

  return (
    <div style={{
      position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#8080c0', fontFamily: 'monospace', fontSize: 13, background: '#0d0d1a', zIndex: 1
    }}>
      Bundling preview...
    </div>
  )
}

export default function SandpackPreviewComponent({ files }) {
  const [device, setDevice] = useState('laptop') // 'laptop' | 'mobile'

  if (!files || Object.keys(files).length === 0) return null

  const sandpackFiles = toSandpackFiles(files)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0d0d1a' }}>
      <div style={{
        display: 'flex', gap: 8, padding: '8px 12px',
        borderBottom: '1px solid #1e1e3a', background: '#0a0a16', flexShrink: 0
      }}>
        <button
          onClick={() => setDevice('laptop')}
          style={{
            padding: '6px 12px', borderRadius: 7, fontSize: 12, fontWeight: 700,
            cursor: 'pointer', fontFamily: 'Nunito,sans-serif',
            border: '1px solid #2a2a4a',
            background: device === 'laptop' ? '#5b4fff' : '#1a1a30',
            color: device === 'laptop' ? '#fff' : '#8080c0',
          }}
        >
          💻 Laptop
        </button>
        <button
          onClick={() => setDevice('mobile')}
          style={{
            padding: '6px 12px', borderRadius: 7, fontSize: 12, fontWeight: 700,
            cursor: 'pointer', fontFamily: 'Nunito,sans-serif',
            border: '1px solid #2a2a4a',
            background: device === 'mobile' ? '#5b4fff' : '#1a1a30',
            color: device === 'mobile' ? '#fff' : '#8080c0',
          }}
        >
          📱 Mobile
        </button>
      </div>

      <div style={{
        flex: 1, display: 'flex', justifyContent: 'center', alignItems: device === 'mobile' ? 'flex-start' : 'stretch',
        overflow: 'auto', background: device === 'mobile' ? '#111122' : 'transparent', padding: device === 'mobile' ? '20px 0' : 0
      }}>
        <div style={
          device === 'mobile'
            ? { width: 390, height: 780, border: '8px solid #222', borderRadius: 28, overflow: 'hidden', flexShrink: 0, position: 'relative' }
            : { width: '100%', height: '100%', position: 'relative' }
        }>
          <SandpackProvider
  template="react"
  files={sandpackFiles}
  customSetup={{
    dependencies: {
      'react-router-dom': '^6.26.0',
    },
    entry: '/src/index.js',
  }}
  options={{
   recompileMode: 'delayed',
    recompileDelay: 300,
  }}
  style={{ height: '100%' }}
>
            <StatusOverlay />
            <SandpackPreview
              showOpenInCodeSandbox={false}
              showRefreshButton
              showNavigator={false}
              style={{ height: '100%', border: 'none' }}
            />
          </SandpackProvider>
        </div>
      </div>
    </div>
  )
}