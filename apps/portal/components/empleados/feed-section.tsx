export type FeedItem = {
  color?: string
  title: string
  subtitle?: string
  meta?: string
  dateBox?: string
}

type FeedSectionProps = {
  title: string
  description?: string
  items: FeedItem[]
  variant?: "activity" | "events"
}

export function FeedSection({ title, description, items, variant = "activity" }: FeedSectionProps) {
  const isEvents = variant === "events"
  const dotColor = "#6ba5d8"

  return (
    <div className="space-y-1">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-start space-x-4 py-3">
          {isEvents ? (
            <div className="w-12 h-12 rounded-md bg-[#6ba5d8] flex flex-col items-center justify-center text-white text-xs font-semibold flex-shrink-0 leading-tight">
              <span className="text-base font-bold">
                {(item.dateBox || "--").split(" ")[0] || "--"}
              </span>
              <span className="uppercase">
                {(item.dateBox || "").split(" ")[1] || ""}
              </span>
            </div>
          ) : (
            <div
              className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
              style={{ backgroundColor: item.color || dotColor }}
            />
          )}
          <div className="flex-1">
            <p className="text-base font-semibold text-[#0f1e3a]">{item.title}</p>
            {item.subtitle && <p className="text-sm text-[#4b5b75]">{item.subtitle}</p>}
            {item.meta && <p className="text-xs text-gray-500 mt-1">{item.meta}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}
