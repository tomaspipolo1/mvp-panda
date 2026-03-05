export function NewsCard() {
  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      <div className="h-[200px] flex items-center justify-center border-b border-gray-300">
        <div className="text-2xl font-bold text-gray-300">Imagen</div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium mb-2">Título de la noticia</h3>
        <p className="text-gray-600 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
        <div className="mt-4">
          <a href="#" className="text-blue-500 text-sm font-medium">
            Leer más →
          </a>
        </div>
      </div>
    </div>
  )
}
