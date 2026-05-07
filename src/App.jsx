import { useState, useRef } from 'react'
import './App.css'

function App() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [status, setStatus] = useState({ loading: false, type: '', message: '' })
  const [resultData, setResultData] = useState(null)
  
  const cameraInputRef = useRef(null)
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      // Crear URL local para previsualizar
      setPreviewUrl(URL.createObjectURL(file))
      setStatus({ loading: false, type: '', message: '' })
      setResultData(null)
    }
  }

  const handleSubmit = async () => {
    if (!selectedFile) return

    setStatus({ loading: true, type: '', message: '' })

    const formData = new FormData()
    // El nombre 'image' puede variar según la configuración exacta del webhook en n8n
    formData.append('image', selectedFile) 

    try {
      const response = await fetch('https://n8n.srv937709.hstgr.cloud/webhook/71f31d54-710f-45a0-aec3-ba819af51631', {
        method: 'POST',
        body: formData,
        // Nota: Con FormData, el navegador establece automáticamente el boundary del Content-Type multipart
      })

      if (response.ok) {
        const responseData = await response.json()
        // n8n a veces devuelve un array, asegurarnos de tomar el primer elemento si es así
        const data = Array.isArray(responseData) ? responseData[0] : responseData
        setResultData(data)
        setStatus({ loading: false, type: 'success', message: '¡Imagen analizada exitosamente!' })
      } else {
        setStatus({ loading: false, type: 'error', message: `Ocurrió un error: ${response.status}` })
      }
    } catch (error) {
      setStatus({ loading: false, type: 'error', message: 'Error de conexión. Revisa CORS o tu red.' })
    }
  }

  const handleCancel = () => {
      setSelectedFile(null)
      setPreviewUrl(null)
      setResultData(null)
      setStatus({ loading: false, type: '', message: '' })
      if(cameraInputRef.current) cameraInputRef.current.value = ""
      if(fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>J.S.P Abogados</h1>
        <p>Agente de reconocimiento de imagen</p>
      </header>

      {/* Inputs Ocultos */}
      <input 
        type="file" 
        accept="image/*" 
        capture="environment" 
        className="hidden-input" 
        ref={cameraInputRef}
        onChange={handleFileChange}
      />
      <input 
        type="file" 
        accept="image/*" 
        className="hidden-input" 
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {resultData ? (
        <div className="result-container">
          <h2 className="result-title">Resultados del Análisis</h2>
          
          <div className="result-card">
            <div className="result-item">
              <span className="result-label">No. Asistencia</span>
              <span className="result-value">{resultData.no_asistencia || 'N/A'}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Aseguradora</span>
              <span className="result-value">{resultData.aseguradora || 'N/A'}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Abogado</span>
              <span className="result-value">{resultData.abogado || 'N/A'}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Fecha</span>
              <span className="result-value">{resultData.fecha || 'N/A'}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Placa</span>
              <span className="result-value">{resultData.placa || 'N/A'}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Ciudad</span>
              <span className="result-value">{resultData.ciudad || 'N/A'}</span>
            </div>
            <div className="result-item full-width">
              <span className="result-label">Dirección Siniestro</span>
              <span className="result-value">{resultData.direccion_siniestro || 'N/A'}</span>
            </div>
            <div className="result-item full-width">
              <span className="result-label">Nombre Asegurado</span>
              <span className="result-value">{resultData.nombre_asegurado || 'N/A'}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Teléfono</span>
              <span className="result-value">{resultData.Telef || 'N/A'}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Correo Electrónico</span>
              <span className="result-value">{resultData.Correo_electrónico || 'N/A'}</span>
            </div>
            <div className="result-item full-width">
              <span className="result-label">Conductor</span>
              <span className="result-value">{resultData.conductor || 'N/A'}</span>
            </div>
            <div className="result-item full-width">
              <span className="result-label">Comentarios / Hechos</span>
              <div className="result-value text-box">
                {
                  resultData['Comentario-Descripción Hechos'] || 
                  resultData['Comentario-Descripción Hec...'] || 
                  Object.entries(resultData).find(([k]) => k.startsWith('Comentario-Descrip'))?.[1] || 
                  'N/A'
                }
              </div>
            </div>
          </div>
          
          <button className="btn primary" onClick={handleCancel} style={{ marginTop: '1.5rem', width: '100%' }}>
            Analizar otra imagen
          </button>
        </div>
      ) : !previewUrl ? (
        <div className="actions-container">
          <button 
            className="btn primary" 
            onClick={() => cameraInputRef.current?.click()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
            </svg>
            Activar cámara del celular
          </button>
          
          <button 
            className="btn" 
            onClick={() => fileInputRef.current?.click()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            Subir archivo
          </button>
        </div>
      ) : (
        <div className="preview-container">
          <div className="image-preview-wrapper">
            <img src={previewUrl} alt="Vista previa" className="image-preview" />
          </div>
          
          <div className="actions-container" style={{ width: '100%' }}>
            <button 
              className="btn primary" 
              onClick={handleSubmit} 
              disabled={status.loading}
            >
              {status.loading ? (
                <>
                  <div className="spinner"></div> Enviando...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                  Procesar Imagen
                </>
              )}
            </button>
            
            <button 
              className="btn" 
              onClick={handleCancel} 
              disabled={status.loading}
            >
              Cancelar
            </button>
          </div>

          {status.message && (
            <div className={`status-message ${status.type}`}>
              {status.message}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default App
