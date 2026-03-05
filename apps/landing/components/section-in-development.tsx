import { Code2, Laptop2 } from "lucide-react"

type SectionInDevelopmentProps = {
  title: string
}

export function SectionInDevelopment({ title }: SectionInDevelopmentProps) {
  return (
    <div className="bg-white">
      <section className="w-full py-8 md:py-10 bg-plp-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-plp-primary">{title}</h1>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 md:py-10">
        <div className="max-w-2xl mx-auto rounded-2xl border border-plp-gray-200 bg-white p-6 md:p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex w-fit items-center gap-3 rounded-full bg-plp-primary/10 px-4 py-2 text-plp-primary">
            <Laptop2 className="h-5 w-5 animate-pulse" />
            <Code2 className="h-5 w-5" />
            <span className="text-sm font-medium">Actualización en curso</span>
          </div>
          <p className="text-2xl md:text-3xl font-semibold text-plp-primary">Seccion en desarrollo</p>
          <p className="mt-2 text-plp-gray-600">
            Estamos trabajando en esta sección.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-plp-primary/50 animate-pulse" />
            <span className="h-2.5 w-2.5 rounded-full bg-plp-primary/70 animate-pulse [animation-delay:150ms]" />
            <span className="h-2.5 w-2.5 rounded-full bg-plp-primary animate-pulse [animation-delay:300ms]" />
          </div>
        </div>
      </section>
    </div>
  )
}
