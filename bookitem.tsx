import type { Book } from '../types/Book'

interface BookItemProps {
  book: Book
  onRemove: (id: string) => void
  onToggleStatus: (book: Book) => void
}

export default function BookItem({ book, onRemove, onToggleStatus }: BookItemProps) {
  const isRead = book.status === 'Lido'

  return (
    <li className="book-item">
      <div className="book-info">
        <strong>{book.title}</strong>
        <span className="book-author">{book.author}</span>
      </div>

      <div className="book-actions">
        {/* Clicar no badge alterna o status (operação opcional via PUT) */}
        <button
          type="button"
          className={`status-badge ${isRead ? 'read' : 'unread'}`}
          onClick={() => onToggleStatus(book)}
          title="Clique para alternar o status de leitura"
        >
          {book.status}
        </button>
        <button
          type="button"
          className="remove-btn"
          onClick={() => onRemove(book._id)}
          aria-label={`Remover "${book.title}"`}
        >
          ✕
        </button>
      </div>
    </li>
  )
}
