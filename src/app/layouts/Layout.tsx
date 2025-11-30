import { Header } from '../layouts/Header' 
import { Footer } from '../layouts/Footer' 
import { SelectUser } from "@/db/schema/users";

export const MainLayout = ({ 
  children, 
  user 
}: { 
  children: React.ReactNode; 
  user?: SelectUser | null;
}) => {
  return (
    <div className="layout-container">
      <Header user={user} />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
}