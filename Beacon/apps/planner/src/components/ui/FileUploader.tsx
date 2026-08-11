import { useState, useRef, type ChangeEvent, type DragEvent } from 'react'
import { UploadCloud, FileText, CheckCircle2, AlertCircle, X, Eye } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface FileUploaderProps {
  label?: string
  accept?: string
  maxSizeMb?: number
  currentFileUrl?: string | null
  currentFileName?: string | null
  onFileSelect: (file: File, dataUrl?: string) => void
  onRemove?: () => void
  helperText?: string
}

export function FileUploader({
  label,
  accept = 'image/*,.pdf,.doc,.docx',
  maxSizeMb = 10,
  currentFileUrl,
  currentFileName,
  onFileSelect,
  onRemove,
  helperText = 'Upload PDF, PNG, or JPG (max 10MB)',
}: FileUploaderProps) {
  const safeCurrentUrl = currentFileUrl && !currentFileUrl.startsWith('blob:') ? currentFileUrl : null
  const [selectedFileName, setSelectedFileName] = useState<string | null>(currentFileName || null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(safeCurrentUrl)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    setError(null)
    if (file.size > maxSizeMb * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMb}MB limit.`)
      return
    }

    setSelectedFileName(file.name)
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string
      if (file.type.startsWith('image/')) {
        setPreviewUrl(dataUrl)
      } else {
        setPreviewUrl(null)
      }
      onFileSelect(file, dataUrl)
    }
    reader.onerror = () => {
      onFileSelect(file)
    }
    reader.readAsDataURL(file)
  }

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleClear = () => {
    setSelectedFileName(null)
    setPreviewUrl(null)
    setError(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
    if (onRemove) onRemove()
  }

  const activeImg = previewUrl || safeCurrentUrl

  return (
    <div className="space-y-2">
      {label && <label className="text-xs font-bold text-navy block">{label}</label>}

      {selectedFileName || activeImg ? (
        <div className="p-3 bg-page border border-border rounded-[16px] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {activeImg ? (
              <img
                src={activeImg}
                alt="Preview"
                onClick={() => setShowPreviewModal(true)}
                onError={() => setPreviewUrl(null)}
                className="w-12 h-12 rounded-[12px] object-cover border border-border shrink-0 cursor-pointer hover:opacity-85 transition-opacity bg-white shadow-xs"
              />
            ) : (
              <div className="w-12 h-12 rounded-[12px] bg-teal/10 text-teal flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
            )}
            <div className="min-w-0">
              <h5 className="text-xs font-bold text-navy truncate">
                {selectedFileName || currentFileName || 'Firm Photo'}
              </h5>
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Photo attached
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {activeImg && (
              <button
                type="button"
                onClick={() => setShowPreviewModal(true)}
                className="p-1.5 text-muted hover:text-navy rounded-[8px] hover:bg-border/50 cursor-pointer"
                title="View full image"
              >
                <Eye className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 text-muted hover:text-red-500 rounded-[8px] hover:bg-red-50 cursor-pointer"
              title="Remove file"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`p-6 rounded-[18px] border-2 border-dashed text-center transition-all cursor-pointer select-none ${
            dragActive
              ? 'border-teal bg-teal/10 scale-[1.01]'
              : 'border-border bg-page hover:border-teal/50 hover:bg-teal/5'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleChange}
            className="hidden"
          />

          <div className="w-12 h-12 rounded-full bg-teal/10 text-teal mx-auto flex items-center justify-center mb-3">
            <UploadCloud className="w-6 h-6" />
          </div>

          <h5 className="text-xs font-bold text-navy">
            Click to upload or drag & drop file
          </h5>
          <p className="text-[11px] text-muted mt-1">{helperText}</p>
        </div>
      )}

      {error && (
        <p className="text-[11px] text-red-500 font-medium flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5" /> {error}
        </p>
      )}

      {/* Lightbox Modal Preview */}
      <AnimatePresence>
        {showPreviewModal && (previewUrl || currentFileUrl) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-2xl w-full bg-white rounded-[24px] p-4 shadow-2xl space-y-3"
            >
              <div className="flex items-center justify-between border-b border-border pb-2 px-1">
                <span className="text-xs font-bold text-navy truncate">
                  {selectedFileName || currentFileName || 'Image Preview'}
                </span>
                <button
                  type="button"
                  onClick={() => setShowPreviewModal(false)}
                  className="w-7 h-7 rounded-full bg-page border border-border flex items-center justify-center text-muted hover:text-navy cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="max-h-[70vh] overflow-hidden rounded-[16px] flex items-center justify-center bg-page">
                <img
                  src={previewUrl || currentFileUrl || ''}
                  alt="Full preview"
                  className="max-h-[68vh] w-auto object-contain rounded-[16px]"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
