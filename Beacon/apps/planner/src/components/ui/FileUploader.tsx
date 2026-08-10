import { useState, useRef, type ChangeEvent, type DragEvent } from 'react'
import { UploadCloud, FileText, CheckCircle2, AlertCircle, X, Eye } from 'lucide-react'

interface FileUploaderProps {
  label?: string
  accept?: string
  maxSizeMb?: number
  currentFileUrl?: string | null
  currentFileName?: string | null
  onFileSelect: (file: File) => void
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
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedFileName, setSelectedFileName] = useState<string | null>(currentFileName || null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentFileUrl || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    setError(null)
    if (file.size > maxSizeMb * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMb}MB limit.`)
      return
    }

    setSelectedFileName(file.name)
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = () => setPreviewUrl(reader.result as string)
      reader.readAsDataURL(file)
    } else {
      setPreviewUrl(null)
    }

    onFileSelect(file)
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

  return (
    <div className="space-y-2">
      {label && <label className="text-xs font-bold text-navy block">{label}</label>}

      {selectedFileName || previewUrl ? (
        <div className="p-3 bg-page border border-border rounded-[16px] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-10 h-10 rounded-[10px] object-cover border border-border shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded-[10px] bg-teal/10 text-teal flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
            )}
            <div className="min-w-0">
              <h5 className="text-xs font-bold text-navy truncate">
                {selectedFileName || 'Uploaded Document'}
              </h5>
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" /> File attached
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {previewUrl && (
              <a
                href={previewUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 text-muted hover:text-navy rounded-[8px] hover:bg-border/50"
                title="View preview"
              >
                <Eye className="w-4 h-4" />
              </a>
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
    </div>
  )
}
