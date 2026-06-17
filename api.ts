import axios from 'axios'
import type { Book, NewBook } from '../types/Book'

/**
 * URL única gerada em https://crudcrud.com.
 *
 * Como obter a sua:
 * 1. Acesse https://crudcrud.com
 * 2. Copie a URL exibida (algo como "https://crudcrud.com/api/<hash>")
 * 3. Acrescente o nome do recurso no final, ex: "/livros"
 * 4. Cole o resultado abaixo
 *
 * Atenção: o endpoint gerado pelo crudcrud expira em 24 horas — depois
 * disso é preciso gerar uma nova URL e atualizar esta constante.
 */
export const API_BASE_URL = 'https://crudcrud.com/api/SEU_ENDPOINT/livros'

/**
 * GET — lista todos os livros cadastrados.
 * O retorno é tipado como Book[], então o restante da aplicação já
 * sabe exatamente quais campos esperar de cada item, sem precisar
 * de "any".
 */
export async function getBooks(): Promise<Book[]> {
  const response = await axios.get<Book[]>(API_BASE_URL)
  return response.data
}

/**
 * POST — cria um novo livro.
 * Recebe um "NewBook" (sem _id) e devolve o "Book" completo que a API
 * criou, já com o _id gerado pelo crudcrud.
 */
export async function createBook(book: NewBook): Promise<Book> {
  const response = await axios.post<Book>(API_BASE_URL, book)
  return response.data
}

/**
 * DELETE — remove um livro pelo seu _id.
 */
export async function deleteBook(id: string): Promise<void> {
  await axios.delete(`${API_BASE_URL}/${id}`)
}

/**
 * PUT (opcional) — atualiza o status de leitura de um livro.
 * O crudcrud espera o objeto completo no corpo do PUT e não aceita
 * o campo "_id" dentro do corpo (ele já está na URL) — por isso o
 * desestruturamos fora antes de enviar.
 */
export async function updateBookStatus(id: string, book: Book): Promise<void> {
  const { _id, ...bookWithoutId } = book
  await axios.put(`${API_BASE_URL}/${id}`, bookWithoutId)
}
