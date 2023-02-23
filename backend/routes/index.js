const express = require('express')
const { mongo1, mongo2 } = require('../mongo')
const router = express.Router()

router.get('/db1', async (req, res) => {
  const ack = await mongo1.find().toArray()
  res.send(ack)
})

router.delete('/db1', async (req, res) => {
  const ack = await mongo1.findOneAndDelete({ title: req.body.title })
  res.send(ack)
})

router.post('/db1', async (req, res) => {
  const ack = await mongo1.updateOne(
    { title: req.body.title },
    { $setOnInsert: { title: req.body.title } },
    { upsert: true }
  )
  res.send(ack)
})

router.get('/db2', async (req, res) => {
  const ack = await mongo2.find().toArray()
  res.send(ack)
})

router.delete('/db2', async (req, res) => {
  const ack = await mongo2.findOneAndDelete({ title: req.body.title })
  res.send(ack)
})

router.post('/db2', async (req, res) => {
  const ack = await mongo2.updateOne(
    { title: req.body.title },
    { $setOnInsert: { title: req.body.title } },
    { upsert: true }
  )
  res.send(ack)
})

module.exports = router
