import { useCallback, useEffect, useState } from 'react'
import type { Book, NewBook } from './types/Book'
import { createBook, deleteBook, getBooks, updateBookStatus } from './services/api'
import BookForm from './components/BookForm'
import BookList from './components/BookList'

export default function App() {
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // useEffect carrega os livros uma única vez, quando o componente monta
  useEffect(() => {
    let isMounted = true

    async function loadBooks(): Promise<void> {
      try {
        const data = await getBooks()
        if (isMounted) setBooks(data)
      } catch (err) {
        console.error(err)
        if (isMounted) {
          setError(
            'Não foi possível carregar os livros. Verifique se a API_BASE_URL em services/api.ts está correta e ainda não expirou.'
          )
        }
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    loadBooks()

    // cleanup: evita atualizar estado de um componente já desmontado
    return () => {
      isMounted = false
    }
  }, [])

  const handleAddBook = useCallback(async (newBook: NewBook): Promise<void> => {
    setIsSubmitting(true)
    setError(null)
    try {
      const created = await createBook(newBook)
      setBooks((prev) => [...prev, created])
    } catch (err) {
      console.error(err)
      setError('Não foi possível adicionar o livro. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  const handleRemoveBook = useCallback(async (id: string): Promise<void> => {
    try {
      await deleteBook(id)
      setBooks((prev) => prev.filter((book) => book._id !== id))
    } catch (err) {
      console.error(err)
      setError('Não foi possível remover o livro. Tente novamente.')
    }
  }, [])

  const handleToggleStatus = useCallback(async (book: Book): Promise<void> => {
    const updatedBook: Book = {
      ...book,
      status: book.status === 'Lido' ? 'Não lido' : 'Lido',
    }
    try {
      await updateBookStatus(book._id, updatedBook)
      setBooks((prev) => prev.map((b) => (b._id === book._id ? updatedBook : b)))
    } catch (err) {
      console.error(err)
      setError('Não foi possível atualizar o status do livro.')
    }
  }, [])

  return (
    <div className="app">
      <div className="card">
        <header className="card-header">
          <h1>Catálogo de Livros</h1>
          <span className="book-count">{books.length} livro(s)</span>
        </header>

        <BookForm onAdd={handleAddBook} isSubmitting={isSubmitting} />

        <BookList
          books={books}
          isLoading={isLoading}
          error={error}
          onRemove={handleRemoveBook}
          onToggleStatus={handleToggleStatus}
        />
      </div>
    </div>
  )
}
