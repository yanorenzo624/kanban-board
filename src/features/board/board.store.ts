import { create } from "zustand";
import type { BoardState, Column, Card } from "./board.types";
import { loadFromStorage, saveToStorage } from "@/lib/storage";

interface BoardStore extends BoardState {
	addColumn: (title: string) => void;
	addCard: (columnId: string, title: string) => void;
	moveCard: (
		cardId: string,
		sourceColumnId: string,
		targetColumnId: string,
		targetIndex: number,
	) => void;
}

const initialState: BoardState = {
	columns: {},
	cards: {},
	columnOrder: [],
};

export const useBoardStore = create<BoardStore>((set, get) => {
	const persisted = loadFromStorage<BoardState>();

	return {
		...(persisted ?? initialState),

		addColumn: (title) => {
			const id = crypto.randomUUID();

			const newColumn: Column = {
				id,
				title,
				cardIds: [],
			};

			set((state) => {
				const next = {
					...state,
					columns: {
						...state.columns,
						[id]: newColumn,
					},
					columnOrder: [...state.columnOrder, id],
				};

				saveToStorage(next);
				return next;
			});
		},

		addCard: (columnId, title) => {
			const trimmed = title.trim();
			if (!trimmed) return;

			const cardId = crypto.randomUUID();

			const newCard: Card = {
				id: cardId,
				title: trimmed,
				createdAt: Date.now(),
			};

			set((state) => {
				const column = state.columns[columnId];
				if (!column) return state;

				const next = {
					...state,
					cards: {
						...state.cards,
						[cardId]: newCard,
					},
					columns: {
						...state.columns,
						[columnId]: {
							...column,
							cardIds: [...column.cardIds, cardId],
						},
					},
				};

				saveToStorage(next);
				return next;
			});
		},

		moveCard: (cardId, sourceId, targetId, targetIndex) => {
			set((state) => {
				const source = state.columns[sourceId];
				const target = state.columns[targetId];
				if (!source || !target) return state;

				// Remove from source
				const sourceCardIds = source.cardIds.filter((id) => id !== cardId);

				// Reordering within the same column
				if (sourceId === targetId) {
					sourceCardIds.splice(targetIndex, 0, cardId);

					const next = {
						...state,
						columns: {
							...state.columns,
							[sourceId]: {
								...source,
								cardIds: sourceCardIds,
							},
						},
					};

					saveToStorage(next);
					return next;
				}

				// Moving to a different column
				const targetCardIds = [...target.cardIds];
				targetCardIds.splice(targetIndex, 0, cardId);

				const next = {
					...state,
					columns: {
						...state.columns,
						[sourceId]: {
							...source,
							cardIds: sourceCardIds,
						},
						[targetId]: {
							...target,
							cardIds: targetCardIds,
						},
					},
				};

				saveToStorage(next);
				return next;
			});
		},
	};
});
