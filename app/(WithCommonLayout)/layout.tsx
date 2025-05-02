import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"

const CommonLayout = ({children}:{
  children: React.ReactNode
}) => {
    return (
        <div className="relative flex min-h-screen flex-col">
            <Navigation />
            {children}
            <Footer />
        </div>
    )
}

export default CommonLayout