import { useState } from 'react';
import './TrelloBoard.css';

interface Item {
  id: number;
  title: string;
}

interface Board {
  id: number;
  title: string;
  items: Item[];
}

export default function TrelloBoard() {
  const [boards, setBoards] = useState<Board[]>([
    {
      id: 1,
      title: 'To do',
      items: [
        { id: 1, title: 'JPW-135' },
        {
          id: 2,
          title: 'BFBR-712',
        },
        {
          id: 3,
          title: 'BFBR-512',
        },
      ],
    },
    {
      id: 2,
      title: 'In Progress',
      items: [
        { id: 4, title: 'JPW-399' },
        {
          id: 5,
          title: 'BFBR-381',
        },
        {
          id: 6,
          title: 'JPW-254',
        },
      ],
    },
    { id: 3, title: 'Done', items: [] },
  ]);

  const [currentBoard, setCurrentBoard] = useState<Board>();
  const [currentItem, setCurrentItem] = useState<Item>();

  function handleDragStart(
    e: React.DragEvent<HTMLDivElement>,
    board: Board,
    item: Item
  ) {
    setCurrentBoard(board);
    setCurrentItem(item);
  }

  function handleDragEnd(e: any) {
    e.target.style.boxShadow = 'none';
  }

  function handleDragLeave(e: any) {
    e.target.style.boxShadow = 'none';
  }

  function handleDragOver(e: any) {
    e.preventDefault();

    if (e.target.className === 'item') {
      e.target.style.boxShadow = '0 2px 3px gray';
    }
  }

  function handleDrop(e: any, board: Board, item: Item) {
    e.preventDefault();
    e.stopPropagation();

    if (currentItem) {
      const currentItemIndex = currentBoard?.items.indexOf(currentItem) || 0;
      currentBoard?.items.splice(currentItemIndex, 1);

      const dropItemIndex = board.items.indexOf(item);
      board.items.splice(dropItemIndex + 1, 0, currentItem);

      setBoards(
        boards.map((b) => {
          if (b.id === board.id) {
            return board;
          }

          if (currentBoard && b.id === currentBoard.id) {
            return currentBoard;
          }

          return b;
        })
      );
    }
  }

  function handleBoardDrop(e: any, board: Board) {
    e.preventDefault();

    if (currentItem) {
      const currentItemIndex = currentBoard?.items.indexOf(currentItem) || 0;
      currentBoard?.items.splice(currentItemIndex, 1);

      board.items.push(currentItem);

      setBoards(
        boards.map((b) => {
          if (b.id === board.id) {
            return board;
          }

          if (currentBoard && b.id === currentBoard.id) {
            return currentBoard;
          }

          return b;
        })
      );
    }
  }

  return (
    <div className="app">
      {boards.map((board) => (
        <div
          key={board.id}
          className="board"
          draggable={true}
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleBoardDrop(e, board)}
        >
          <div className="board__title">{board.title}</div>
          {board.items.map((item) => (
            <div
              key={item.id}
              className="item"
              draggable="true"
              onDragStart={(e) => handleDragStart(e, board, item)}
              onDragLeave={(e) => handleDragLeave(e)}
              onDragEnd={(e) => handleDragEnd(e)}
              onDragOver={(e) => handleDragOver(e)}
              onDrop={(e) => handleDrop(e, board, item)}
            >
              {item.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
