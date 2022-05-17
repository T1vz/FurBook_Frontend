const { Router } = require('express')
const Profile = require('../models/profile')
const auth = require('../middleware/auth.middleware')


const router = Router()

router.get('/:id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({owner: req.params.id})

        res.json(profile)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так ...' })
    }
})
router.post('/generate/:id', auth, async (req, res) => {
    try {
        const userId = req.params.id
        const existing = await Profile.findOne({owner: userId})

        if (existing) {
            return res.json({profile: existing})
        }

        // const to = baseUrl + '/t/' + code

        const profile = new Profile({
            owner:userId
        })

        await profile.save()
        res.status(201).json({profile})

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так ...' })
    }
})

router.post('/status', auth, async (req, res) => {
    try {
        const {status} = req.body

        const profile = await Profile.findOne({
            owner:req.user.userId
        })

        profile.status = status

        await profile.save()
        res.status(201).json({profile})

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так ...' })
    }
})

router.post('/avatar', auth, async (req, res) => {
    try {
        const {avatar} = req.body

        const profile = await Profile.findOne({
            owner:req.user.userId
        })

        profile.avatar = avatar

        await profile.save()
        res.status(201).json({profile})

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так ...' })
    }
})

module.exports = router