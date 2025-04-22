"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { saveOutfit } from "@/lib/auth-utils"
import { useToast } from "@/hooks/use-toast"

type OutfitSaverProps = {
  selectedItems: any
  disabled: boolean
}

export function OutfitSaver({ selectedItems, disabled }: OutfitSaverProps) {
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const handleSaveOutfit = () => {
    setIsSaving(true)

    // Simulate saving delay
    setTimeout(() => {
      const success = saveOutfit(selectedItems)

      if (success) {
        toast({
          title: "Outfit saved!",
          description: "Your outfit has been saved to your collection.",
          variant: "default",
        })
      } else {
        toast({
          title: "Error saving outfit",
          description: "There was a problem saving your outfit. Please try again.",
          variant: "destructive",
        })
      }

      setIsSaving(false)
    }, 1000)
  }

  return (
    <div className="mt-4 pt-4 border-t border-gray-800">
      <Button
        onClick={handleSaveOutfit}
        disabled={disabled || isSaving}
        className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white"
      >
        {isSaving ? (
          <>
            <span className="mr-2 h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
            Saving...
          </>
        ) : (
          "Save Outfit"
        )}
      </Button>
    </div>
  )
}
