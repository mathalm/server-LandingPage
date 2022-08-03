const LandingPage = require("../model/LandingPages");

class LandingPagesController {
  constructor() {
    this._landingPage;
    this._dados;
    this._funcao;
  }
  buscarLandingPage() {
    this._landingPage = new LandingPage();
    this._dados = this._landingPage.dados;
    return this._dados;
  }
  buscarDadosPorId(idLandingPage){
    this._landingPage = new LandingPage();
    this._dados = this._landingPage.buscarDadosPorId(idLandingPage);
    return this._dados;
  }
  inserirLandingPage(dados) {
    
    if ("nome" in dados && "status" in dados) {
      this._landingPage = new LandingPage();
      this._landingPage.criarLandingPage(dados);
      return {
        success: "Landing Page criada com sucesso.",
      };
    } else {
      return {
        error: {
          mensagem: "São obrigatórios os campos nome e status.",
        },
      };
    }
  }
  atualizarLandingPage(dados, idLandingPage) {
    console.log('atualizar com: ' + dados);
    if ("nome" in dados || "status" in dados) {
      const teste = this._landingPage.atualizarLandingPage(
        dados,
        idLandingPage
      );
      return {
        success: "Landing Page atualizada com sucesso.",
      };
    } else {
      return {
        error: {
          mensagem: "São obrigatórios os campos nome, status e situacao.",
        },
      };
    }
  }
  deletarLandingPage(idLandingPage) {
    this._landingPage = new LandingPage();
    const teste = this._landingPage.deletarLandingPage(idLandingPage);
    return{
      success: "Landing Page deletada com sucesso.",
    };
  }
}


exports.get = async (req, res) => {
  let landingPagesController = new LandingPagesController();
  const dadosLandingPages = await landingPagesController.buscarLandingPage();
  res.status(201).send(dadosLandingPages);
};
exports.post = async (req, res) => {
  let landingPagesController = new LandingPagesController();
  const resposta = landingPagesController.inserirLandingPage(req.body);
  if (resposta.error) {
    res.status(400).send(resposta);
  } else {
    res.status(201).send(resposta);
  }
};
exports.put = async (req, res) => {
  let landingPagesController = new LandingPagesController();
  const verificarId = await landingPagesController.buscarDadosPorId(req.params.id);
  if(!verificarId){
    return res.status(400).send({
      error: {
        mensagem: "Id não encontrado.",
      }
    });
  }
  const resposta = landingPagesController.atualizarLandingPage(
    req.body,
    req.params.id
  );
  if (resposta.error) {
    res.status(400).send(resposta);
  } else {
    res.status(201).send(resposta);
  }
};
exports.delete = async (req, res) => {
  let landingPagesController = new LandingPagesController();
  const verificarId = await landingPagesController.buscarDadosPorId(req.params.id);
  if(!verificarId){
    return res.status(400).send({
      error: {
        mensagem: "Id não encontrado.",
      }
    });
  }
  const resposta = landingPagesController.deletarLandingPage(req.params.id);
  res.status(200).send(resposta);
};
