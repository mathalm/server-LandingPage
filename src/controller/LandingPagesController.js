const LandingPage = require("../model/LandingPages");

class LandingPagesController{
  constructor(){
    this._landingPage;
    this._dados;
    this._funcao;
  }
  buscarLandingPage(){
    this._landingPage = new LandingPage();
    this._dados = this._landingPage.dados;
    return this._dados;
  }
  inserirLandingPage(dados){
    this._landingPage = new LandingPage();
    this._landingPage.criarLandingPage(dados)
  }
  atualizarLandingPage(dados, idLandingPage){
    this._landingPage = new LandingPage();
    const teste = this._landingPage.atualizarLandingPage(dados, idLandingPage);
  }
  deletarLandingPage(idLandingPage){
    this._landingPage = new LandingPage();
    const teste = this._landingPage.deletarLandingPage(idLandingPage);
  }
}

exports.get = async (req, res) => {
  let landingPagesController = new LandingPagesController();
  const dadosLandingPages = await landingPagesController.buscarLandingPage();
  res.status(201).send(dadosLandingPages);
};
exports.post = async (req, res) => {
  let landingPagesController = new LandingPagesController();
  landingPagesController.inserirLandingPage(req.body);
  res.status(201).send("Requisição post recebida com sucesso!");
};
exports.put = async (req, res) => {
  let landingPagesController = new LandingPagesController();
  landingPagesController.atualizarLandingPage(req.body, req.params.id);
  res.status(201).send(`Requisição put recebida com sucesso!`);
};
exports.delete = async (req, res) => {
  let landingPagesController = new LandingPagesController();
  landingPagesController.deletarLandingPage(req.params.id);
  res.status(200).send(`Requisição delete recebida com sucesso! `);
};
