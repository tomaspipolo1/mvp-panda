import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

type StatCardProps = {
  title: string
  value: string
  subtitle?: string
  icon: LucideIcon
  iconColor?: string
}

export function StatCard({ title, value, subtitle, icon: Icon, iconColor = "#6ba5d8" }: StatCardProps) {
  return (
    <Card className="border-0 shadow-md bg-white rounded-lg h-full min-h-[150px] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-[#1f2a44]">{title}</CardTitle>
        <Icon className="h-4 w-4" style={{ color: iconColor }} />
      </CardHeader>
      <CardContent className="mt-auto">
        <div className="text-2xl font-bold text-[#1f2a44]">{value}</div>
        {subtitle && <p className="text-xs text-[#4b5b75]">{subtitle}</p>}
      </CardContent>
    </Card>
  )
}
