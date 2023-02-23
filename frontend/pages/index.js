import AddCircleIcon from '@mui/icons-material/AddCircle'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from '@mui/material'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import * as React from 'react'

export async function getServerSideProps(context) {
  const mapa = new Map()
  await fetch('http://backend:3000/db1', { method: 'GET' })
    .then((r) => r.json())
    .then((livros_db1) =>
      livros_db1?.forEach(({ title }) =>
        mapa.set(title, { title, lista1: true })
      )
    )
    .catch((e) => console.log("Dados inválidos recebidos de GET '/db1'"))
  await fetch('http://backend:3000/db2', { method: 'GET' })
    .then((r) => r.json())
    .then((livros_db2) =>
      livros_db2?.forEach(({ title }) =>
        mapa.set(title, { title, lista2: true, ...mapa.get(title) })
      )
    )
    .catch((e) => console.log("Dados inválidos recebidos de GET '/db2'"))
  const lista = []
  mapa.forEach((livro) => lista.push(livro))
  return {
    props: { lista }, // will be passed to the page component as props
  }
}

export default function Index(props) {
  const router = useRouter()
  const livros = props.lista || []
  const [livro_add, setLivro_add] = React.useState('')

  async function adicionar(livro, db) {
    livro = livro.trim().toUpperCase()
    if (livro == '') return
    await fetch(`http://localhost:3000/db${db}`, {
      method: 'POST',
      body: JSON.stringify({ title: livro }),
      headers: { 'Content-Type': 'application/json' },
    })
    router.reload(window.location.pathname)
  }
  async function remover(livro, db) {
    await fetch(`http://localhost:3000/db${db}`, {
      method: 'DELETE',
      body: JSON.stringify({ title: livro }),
      headers: { 'Content-Type': 'application/json' },
    })
    router.reload(window.location.pathname)
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Container
        component='paper'
        maxWidth='md'
        sx={{ m: 4, p: 2, border: 1, borderRadius: '6px' }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography
              variant='h4'
              component='h1'
              gutterBottom
              textAlign='center'
            >
              Minhas Listas de Livros 📚
            </Typography>
          </Grid>
          <Grid
            item
            container
            spacing={1}
            xs={12}
            display='flex'
            alignItems='center'
          >
            <Grid item xs={7}>
              <TextField
                value={livro_add}
                onChange={(e) => setLivro_add(e.target.value)}
                label='Adicionar Livro'
                placeholder='Digite o nome do livro...'
                fullWidth
              />
            </Grid>
            <Grid item xs={2.5}>
              <Button
                onClick={() => adicionar(livro_add, 1)}
                variant='contained'
                size='large'
                startIcon={<AddCircleIcon />}
                fullWidth
              >
                Lista 1
              </Button>
            </Grid>
            <Grid item xs={2.5}>
              <Button
                onClick={() => adicionar(livro_add, 2)}
                variant='outlined'
                size='large'
                startIcon={<AddCircleIcon />}
                fullWidth
              >
                Lista 2
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <List sx={{ backgroundColor: 'lightgray' }}>
              {livros.map((livro, i) => (
                <ListItem
                  key={i}
                  secondaryAction={
                    <>
                      {livro.lista1 && (
                        <Button
                          onClick={() => remover(livro.title, 1)}
                          variant='contained'
                          startIcon={<DeleteOutlineIcon />}
                        >
                          Lista 1
                        </Button>
                      )}
                      {livro.lista2 && (
                        <Button
                          onClick={() => remover(livro.title, 2)}
                          variant='outlined'
                          startIcon={<DeleteOutlineIcon />}
                          sx={{ ml: 1 }}
                        >
                          Lista 2
                        </Button>
                      )}
                    </>
                  }
                >
                  <ListItemIcon>
                    <AutoStoriesIcon />
                  </ListItemIcon>
                  <ListItemText primary={livro.title} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
