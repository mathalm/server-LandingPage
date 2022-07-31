const Sequelize = require("sequelize");
const express = require("express");
var cors = require('cors')
const app = express();

const bancoDeDados = new Sequelize("LandingPageDB", "testelp06", "Senhaforte06.", {
  host: "35.232.229.118",
  dialect: "mssql",
});
const chamada = async () => {
  try {
    await bancoDeDados.authenticate();
    console.log("Conexão estabelecida com sucesso.");
  } catch (error) {
    console.error("Não foi possível conectar com o banco:", error);
  }
};
chamada();

app.use(cors())
bancoDeDados.sync();
const router = express.Router();
//Rotas
const landingPage = require('./src/routes/LandingPageRoute');
app.use('/landingPage', landingPage);

app.listen(8080, () => {
  console.log("servidor iniciado na 8080: http://localhost:8080");
});
//função para verificar quais rotas estão disponiveis
/*function print (path, layer) {
  if (layer.route) {
    layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
  } else if (layer.name === 'router' && layer.handle.stack) {
    layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
  } else if (layer.method) {
    console.log('%s /%s',
      layer.method.toUpperCase(),
      path.concat(split(layer.regexp)).filter(Boolean).join('/'))
  }
}

function split (thing) {
  if (typeof thing === 'string') {
    return thing.split('/')
  } else if (thing.fast_slash) {
    return ''
  } else {
    var match = thing.toString()
      .replace('\\/?', '')
      .replace('(?=\\/|$)', '$')
      .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
    return match
      ? match[1].replace(/\\(.)/g, '$1').split('/')
      : '<complex:' + thing.toString() + '>'
  }
}
app._router.stack.forEach(print.bind(null, []))
*/

module.exports = app;
module.exports = bancoDeDados
