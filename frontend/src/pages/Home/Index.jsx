import './Index.css'
import Trash from '../../assets/trash.svg'
import Plus from '../../assets/plus.svg'
import api from '../../services/api' 
import { useState, useEffect, useRef } from 'react'

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
      
      getUsers()
    } catch (error) {
      if (error.status === 400){ 
        alert('Email ou telefone já cadastrado')
      } else {
        alert('Erro ao criar usuário')
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
      getUsers() // Recarrega a lista após deletar
    } catch (error) {
      console.error('Erro ao deletar usuário:', error)
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
        alert(`🎉 Parabéns ${currentUser.name}! Você ganhou um açaí de graça! 🥤`)
      }
      
      // Recarrega a lista para mostrar as mudanças
      getUsers()
      
    } catch (error) {
      console.error('Erro ao adicionar estrela:', error)
      alert('Erro ao adicionar estrela')
    }
  }

  return (
    <div className='container'>
      <form onSubmit={createUsers}>
        <h1>Cadastro de Usuário</h1>
        <input type='text' name='name' placeholder='Digite seu Nome' ref={inputName} required />
        <input type='email' name='email' placeholder='Digite seu Email' ref={inputEmail} required />
        <input type='text' name='telefone' placeholder='Digite seu Telefone' ref={inputTel} required />
        <button className='submit-button' type='submit'>Cadastrar</button>
      </form>

      <h2>Usuários Cadastrados</h2>
      <p>Procure o usuário</p>
      <input 
        type="text" 
        name="search" 
        placeholder='Procure por nome, email ou telefone' 
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
        filteredUsers.map(user => (
          <div key={user.id} className="users-card">
            <div className="user-info">
              <p>Nome: <span>{user.name}</span> </p>
              <p>Email: <span>{user.email}</span> </p>
              <p>Telefone: <span>{user.tel}</span> </p>
              <p>Estrelas: <span>{user.stars || 0}</span> </p>
            </div>
            <div className="buttons">
              <button onClick={() => addStar(user.id)} className='plus-button'>
                <img className='plus-icon' src={Plus} alt="Somar" />
              </button>
              <button onClick={() => deleteUser(user.id)} className='delete-button'>
                <img className='delete-icon' src={Trash} alt="Deletar" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>
          {searchTerm ? 'Nenhum usuário encontrado com esses critérios' : 'Nenhum usuário encontrado'}
        </p>
      )}
      
    </div>
  )
}

export default Home
