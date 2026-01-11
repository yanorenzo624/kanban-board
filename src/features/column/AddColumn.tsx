import { useState, useRef, useEffect, useContext } from "react"
import { BoardContext } from "@/app/providers/BoardProvider"

export default function AddColumn() {
  const [isOpen, setIsOpen] = useState(false)
  const { dispatch } = useContext(BoardContext)
  const [title, setTitle] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  function handleSubmit() {
    if (!title.trim()) return

    dispatch({
      type: "COLUMN_ADD",
      title,
    })
    setTitle("")
    setIsOpen(false)
  }

  function handleCancel() {
    setTitle("")
    setIsOpen(false)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSubmit()
    if (e.key === "Escape") handleCancel()
  }

  if (!isOpen) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(true)}
          className="
            w-72 shrink-0 rounded-xl border border-dashed
            border-slate-300 bg-slate-100
            px-3 py-2 text-center text-sm
            text-slate-600 hover:bg-slate-200
            dark:border-slate-700 dark:bg-slate-900
            dark:text-slate-300 dark:hover:bg-slate-800
          "
        >
          + Add column
        </button>
      </div>
    )
  }

  return (
    <div
      className="
        w-72 shrink-0 rounded-xl border
        border-slate-300 bg-slate-200 p-3
        dark:border-slate-700 dark:bg-slate-900
      "
    >
      <input
        ref={inputRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Column title"
        className="
          w-full rounded-md border px-2 py-1 text-sm
          bg-white text-slate-900
          focus:outline-none focus:ring-2 focus:ring-blue-500
          dark:bg-slate-800 dark:text-slate-100
          dark:border-slate-700
        "
      />

      <div className="mt-2 flex gap-2">
        <button
          onClick={handleSubmit}
          className="
            rounded-md bg-blue-600 px-3 py-1 text-sm
            text-white hover:bg-blue-700
          "
        >
          Add
        </button>

        <button
          onClick={handleCancel}
          className="
            rounded-md px-3 py-1 text-sm
            text-slate-600 hover:bg-slate-300
            dark:text-slate-400 dark:hover:bg-slate-800
          "
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
