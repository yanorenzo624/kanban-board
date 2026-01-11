import clsx from "clsx"
import { useState, useContext, useMemo, useCallback, useEffect } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { BoardContext } from "@/app/providers/BoardProvider"
import type { Card as CardType } from "@/features/board/board.types"

type Props = {
  card: CardType
  columnId: string
}

export default function Card({ card, columnId }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    data: { columnId },
  })

  const { dispatch } = useContext(BoardContext)

  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [title, setTitle] = useState(card.title)
  const [description, setDescription] = useState(card.description ?? "")

  // Sync local state if card updates externally
  useEffect(() => {
    setTitle(card.title)
    setDescription(card.description ?? "")
  }, [card.title, card.description])

  const style = useMemo(
    () => ({
      transform: CSS.Transform.toString(transform),
      transition,
    }),
    [transform, transition]
  )

  const saveCard = useCallback(
    (next: { title?: string; description?: string }) => {
      dispatch({
        type: "UPDATE_CARD",
        cardId: card.id,
        title: next.title ?? title.trim(),
        description:
          next.description !== undefined
            ? next.description.trim() || undefined
            : description.trim() || undefined,
      })
    },
    [dispatch, card.id, title, description]
  )

  const cancelEdit = useCallback(() => {
    setTitle(card.title)
    setDescription(card.description ?? "")
    setIsEditingTitle(false)
    setIsEditingDescription(false)
  }, [card])

  const stopPropagation = (e: React.SyntheticEvent) => {
    e.stopPropagation()
  }

  const deleteCard = () => {
    dispatch({
      type: "DELETE_CARD",
      cardId: card.id,
      columnId,
    })
  }

  const disableDrag = isEditingTitle || isEditingDescription

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx(
        "group rounded-lg bg-white p-3 shadow-sm transition-opacity hover:shadow",
        "dark:bg-slate-700 dark:text-slate-100",
        isDragging && "opacity-30"
      )}
    >
      <div
        ref={setActivatorNodeRef}
        {...(!disableDrag ? listeners : {})}
        {...attributes}
        className="flex items-start justify-between gap-2 cursor-grab active:cursor-grabbing"
      >
        {isEditingTitle ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => {
              if (title.trim()) saveCard({ title })
              setIsEditingTitle(false)
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveCard({ title })
              if (e.key === "Escape") cancelEdit()
            }}
            autoFocus
            className="w-full rounded border px-2 py-1 text-sm bg-white dark:bg-slate-800"
          />
        ) : (
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => setIsEditingTitle(true)}
            className="text-left"
          >
            <h3 className="text-sm font-medium hover:underline">
              {card.title}
            </h3>
          </button>
        )}

        <button
          onPointerDown={stopPropagation}
          onClick={deleteCard}
          aria-label="Delete card"
          title="Delete card"
          className="rounded-md p-1 text-slate-400 opacity-0 transition group-hover:opacity-100 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30"
        >
          ✕
        </button>
      </div>

      {isEditingDescription ? (
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={() => {
            saveCard({ description })
            setIsEditingDescription(false)
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") cancelEdit()
          }}
          autoFocus
          className="mt-1 w-full rounded border px-2 py-1 text-sm bg-white dark:bg-slate-800"
        />
      ) : (
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => setIsEditingDescription(true)}
          className="text-left"
        >
          <p className="mt-1 text-sm hover:underline text-slate-500">
            {card.description || "Place card description."}
          </p>
        </button>
      )}
    </div>
  )
}
