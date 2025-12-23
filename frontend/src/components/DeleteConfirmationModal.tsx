"use client"

import { AlertTriangle } from "lucide-react"
import { useEffect, useRef } from "react"
import { Button } from "./ui/Button"

interface DeleteConfirmationModalProps {
  onConfirm: () => void
  onClose: () => void
  studentName: string
}

export function DeleteConfirmationModal({   onConfirm,onClose, studentName }: DeleteConfirmationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)



  const handleConfirm = () => {
    onConfirm()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative bg-card border border-border rounded-lg shadow-xl max-w-md w-full mx-4 p-6 animate-in fade-in-0 zoom-in-95"
      >
        {/* Icon */}
        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-destructive/10">
          <AlertTriangle className="h-6 w-6 text-destructive" />
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-2">Delete Student</h2>
          <p className="text-muted-foreground">
            Are you sure you want to delete <span className="font-medium text-foreground">{studentName}</span>? This
            action cannot be undone.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="delete" onClick={handleConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}
