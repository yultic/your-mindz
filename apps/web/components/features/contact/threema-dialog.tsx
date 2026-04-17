'use client'

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  Button
} from '@jess-web/ui'
import { ShieldCheck, ExternalLink, QrCode } from 'lucide-react'

interface ThreemaDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function ThreemaDialog({ isOpen, onClose }: ThreemaDialogProps) {
  const threemaId = "FUB2BNR3" 
  const threemaUrl = `https://threema.id/${threemaId}`

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] w-[90vw] max-w-[320px] bg-white rounded-[2rem] border-none shadow-[0_25px_70px_-15px_rgba(0,0,0,0.2)] overflow-hidden p-0"
        style={{ opacity: 1, visibility: 'visible' }}
      >
        <DialogHeader className="pt-8 px-6 text-center">
          <div className="mx-auto bg-[#dcede5]/50 w-14 h-14 rounded-full flex items-center justify-center mb-4">
            <ShieldCheck className="w-7 h-7 text-[#8fbfa8]" />
          </div>
          <DialogTitle className="text-xl font-serif text-[#4a5568]">
            Sichere Verbindung
          </DialogTitle>
          <DialogDescription className="text-[#4a5568]/70 pt-2 text-xs leading-relaxed px-2">
            Ihre Privatsphäre ist mir wichtig. Für den Support nutzen wir Threema.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center p-6 space-y-6">
          <div className="relative p-4 bg-white border border-[#8fbfa8]/10 rounded-[1.5rem] shadow-sm">
            <div className="bg-gray-50/30 w-32 h-32 rounded-lg flex items-center justify-center relative overflow-hidden">
                <QrCode className="w-24 h-24 text-[#4a5568]/5" />
                <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-[1px]">
                   <p className="text-[8px] font-bold text-[#4a5568]/30 uppercase tracking-[0.2em] text-center px-2">
                     QR-Code
                   </p>
                </div>
            </div>
          </div>

          <div className="text-center space-y-1">
            <p className="text-[9px] font-bold text-[#4a5568]/30 uppercase tracking-[0.3em]">Threema ID</p>
            <p className="text-xl font-mono font-bold text-[#8fbfa8] tracking-widest">{threemaId}</p>
          </div>

          <div className="w-full space-y-3">
            <Button 
              asChild
              className="w-full bg-[#8fbfa8] hover:bg-[#7aa894] text-white rounded-full py-6 text-[11px] font-bold tracking-[0.1em] transition-all shadow-md"
            >
              <a href={threemaUrl} target="_blank" rel="noopener noreferrer">
                IN THREEMA ÖFFNEN
              </a>
            </Button>
            
            <Button 
              variant="ghost" 
              onClick={onClose}
              className="w-full text-[#4a5568]/30 hover:text-[#4a5568]/50 text-[9px] font-bold tracking-[0.15em] uppercase"
            >
              Schließen
            </Button>
          </div>
        </div>

        <div className="bg-[#f4f5f4]/50 p-4 text-center border-t border-[#8fbfa8]/5">
          <p className="text-[9px] text-[#4a5568]/40 leading-tight">
            Anonym & sicher kommunizieren.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
