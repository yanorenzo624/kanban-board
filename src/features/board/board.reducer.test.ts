import { describe, it, expect } from "vitest"
import { boardReducer } from "./board.reducer"
import type { BoardState } from "./board.types"

const initialState: BoardState = {
	columns: {},
	columnOrder: [],
	cards: {},
}

describe("boardReducer", () => {
	it("adds a column", () => {
		const state = boardReducer(initialState, {
			type: "COLUMN_ADD",
			title: "Todo",
		})

		expect(state.columnOrder).toHaveLength(1)

		const columnId = state.columnOrder[0]
		expect(state.columns[columnId].title).toBe("Todo")
		expect(state.columns[columnId].cardIds).toEqual([])
	})

	it("renames a column", () => {
		const columnId = "col-1"

		const state: BoardState = {
			...initialState,
			columns: {
				[columnId]: {
					id: columnId,
					title: "Old",
					cardIds: [],
				},
			},
			columnOrder: [columnId],
		}

		const next = boardReducer(state, {
			type: "COLUMN_RENAME",
			columnId,
			title: "New",
		})

		expect(next.columns[columnId].title).toBe("New")
	})

	it("deletes a column and its cards", () => {
		const columnId = "col-1"
		const cardId = "card-1"

		const state: BoardState = {
			columns: {
				[columnId]: {
					id: columnId,
					title: "Todo",
					cardIds: [cardId],
				},
			},
			columnOrder: [columnId],
			cards: {
				[cardId]: {
					id: cardId,
					title: "Task",
				},
			},
		}

		const next = boardReducer(state, {
			type: "COLUMN_DELETE",
			columnId,
		})

		expect(next.columns[columnId]).toBeUndefined()
		expect(next.cards[cardId]).toBeUndefined()
		expect(next.columnOrder).toHaveLength(0)
	})

	it("updates a card", () => {
		const cardId = "card-1"

		const state: BoardState = {
			...initialState,
			cards: {
				[cardId]: {
					id: cardId,
					title: "Old",
				},
			},
		}

		const next = boardReducer(state, {
			type: "UPDATE_CARD",
			cardId,
			title: "New",
			description: "Details",
		})

		expect(next.cards[cardId].title).toBe("New")
		expect(next.cards[cardId].description).toBe("Details")
	})
})
