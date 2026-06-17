import type { Book } from '../types/Book'
import BookItem from './BookItem'

interface BookListProps {
  books: Book[]
  isLoading: boolean
  error: string | null
  onRemove: (id: string) => void
  onToggleStatus: (book: Book) => void
}

export default function BookList({ books, isLoading, error, onRemove, onToggleStatus }: BookListProps) {
  if (isLoading) {
    return <p className="status-message">Carregando livros...</p>
  }

  if (error) {
    return <p className="status-message error">{error}</p>
  }

  if (books.length === 0) {
    return <p className="status-message">Nenhum livro cadastrado ainda.</p>
  }

  return (
    <ul className="book-list">
      {books.map((book) => (
        <BookItem key={book._id} book={book} onRemove={onRemove} onToggleStatus={onToggleStatus} />
      ))}
    </ul>
  )
}
