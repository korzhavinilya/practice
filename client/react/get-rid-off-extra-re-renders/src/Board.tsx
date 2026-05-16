import { useKanbanStore } from './store';

// --- КОМПОНЕНТ КАРТОЧКИ ---
// Подписывается ТОЛЬКО на свою собственную информацию
const Card = ({ cardId, columnId }: { cardId: string, columnId: string }) => {
  // Достаем конкретную карточку по ID
  const card = useKanbanStore((state) => state.cards[cardId]);
  const updateCardText = useKanbanStore((state) => state.updateCardText);
  const moveCard = useKanbanStore((state) => state.moveCard);

  console.log(`Ререндер карточки: ${card.text}`);

  return (
    <div style={{ border: '1px solid #ccc', padding: '8px', margin: '4px 0', backgroundColor: '#fff' }}>
      <input 
        value={card.text} 
        onChange={(e) => updateCardText(cardId, e.target.value)}
        style={{ width: '100%', border: 'none', outline: 'none' }}
      />
      
      {/* Кнопки для имитации Drag&Drop */}
      <div style={{ display: 'flex', gap: '4px', marginTop: '8px', fontSize: '12px' }}>
        <button onClick={() => moveCard(cardId, columnId, 'col-todo')}>В To Do</button>
        <button onClick={() => moveCard(cardId, columnId, 'col-in-progress')}>В В работе</button>
        <button onClick={() => moveCard(cardId, columnId, 'col-done')}>В Готово</button>
      </div>
    </div>
  );
};

// --- КОМПОНЕНТ КОЛОНКИ ---
// Подписывается ТОЛЬКО на свой массив cardIds
const Column = ({ columnId }: { columnId: string }) => {
  const column = useKanbanStore((state) => state.columns[columnId]);

  console.log(`Ререндер колонки: ${column.title}`);

  return (
    <div style={{ width: '250px', background: '#f4f5f7', padding: '12px', borderRadius: '8px' }}>
      <h3>{column.title} ({column.cardIds.length})</h3>
      
      <div>
        {column.cardIds.map((cardId) => (
          <Card key={cardId} cardId={cardId} columnId={columnId} />
        ))}
      </div>
    </div>
  );
};

// --- ГЛАВНЫЙ КОМПОНЕНТ ДОСКИ ---
// Подписывается ТОЛЬКО на массив ID колонок
export const Board = () => {
  const columnOrder = useKanbanStore((state) => state.columnOrder);
  
  console.log('Ререндер главной ДОСКИ');

  return (
    <div style={{ display: 'flex', gap: '16px', padding: '24px' }}>
      {columnOrder.map((columnId) => (
        <Column key={columnId} columnId={columnId} />
      ))}
    </div>
  );
};