const express = require('express');
const router = express.Router();
const landingPage = require('../controller/LandingPagesController')
router.get('/', landingPage.get);
router.post('/adicionar', landingPage.post);
router.put('/atualizar/:id', landingPage.put);
router.delete('/deletar/:id', landingPage.delete);
module.exports = router;