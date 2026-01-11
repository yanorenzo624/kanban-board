import { create } from "zustand";
import type { BoardState, Column, Card } from "./board.types";
import { loadFromStorage, saveToStorage } from "@/lib/storage";

interface BoardStore extends BoardState {
	addColumn: (title: string) => void;
	addCard: (columnId: string, title: string) => void;
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
			const cardId = crypto.randomUUID();

			const newCard: Card = {
				id: cardId,
				title,
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
	};
});
