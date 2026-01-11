import type { Column, BoardState } from "./board.types";

export type BoardAction =
	| { type: "MOVE_CARD"; cardId: string; fromColumnId: string; toColumnId: string; toIndex: number }
	| { type: "ADD_CARD"; columnId: string; title: string }
	| { type: "UPDATE_CARD"; cardId: string; title: string; description?: string }
	| { type: "DELETE_CARD"; cardId: string; columnId: string }
	| { type: "COLUMN_ADD"; title: string }
	| { type: "COLUMN_RENAME"; columnId: string; title: string }
	| { type: "COLUMN_DELETE"; columnId: string }

export function boardReducer(state: BoardState, action: BoardAction): BoardState {
	switch (action.type) {
		case "MOVE_CARD": {
			const { cardId, fromColumnId, toColumnId, toIndex } = action

			if (fromColumnId === toColumnId) {
				const column = state.columns[fromColumnId]
				const newCardIds = [...column.cardIds]

				const fromIndex = newCardIds.indexOf(cardId)
				newCardIds.splice(fromIndex, 1)
				newCardIds.splice(toIndex, 0, cardId)

				return {
					...state,
					columns: {
						...state.columns,
						[fromColumnId]: {
							...column,
							cardIds: newCardIds,
						},
					},
				}
			}

			const fromColumn = state.columns[fromColumnId]
			const toColumn = state.columns[toColumnId]

			return {
				...state,
				columns: {
					...state.columns,
					[fromColumnId]: {
						...fromColumn,
						cardIds: fromColumn.cardIds.filter(id => id !== cardId),
					},
					[toColumnId]: {
						...toColumn,
						cardIds: [
							...toColumn.cardIds.slice(0, toIndex),
							cardId,
							...toColumn.cardIds.slice(toIndex),
						],
					},
				},
			}
		}

		case "ADD_CARD": {
			const id = crypto.randomUUID()
			return {
				...state,
				cards: {
					...state.cards,
					[id]: { id, title: action.title },
				},
				columns: {
					...state.columns,
					[action.columnId]: {
						...state.columns[action.columnId],
						cardIds: [...state.columns[action.columnId].cardIds, id],
					},
				},
			}
		}

		case "UPDATE_CARD": {
			const { cardId, title, description } = action
			const card = state.cards[cardId]
			if (!card) return state

			return {
				...state,
				cards: {
					...state.cards,
					[cardId]: {
						...card,
						title,
						description,
					},
				},
			}
		}


		case "DELETE_CARD": {
			const { cardId, columnId } = action

			const { [cardId]: _, ...remainingCards } = state.cards

			return {
				...state,
				cards: remainingCards,
				columns: {
					...state.columns,
					[columnId]: {
						...state.columns[columnId],
						cardIds: state.columns[columnId].cardIds.filter(id => id !== cardId),
					},
				},
			}
		}

		case "COLUMN_ADD": {
			const id = crypto.randomUUID()

			const newColumn: Column = {
				id,
				title: action.title,
				cardIds: [],
			}

			return {
				...state,
				columns: {
					...state.columns,
					[id]: newColumn,
				},
				columnOrder: [...state.columnOrder, id],
			}
		}

		case "COLUMN_RENAME": {
			const { columnId, title } = action
			const column = state.columns[columnId]
			if (!column) return state

			return {
				...state,
				columns: {
					...state.columns,
					[columnId]: {
						...column,
						title,
					},
				},
			}
		}

		case "COLUMN_DELETE": {
			const { columnId } = action
			const column = state.columns[columnId]
			if (!column) return state

			const newColumns = { ...state.columns }
			delete newColumns[columnId]

			const newColumnOrder = state.columnOrder.filter(
				(id) => id !== columnId
			)

			// Remove cards belonging to the column
			const newCards = { ...state.cards }
			column.cardIds.forEach((cardId) => {
				delete newCards[cardId]
			})

			return {
				...state,
				columns: newColumns,
				columnOrder: newColumnOrder,
				cards: newCards,
			}
		}

		default:
			return state
	}
}
