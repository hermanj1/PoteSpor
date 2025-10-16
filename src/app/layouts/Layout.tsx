import { Header } from './Header'
import { Footer } from './Footer'

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <body>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </body>
  )
}