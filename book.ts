// União de literais: restringe o status a apenas dois valores possíveis,
// em vez de aceitar qualquer string. Isso dá autocomplete e detecta erros
// em tempo de compilação (ex: digitar "lido" minúsculo seria um erro).
export type BookStatus = 'Lido' | 'Não lido'

// Estrutura de um livro como ele existe NA API (já com o _id gerado pelo crudcrud)
export interface Book {
  _id: string
  title: string
  author: string
  status: BookStatus
}

// Estrutura usada ao CRIAR um livro: tudo igual a "Book", exceto o "_id",
// que ainda não existe (será gerado pela API na resposta do POST).
// "Omit" reaproveita a interface "Book" em vez de duplicar os campos.
export type NewBook = Omit<Book, '_id'>
