import type { BoardState } from "./board.types";

export type BoardAction =
	| { type: "MOVE_CARD"; cardId: string; fromColumnId: string; toColumnId: string; toIndex: number }
	| { type: "ADD_CARD"; columnId: string; title: string }

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

		default:
			return state
	}
}
