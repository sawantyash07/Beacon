import { useEffect } from 'react'

export interface ShortcutConfig {
  onOpenCommandPalette?: () => void
  onOpenShortcutsModal?: () => void
  onOpenAiModal?: () => void
  onNewTrip?: () => void
  onSave?: () => void
  onUndo?: () => void
  onRedo?: () => void
  onClose?: () => void
  onFocusSearch?: () => void
  onAddTraveler?: () => void
  onDuplicateTrip?: () => void
  onBulkAdd?: () => void
  onPreview?: () => void
  onExport?: () => void
  // Itinerary specific
  onAddActivity?: () => void
  onAddHotel?: () => void
  onAddTransport?: () => void
  onAddRestaurant?: () => void
  onAddDestination?: () => void
  onAddNote?: () => void
  onEditSelected?: () => void
  onOpenSelected?: () => void
  onDuplicateSelected?: () => void
  onDeleteSelected?: () => void
  onMoveUp?: () => void
  onMoveDown?: () => void
  onMovePrevDay?: () => void
  onMoveNextDay?: () => void
  onMoveTimeEarlier?: () => void
  onMoveTimeLater?: () => void
}

export function useKeyboardShortcuts(config: ShortcutConfig = {}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
      const modifier = isMac ? e.metaKey : e.ctrlKey

      // 1. MODIFIER COMBINATIONS (Always active unless specified)
      if (modifier) {
        // Ctrl/Cmd + K -> Command Palette
        if (e.key.toLowerCase() === 'k') {
          e.preventDefault()
          config.onOpenCommandPalette?.()
          window.dispatchEvent(new CustomEvent('beacon:open-command-palette'))
          return
        }

        // Ctrl/Cmd + J -> Ask Beacon AI
        if (e.key.toLowerCase() === 'j') {
          e.preventDefault()
          config.onOpenAiModal?.()
          window.dispatchEvent(new CustomEvent('beacon:open-ai-modal'))
          return
        }

        // Ctrl/Cmd + / -> Show Shortcuts Modal
        if (e.key === '/' || e.key === '?') {
          e.preventDefault()
          config.onOpenShortcutsModal?.()
          window.dispatchEvent(new CustomEvent('beacon:open-shortcuts-modal'))
          return
        }

        // Ctrl/Cmd + N (or with Shift)
        if (e.key.toLowerCase() === 'n') {
          e.preventDefault()
          if (e.shiftKey) {
            // Ctrl + Shift + N -> Add Traveler
            config.onAddTraveler?.()
            window.dispatchEvent(new CustomEvent('beacon:add-traveler'))
          } else {
            // Ctrl + N -> New Trip
            config.onNewTrip?.()
            window.dispatchEvent(new CustomEvent('beacon:new-trip'))
          }
          return
        }

        // Ctrl/Cmd + S -> Save
        if (e.key.toLowerCase() === 's') {
          e.preventDefault()
          config.onSave?.()
          window.dispatchEvent(new CustomEvent('beacon:save'))
          return
        }

        // Ctrl/Cmd + Shift + D -> Duplicate Entire Trip
        if (e.shiftKey && e.key.toLowerCase() === 'd') {
          e.preventDefault()
          config.onDuplicateTrip?.()
          window.dispatchEvent(new CustomEvent('beacon:duplicate-trip'))
          return
        }

        // Ctrl/Cmd + Shift + A -> Bulk Add
        if (e.shiftKey && e.key.toLowerCase() === 'a') {
          e.preventDefault()
          config.onBulkAdd?.()
          window.dispatchEvent(new CustomEvent('beacon:bulk-add'))
          return
        }

        // Ctrl/Cmd + P -> Preview Itinerary
        if (e.key.toLowerCase() === 'p') {
          e.preventDefault()
          config.onPreview?.()
          window.dispatchEvent(new CustomEvent('beacon:preview-itinerary'))
          return
        }

        // Ctrl/Cmd + E -> Export / Share
        if (e.key.toLowerCase() === 'e') {
          e.preventDefault()
          config.onExport?.()
          window.dispatchEvent(new CustomEvent('beacon:export-share'))
          return
        }

        // Ctrl/Cmd + Z (or Ctrl+Shift+Z) -> Undo / Redo
        if (e.key.toLowerCase() === 'z') {
          e.preventDefault()
          if (e.shiftKey) {
            config.onRedo?.()
            window.dispatchEvent(new CustomEvent('beacon:redo'))
          } else {
            config.onUndo?.()
            window.dispatchEvent(new CustomEvent('beacon:undo'))
          }
          return
        }
      }

      // 2. ESCAPE (Close / Cancel)
      if (e.key === 'Escape') {
        config.onClose?.()
        window.dispatchEvent(new CustomEvent('beacon:escape'))
        return
      }

      // 3. IF USER IS TYPING IN AN INPUT, DO NOT TRIGGER SINGLE-KEY SHORTCUTS
      if (isInput) return

      // / -> Focus Search
      if (e.key === '/') {
        e.preventDefault()
        config.onFocusSearch?.()
        window.dispatchEvent(new CustomEvent('beacon:focus-search'))
        return
      }

      // 4. SHIFT COMBINATIONS (Non-modifier)
      if (e.shiftKey) {
        if (e.key.toLowerCase() === 'd') {
          // Shift + D -> Duplicate Selected Item
          e.preventDefault()
          config.onDuplicateSelected?.()
          window.dispatchEvent(new CustomEvent('beacon:duplicate-selected'))
          return
        }
        if (e.key === 'ArrowUp') {
          // Shift + Up -> Move to Previous Day
          e.preventDefault()
          config.onMovePrevDay?.()
          window.dispatchEvent(new CustomEvent('beacon:move-prev-day'))
          return
        }
        if (e.key === 'ArrowDown') {
          // Shift + Down -> Move to Next Day
          e.preventDefault()
          config.onMoveNextDay?.()
          window.dispatchEvent(new CustomEvent('beacon:move-next-day'))
          return
        }
        if (e.key === 'ArrowLeft') {
          // Shift + Left -> Move Time Earlier
          e.preventDefault()
          config.onMoveTimeEarlier?.()
          window.dispatchEvent(new CustomEvent('beacon:move-time-earlier'))
          return
        }
        if (e.key === 'ArrowRight') {
          // Shift + Right -> Move Time Later
          e.preventDefault()
          config.onMoveTimeLater?.()
          window.dispatchEvent(new CustomEvent('beacon:move-time-later'))
          return
        }
      }

      // 5. ITINERARY SINGLE-KEY SHORTCUTS
      switch (e.key.toLowerCase()) {
        case 'a':
          e.preventDefault()
          config.onAddActivity?.()
          window.dispatchEvent(new CustomEvent('beacon:add-activity'))
          break
        case 'h':
          e.preventDefault()
          config.onAddHotel?.()
          window.dispatchEvent(new CustomEvent('beacon:add-hotel'))
          break
        case 't':
          e.preventDefault()
          config.onAddTransport?.()
          window.dispatchEvent(new CustomEvent('beacon:add-transport'))
          break
        case 'r':
          e.preventDefault()
          config.onAddRestaurant?.()
          window.dispatchEvent(new CustomEvent('beacon:add-restaurant'))
          break
        case 'd':
          e.preventDefault()
          config.onAddDestination?.()
          window.dispatchEvent(new CustomEvent('beacon:add-destination'))
          break
        case 'n':
          e.preventDefault()
          config.onAddNote?.()
          window.dispatchEvent(new CustomEvent('beacon:add-note'))
          break
        case 'e':
          e.preventDefault()
          config.onEditSelected?.()
          window.dispatchEvent(new CustomEvent('beacon:edit-selected'))
          break
        case 'enter':
          config.onOpenSelected?.()
          window.dispatchEvent(new CustomEvent('beacon:open-selected'))
          break
        case 'delete':
        case 'backspace':
          config.onDeleteSelected?.()
          window.dispatchEvent(new CustomEvent('beacon:delete-selected'))
          break
        case 'arrowup':
          if (!e.shiftKey) {
            config.onMoveUp?.()
            window.dispatchEvent(new CustomEvent('beacon:move-up'))
          }
          break
        case 'arrowdown':
          if (!e.shiftKey) {
            config.onMoveDown?.()
            window.dispatchEvent(new CustomEvent('beacon:move-down'))
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [config])
}
