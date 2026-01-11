import { useState, useRef, useEffect, useContext } from "react"
import { BoardContext } from "@/app/providers/BoardProvider"

export function ColumnHeader({ columnId }: { columnId: string }) {
	const { state, dispatch } = useContext(BoardContext)
	const column = state.columns[columnId]

	const [isEditing, setIsEditing] = useState(false)
	const [title, setTitle] = useState(column.title)
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (isEditing) inputRef.current?.focus()
	}, [isEditing])

	function commitRename() {
		const trimmed = title.trim()
		if (trimmed && trimmed !== column.title) {
			dispatch({
				type: "COLUMN_RENAME",
				columnId,
				title: trimmed,
			})
		}
		setIsEditing(false)
	}

	function cancelRename() {
		setTitle(column.title)
		setIsEditing(false)
	}

	function onKeyDown(e: React.KeyboardEvent) {
		if (e.key === "Enter") commitRename()
		if (e.key === "Escape") cancelRename()
	}

	return (
		<div className="mb-3 flex items-center justify-between gap-2">
			{isEditing ? (
				<input
					ref={inputRef}
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					onBlur={commitRename}
					onKeyDown={onKeyDown}
					className="
            w-full rounded-md border px-2 py-1 text-sm
            bg-white text-slate-900
            focus:ring-2 focus:ring-blue-500
            dark:bg-slate-800 dark:text-slate-100
            dark:border-slate-700
          "
				/>
			) : (
				<button
					onClick={() => setIsEditing(true)}
					className="
            text-left text-lg font-semibold
            text-slate-800 hover:underline
            dark:text-slate-100
          "
				>
					{column.title}
				</button>
			)}

			<button
				onClick={() => {
					if (
						confirm(
							`Delete column "${column.title}" and all its cards?`
						)
					) {
						dispatch({
							type: "COLUMN_DELETE",
							columnId,
						})
					}
				}}
				className="
          rounded-md p-1 text-slate-500
          hover:bg-red-100 hover:text-red-700
          dark:text-slate-400
          dark:hover:bg-red-950/40 dark:hover:text-red-400
        "
				aria-label="Delete column"
			>
				🗑
			</button>
		</div>
	)
}
