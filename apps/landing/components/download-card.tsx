"use client"

import type { LucideIcon } from "lucide-react"
import Link from "next/link"
import { FileText, Download } from "lucide-react"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export interface DownloadCardProps {
  icon: LucideIcon
  title: string
  description: string
  fileSize?: string
  date?: string
  href: string
  className?: string
}

export function DownloadCard({
  icon: Icon,
  title,
  description,
  fileSize,
  date,
  href,
  className,
}: DownloadCardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white rounded-lg overflow-hidden",
        className
      )}
    >
      <CardHeader className="p-5 pb-3 space-y-1">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-plp-primary/10">
            <Icon className="h-5 w-5 text-plp-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
          </div>
        </div>
      </CardHeader>
      <Separator className="bg-gray-100" />
      <CardContent className="flex-1 p-5 pt-4 pb-4">
        <div className="flex items-center gap-2 text-gray-700">
          <FileText className="h-4 w-4 shrink-0 text-gray-500" />
          <span className="text-sm font-medium text-gray-900">{title}</span>
        </div>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{description}</p>
        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <span>{fileSize ?? "—"}</span>
          <span>{date ?? "—"}</span>
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Button
          asChild
          className="w-full bg-plp-primary hover:bg-plp-primary/90 text-white font-medium rounded-md"
        >
          <Link href={href}>
            <Download className="mr-2 h-4 w-4" />
            Descargar
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
