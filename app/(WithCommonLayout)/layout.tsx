import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { NuqsAdapter } from 'nuqs/adapters/next/app'

const CommonLayout = ({children}:{
  children: React.ReactNode
}) => {
    return (
        <div className="relative flex min-h-screen flex-col">
            <Navigation />
            <NuqsAdapter>{children}</NuqsAdapter>
            <Footer />
        </div>
    )
}

export default CommonLayout