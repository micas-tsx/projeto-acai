import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const server = express()

server.use(cors())
server.use(express.json())

server.post('/usuarios', async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        tel: req.body.tel
      }
    })

    res.status(201).json({user})
  } catch (error) {
    if (error.code === 'P2002') {
      // Erro de constraint unique
      const field = error.meta?.target?.[0] || 'campo'
      res.status(400).json({
        error: `Já existe um usuário com este ${field}`,
        field: field
      })
    } else {
      console.error('Erro ao criar usuário:', error)
      res.status(500).json({
        error: 'Erro interno do servidor'
      })
    }
  }
})

server.get('/usuarios', async (req, res) => {
  
  let users = []

  if(req.query) {
    users = await prisma.user.findMany({
      where: {
        name: req.query.name
      }
    })
  } else {
    users = await prisma.user.findMany()
  }

  res.json({users})
})


server.delete('/usuarios/:id', async (req, res) => {
  await prisma.user.delete({
    where:{
      id: parseInt(req.params.id)
    }
  })

  res.status(200).json({ message: 'usuário deletado com sucesso' })
})

server.put('/usuarios/:id', async(req, res) => {
    // Primeiro, buscar o usuário atual para pegar o número de estrelas
    const currentUser = await prisma.user.findUnique({
      where: {
        id: parseInt(req.params.id)
      }
    })

    if (!currentUser) {
      return res.status(404).json({ error: 'Usuário não encontrado' })
    }

    // Incrementar as estrelas em 1
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(req.params.id)
      },
      data: {
        stars: currentUser.stars + 1
      }
    })

    res.status(200).json({ user: updatedUser })
})

// Nova rota para resetar as estrelas para 0
server.put('/usuarios/:id/reset-stars', async(req, res) => {
    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                stars: 0
            }
        })

        res.status(200).json({ user: updatedUser })
    } catch (error) {
        console.error('Erro ao resetar estrelas:', error)
        res.status(500).json({ error: 'Erro interno do servidor' })
    }
})

server.listen(3000, () => { console.log('Servidor rodando na porta 3000') })