const express = require('express');
const router = express.Router();

const { signup, signin, addSpell, getSpells } = require('../controllers/auth');

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/addspell', addSpell);
router.post('/getspells', getSpells);

module.exports = router;