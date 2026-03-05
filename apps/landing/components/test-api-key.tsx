"use client"

import { useEffect, useState } from 'react'

export default function TestAPIKey() {
  const [result, setResult] = useState<string>('Probando...')

  useEffect(() => {
    const testAPI = async () => {
      try {
        const apiKey = 'AIzaSyB-cNjtmi6BU_SipbO1YlosMVytvI_QDKI'
        
        // Probar carga directa del script
        const scriptUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly&callback=initMap`
        
        console.log('Probando URL:', scriptUrl)
        
        // Crear función callback global
        (window as any).initMap = () => {
          console.log('✅ Callback de Google Maps ejecutado')
          setResult('✅ API Key funciona correctamente')
        }
        
        // Verificar si el script ya existe
        if (document.querySelector(`script[src*="maps.googleapis.com"]`)) {
          setResult('⚠️ Script de Google Maps ya cargado')
          return
        }
        
        // Crear script tag
        const script = document.createElement('script')
        script.src = scriptUrl
        script.async = true
        script.defer = true
        
        script.onload = () => {
          console.log('✅ Script de Google Maps cargado')
        }
        
        script.onerror = (error) => {
          console.error('❌ Error cargando script:', error)
          setResult('❌ Error cargando Google Maps')
        }
        
        document.head.appendChild(script)
        
        // Timeout
        setTimeout(() => {
          if (result === 'Probando...') {
            setResult('⏰ Timeout: Google Maps no respondió')
          }
        }, 8000)
        
      } catch (error) {
        console.error('Error en test:', error)
        setResult('❌ Error en la prueba')
      }
    }
    
    testAPI()
  }, [])

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="font-semibold mb-2">Test de API Key de Google Maps</h3>
      <p className="text-sm mb-2">Estado: {result}</p>
      <div className="text-xs text-gray-600">
        <p>API Key: AIzaSyB-cNjtmi6BU_SipbO1YlosMVytvI_QDKI</p>
        <p>Revisa la consola para más detalles</p>
      </div>
    </div>
  )
}
