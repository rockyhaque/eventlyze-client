import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title?: string
  description?: string
  className?: string
  heading?: string
  subheading?: string
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={cn("mb-8 space-y-2", className)}>
      <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
      {description && <p className="text-muted-foreground md:text-lg">{description}</p>}
    </div>
  )
}
