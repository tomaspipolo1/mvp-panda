"use client"

import { useState, useEffect } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import type { AuthorityItem } from "@/lib/authorities-data"

type AuthoritiesCarouselProps = {
  authorities: AuthorityItem[]
  className?: string
}

export function AuthoritiesCarousel({ authorities, className = "" }: AuthoritiesCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
    api.on("select", () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  return (
    <div className={className}>
      <div className="w-full max-w-6xl mx-auto relative px-12 sm:px-16 md:px-16 lg:px-20 py-4">
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{ align: "center", loop: true }}
        >
          <CarouselContent className="-ml-4">
            {authorities.map((authority, idx) => {
              const isCenter = current === idx
              return (
                <CarouselItem key={idx} className="pl-4 basis-full md:basis-1/3">
                  <div className="h-full flex items-center justify-center py-6 px-2 sm:px-4">
                    <Card
                      className={`overflow-hidden shadow-lg transition-all duration-300 flex flex-col w-full mx-auto ${
                        isCenter ? "z-10" : "opacity-90"
                      }`}
                      style={{
                        backgroundColor: "white",
                        height: "240px",
                        width: "100%",
                        maxWidth: isMobile ? "280px" : "100%",
                        transform: isMobile ? "scale(1)" : isCenter ? "scale(1.15)" : "scale(0.85)",
                        transformOrigin: "center",
                      }}
                    >
                      <CardContent className="p-6 flex flex-col items-center text-center flex-1">
                        <div className="mb-4">
                          <img
                            src={authority.image}
                            alt={authority.name}
                            className={`w-24 h-24 md:w-28 md:h-28 rounded-full object-cover ${
                              isCenter ? "" : "grayscale"
                            }`}
                            style={{ filter: isCenter ? "none" : "grayscale(100%)" }}
                          />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold mb-2" style={{ color: "#1B1E4A" }}>
                          {authority.name}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{authority.position}</p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious className="-left-6 sm:-left-8 md:-left-12 h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 bg-white/90 hover:bg-white border-gray-300 shadow-lg [&>svg]:h-5 [&>svg]:w-5 md:[&>svg]:h-6 md:[&>svg]:w-6" />
          <CarouselNext className="-right-6 sm:-right-8 md:-right-12 h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 bg-white/90 hover:bg-white border-gray-300 shadow-lg [&>svg]:h-5 [&>svg]:w-5 md:[&>svg]:h-6 md:[&>svg]:w-6" />
        </Carousel>
      </div>
    </div>
  )
}
