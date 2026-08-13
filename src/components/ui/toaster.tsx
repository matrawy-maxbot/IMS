"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }, index) {
        return (
          <Toast 
            key={id} 
            {...props}
            style={{
              // تأثير التراص - كل إشعار قديم يصغر ويتحرك للخلف
              transform: index > 0 ? `translateY(-${index * 8}px) scale(${1 - index * 0.05})` : 'translateY(0) scale(1)',
              zIndex: 100 - index,
              opacity: index > 2 ? 0 : 1 - index * 0.15,
              transition: 'all 0.3s ease-in-out',
            }}
          >
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
