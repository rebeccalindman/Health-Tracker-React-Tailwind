import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { HouseIcon } from "lucide-react"

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <AlertTriangle className="w-12 h-12 text-destructive mb-4" />
      <h1 className="text-4xl font-bold mb-2">404 – Page not found</h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        The page you are looking for does not exist or has been moved. Check the URL or go back to the homepage.
      </p>
      <Button onClick={() => navigate("/")} className="flex items-center gap-2">
        <HouseIcon/>To homepage
      </Button>
    </div>
  )
}

export default NotFound

