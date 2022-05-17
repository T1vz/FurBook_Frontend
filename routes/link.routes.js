const { Router } = require('express')
const Link = require('../models/link')
const Item = require('../models/item')
const auth = require('../middleware/auth.middleware')
const config = require('config')
const shortId = require('shortid')


const router = Router()

router.post('/generate', auth, async (req, res) => {
    try {
        // const baseUrl = config.get('baseUrl')
        const {price, title, link} = req.body
        
        // const code = shortId.generate()

        const existing = await Item.findOne({title})

        if (existing) {
            return res.json({link: existing})
        }

        // const to = baseUrl + '/t/' + code

        const item = new Item({
            price, link, title, owner:req.user.userId
        })

        await item.save()
        res.status(201).json({item})

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так ...' })
    }
})
router.get('/', auth, async (req, res) => {
    try {
        const items = await Item.find({owner: req.user.userId})
        res.json(items)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так ...' })
    }
})
router.get('/buy', auth, async (req, res) => {
    try {
        const items = await Item.find()
        res.json(items)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так ...' })
    }
})
router.get('/:id', auth, async (req, res) => {
    try {
        const item = await Item.findById(req.params.id)

        if (item){
            item.clicks++
            await item.save()
        }
        res.json(item)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так ...' })
    }
})

module.exports = router