import { toast as sonnerToast } from "sonner"

export const useToast = () => {
  const toast = (props: {
    title?: string
    description?: string
    variant?: "default" | "destructive" | "success"
  }) => {
    const { title, description, variant = "default" } = props
    
    switch (variant) {
      case "destructive":
        return sonnerToast.error(title, { description })
      case "success":
        return sonnerToast.success(title, { description })
      default:
        return sonnerToast(title, { description })
    }
  }

  return { toast }
}

export { sonnerToast as toast }