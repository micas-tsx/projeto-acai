import Trash from '../../assets/trash.svg'
import Plus from '../../assets/plus.svg'
import api from '../../services/api' 
import { useState, useEffect, useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast'

function Home() {
  
  const inputName = useRef()
  const inputTel = useRef()
  const inputEmail = useRef()

  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const getUsers = async () => {
    try {
      const usersFromApi = await api.get('/usuarios')
      
      // O backend retorna {users: [...]}, então acessamos usersFromApi.data.users
      const usersData = usersFromApi.data.users
      if (Array.isArray(usersData)) {
        setUsers(usersData)
      } else {
        console.error('Dados recebidos não são um array:', usersData)
        setUsers([])
      }
      
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
      setUsers([])
    }
  }

  const createUsers = async (e) => {
    e.preventDefault() // Previne o comportamento padrão do form
    
    try {
      await api.post('/usuarios', {
        name: inputName.current.value,
        email: inputEmail.current.value,
        tel: inputTel.current.value,
      })
    
      // Limpa os campos após o cadastro
      inputName.current.value = ''
      inputEmail.current.value = ''
      inputTel.current.value = ''
      toast.success('Cliente cadastrado com sucesso.')
      
      getUsers()
    } catch (error) {
      if (error.response?.status === 400){ 
        toast('Email ou telefone ja cadastrado.', { icon: '⚠️' })
      } else {
        toast.error('Erro ao criar usuario.')
      }
      console.error('Erro ao criar usuário:', error)
    }
  }

  // Função para filtrar usuários baseado no termo de busca
  const filterUsers = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredUsers(users)
      return
    }
    
    const filtered = users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.tel.includes(searchTerm)
    )
    
    setFilteredUsers(filtered)
  }

  // Função para lidar com mudanças no campo de busca
  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    filterUsers(value)
  }

  useEffect(() => {
    getUsers()
  }, [])

  // Atualiza filteredUsers quando users mudar
  useEffect(() => {
    setFilteredUsers(users)
  }, [users])

  const deleteUser = async (id) => {
    try {
      await api.delete(`/usuarios/${id}`)
      toast.success('Cliente removido com sucesso.')
      getUsers() // Recarrega a lista após deletar
    } catch (error) {
      console.error('Erro ao deletar usuário:', error)
      toast.error('Erro ao remover cliente.')
    }
  }
  
  const addStar = async (id) => {
    try {
      // Primeiro, vamos verificar quantas estrelas o usuário tem atualmente
      const currentUser = users.find(user => user.id === id)
      
      // Adiciona uma estrela
      await api.put(`/usuarios/${id}`)
      
      // Se o usuário tinha 4 estrelas e agora vai ter 5, resetamos para 0
      if (currentUser && currentUser.stars === 4) {
        // Faz uma chamada adicional para resetar as estrelas para 0
        await api.put(`/usuarios/${id}/reset-stars`)
        
        // Mostra a mensagem
        toast.success(`Parabens ${currentUser.name}! Acai gratis liberado.`)
      }
      
      // Recarrega a lista para mostrar as mudanças
      getUsers()
      
    } catch (error) {
      console.error('Erro ao adicionar estrela:', error)
      toast.error('Erro ao adicionar estrela.')
    }
  }

  const totalClients = users.length
  const totalStars = users.reduce((acc, user) => acc + (user.stars || 0), 0)
  const activeRewards = users.filter(user => (user.stars || 0) > 0).length

  return (
    <div className="relative min-h-screen overflow-hidden bg-creamSoft">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(188,138,95,0.22),transparent_60%)]" />
      <div className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-purpleVibrant/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-greenForest/10 blur-3xl" />

      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-16 pt-10 md:px-10 lg:px-12">
        <header className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-end">
          <div className="space-y-5">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-purpleDeep/20 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-purpleDeep">
              Programa de fidelidade
            </span>
            <h1 className="text-balance font-display text-4xl font-semibold text-purpleDeep md:text-5xl">
              Açaí Shop com fidelidade clara, bonita e fácil de gerenciar.
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-purpleDeep/80 md:text-base">
              Cadastre clientes, acompanhe estrelas e transforme cada compra em uma recompensa. Tudo em um fluxo simples, pensado para o dia a dia da loja.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="btn-primary" onClick={() => inputName.current?.focus()} type="button">
                Cadastrar agora
              </button>
              <a className="btn-secondary" href="#lista-clientes">
                Ver clientes
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Clientes ativos', value: totalClients },
              { label: 'Estrelas somadas', value: totalStars },
              { label: 'Fidelidades em andamento', value: activeRewards }
            ].map((item) => (
              <div key={item.label} className="rounded-3xl border border-purpleDeep/10 bg-white/80 p-5 shadow-card">
                <p className="text-xs uppercase tracking-[0.2em] text-purpleDeep/60">{item.label}</p>
                <p className="mt-3 font-display text-3xl font-semibold text-purpleDeep">{item.value}</p>
              </div>
            ))}
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1fr,1.2fr]">
          <form
            onSubmit={createUsers}
            className="flex h-fit flex-col gap-5 rounded-3xl border border-purpleDeep/10 bg-white/80 p-6 shadow-card md:p-8"
          >
            <div className="space-y-2">
              <h2 className="font-display text-2xl font-semibold text-purpleDeep">Novo cliente</h2>
              <p className="text-sm text-purpleDeep/70">
                Preencha os dados essenciais e comece a contar as estrelas.
              </p>
            </div>

            <label className="sr-only" htmlFor="name">Nome</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Digite o nome completo"
              ref={inputName}
              required
              className="input-field"
              autoComplete="name"
            />

            <label className="sr-only" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Digite o email"
              ref={inputEmail}
              required
              className="input-field"
              autoComplete="email"
            />

            <label className="sr-only" htmlFor="telefone">Telefone</label>
            <input
              id="telefone"
              type="text"
              name="telefone"
              placeholder="Digite o telefone"
              ref={inputTel}
              required
              className="input-field"
              autoComplete="tel"
            />

            <button className="btn-primary" type="submit">Cadastrar cliente</button>

          </form>

          <div className="flex flex-col gap-4" id="lista-clientes">
            <div className="rounded-3xl border border-purpleDeep/10 bg-white/80 p-6 shadow-card md:p-8">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-display text-2xl font-semibold text-purpleDeep">Clientes cadastrados</h2>
                  <p className="text-sm text-purpleDeep/70">Busque por nome, email ou telefone.</p>
                </div>
              </div>

              <label className="sr-only" htmlFor="search">Buscar cliente</label>
              <input
                id="search"
                type="text"
                name="search"
                placeholder="Procure por nome, email ou telefone"
                value={searchTerm}
                onChange={handleSearchChange}
                className="input-field mt-4"
              />
            </div>

            <div className="grid gap-4">
              {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <div key={user.id} className="rounded-3xl border border-purpleDeep/10 bg-white/80 p-5 shadow-soft transition hover:-translate-y-1">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="space-y-1 text-sm text-purpleDeep">
                        <p className="font-semibold text-purpleDeep">{user.name}</p>
                        <p className="text-purpleDeep/70">{user.email}</p>
                        <p className="text-purpleDeep/70">{user.tel}</p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="rounded-full border border-purpleDeep/10 bg-creamSoft px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-purpleDeep">
                          Estrelas: {user.stars || 0}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => addStar(user.id)}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-greenForest/30 bg-greenForest/10 text-greenForest transition hover:bg-greenForest/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-greenForest/40"
                            type="button"
                            aria-label={`Adicionar estrela para ${user.name}`}
                          >
                            <img className="h-4 w-4" src={Plus} alt="" aria-hidden="true" />
                          </button>
                          <button
                            onClick={() => deleteUser(user.id)}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-purpleDeep/20 bg-purpleDeep/10 text-purpleDeep transition hover:bg-purpleDeep/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purpleVibrant/40"
                            type="button"
                            aria-label={`Remover ${user.name}`}
                          >
                            <img className="h-4 w-4" src={Trash} alt="" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-3xl border border-dashed border-purpleDeep/20 bg-white/70 p-6 text-center text-sm text-purpleDeep/70">
                  {searchTerm ? 'Nenhum cliente encontrado com esses criterios.' : 'Nenhum cliente cadastrado ate o momento.'}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: 'rgba(248, 244, 225, 0.95)',
            color: '#2D0A31',
            borderRadius: '16px',
            border: '1px solid rgba(45, 10, 49, 0.16)',
            boxShadow: '0 20px 60px rgba(45, 10, 49, 0.12)'
          }
        }}
      />
    </div>
  )
}

export default Home
