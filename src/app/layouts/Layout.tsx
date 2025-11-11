import { Header } from './Header'
import { Footer } from './Footer'

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="layout-container">
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
}