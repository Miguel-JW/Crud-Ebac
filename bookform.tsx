import { useState } from 'react'
import type { FormEvent, ChangeEvent } from 'react'
import type { NewBook, BookStatus } from '../types/Book'

// Props tipadas explicitamente: este componente só sabe que precisa
// de uma função "onAdd" e de um booleano "isSubmitting" — não conhece
// nada sobre axios ou sobre a API.
interface BookFormProps {
  onAdd: (book: NewBook) => void
  isSubmitting: boolean
}

export default function BookForm({ onAdd, isSubmitting }: BookFormProps) {
  const [title, setTitle] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [status, setStatus] = useState<BookStatus>('Não lido')

  // Cada handler tipado com o evento específico do elemento que dispara
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setAuthor(event.target.value)
  }

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    // O valor de um <select> sempre chega como string; o "as BookStatus"
    // é seguro aqui porque as únicas <option> existentes são os dois
    // valores válidos do tipo.
    setStatus(event.target.value as BookStatus)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    const trimmedTitle = title.trim()
    const trimmedAuthor = author.trim()
    if (!trimmedTitle || !trimmedAuthor) return

    const newBook: NewBook = { title: trimmedTitle, author: trimmedAuthor, status }
    onAdd(newBook)

    setTitle('')
    setAuthor('')
    setStatus('Não lido')
  }

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Título do livro"
        aria-label="Título do livro"
        required
      />
      <input
        type="text"
        value={author}
        onChange={handleAuthorChange}
        placeholder="Autor"
        aria-label="Autor"
        required
      />
      <select value={status} onChange={handleStatusChange} aria-label="Status de leitura">
        <option value="Não lido">Não lido</option>
        <option value="Lido">Lido</option>
      </select>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Adicionando...' : 'Adicionar livro'}
      </button>
    </form>
  )
}
