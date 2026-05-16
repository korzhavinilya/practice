import { create } from 'zustand';

// Типизация нашего нормализованного стейта
interface Card {
  id: string;
  text: string;
}

interface Column {
  id: string;
  title: string;
  cardIds: string[];
}

interface KanbanState {
  cards: Record<string, Card>;
  columns: Record<string, Column>;
  columnOrder: string[];
  // Экшены
  moveCard: (cardId: string, fromColumnId: string, toColumnId: string) => void;
  updateCardText: (cardId: string, newText: string) => void;
}

export const useKanbanStore = create<KanbanState>((set) => ({
  // Плоский словарь карточек
  cards: {
    'card-1': { id: 'card-1', text: 'Пофиксить баг с авторизацией' },
    'card-2': { id: 'card-2', text: 'Настроить CI/CD' },
    'card-3': { id: 'card-3', text: 'Обновить доку' },
  },
  
  // Плоский словарь колонок (хранят только ID карточек)
  columns: {
    'col-todo': { id: 'col-todo', title: 'To Do', cardIds: ['card-1', 'card-2'] },
    'col-in-progress': { id: 'col-in-progress', title: 'In Progress', cardIds: [] },
    'col-done': { id: 'col-done', title: 'Done', cardIds: ['card-3'] },
  },
  
  columnOrder: ['col-todo', 'col-in-progress', 'col-done'],

  // Экшен перемещения карточки между колонками
  moveCard: (cardId, fromColumnId, toColumnId) => 
    set((state) => {
      const fromCol = state.columns[fromColumnId];
      const toCol = state.columns[toColumnId];

      return {
        columns: {
          ...state.columns,
          [fromColumnId]: {
            ...fromCol,
            cardIds: fromCol.cardIds.filter((id) => id !== cardId),
          },
          [toColumnId]: {
            ...toCol,
            cardIds: [...toCol.cardIds, cardId],
          },
        },
      };
    }),

  // Экшен редактирования карточки
  updateCardText: (cardId, newText) =>
    set((state) => ({
      cards: {
        ...state.cards,
        [cardId]: { ...state.cards[cardId], text: newText },
      },
    })),
}));