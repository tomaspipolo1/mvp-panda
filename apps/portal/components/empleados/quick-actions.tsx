import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

export type QuickAction = {
  label: string
  description?: string
  icon: LucideIcon
  onClick?: () => void
  href?: string
}

type QuickActionsProps = {
  title?: string
  description?: string
  actions: QuickAction[]
}

export function QuickActions({ title = "Accesos rápidos", description, actions }: QuickActionsProps) {
  return (
    <Card className="shadow-none border-0 bg-transparent p-0">
      <CardHeader className="pb-2 px-0">
        <CardTitle className="text-base font-semibold text-[#1f2a44]">{title}</CardTitle>
        {description && <CardDescription className="text-[#4b5b75]">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="px-0 pt-0">
        <div className="flex flex-wrap gap-2">
          {actions.map((action) => {
            const Icon = action.icon
            const content = (
              <>
                <Icon className="h-4 w-4 mr-2 text-current" />
                {action.label}
              </>
            )
            if (action.href) {
              return (
                <Button
                  key={action.label}
                  asChild
                  className="bg-[#6ba5d8] text-[#0f1e3a] hover:bg-[#1f1e38] hover:text-white border-0"
                >
                  <a href={action.href}>{content}</a>
                </Button>
              )
            }
            return (
              <Button
                key={action.label}
                className="bg-[#6ba5d8] text-[#0f1e3a] hover:bg-[#1f1e38] hover:text-white border-0"
                onClick={action.onClick}
              >
                {content}
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
