const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')
var app = express()
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const landingPage = require('../controller/LandingPagesController');
router.get('/', landingPage.get);
router.post('/adicionar',jsonParser, landingPage.post);
router.put('/atualizar/:id',jsonParser, landingPage.put);
router.delete('/deletar/:id', landingPage.delete);
module.exports = router;