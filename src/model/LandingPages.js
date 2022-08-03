const sequelize = require("sequelize");
const Sequelize = require("sequelize");
const bancoDeDados = new Sequelize(
  "LandingPageDB",
  "testelp06",
  "Senhaforte06.",
  {
    host: "35.232.229.118",
    dialect: "mssql",
    dialectOptions: {
      encrypt: false,
      options: {
        useUTC: true, // for reading from database
      },
    },
    omitNull: true,
  }
);
module.exports = class LandingPage {
  constructor() {
    this.landingPages = bancoDeDados.define(
      "landingPages",
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
        },
        nome: {
          type: Sequelize.DataTypes.CHAR,
        },
        identificador: {
          type: Sequelize.DataTypes.CHAR,
        },
        //1 ativado
        //2 desativado
        status: {
          type: Sequelize.DataTypes.INTEGER,
        },
        quantidadeDeLeadsConvertidos: {
          type: Sequelize.DataTypes.INTEGER,
        },
        //1 vigente
        //2 excluído
        situacao: {
          type: Sequelize.DataTypes.INTEGER,
        },
        createdAt: {
          type: Sequelize.DataTypes.DATE,
        },
        updatedAt: {
          type: Sequelize.DataTypes.DATE,
        },
      },
      {
        tableName: "LandingPages",
        timestamps: false,
      }
    );
  }
  get dados() {
    let dados = this.landingPages.findAll({
      where: {
        situacao: 1
      },
      order: [['createdAt', 'DESC']]
    });
    return dados;
  }
  buscarDadosPorId(idLandingPage) {
    const verificarSeIdExiste =  this.landingPages.findByPk(idLandingPage);
    return verificarSeIdExiste;
  }

  criarLandingPage(dados) {
    let identificador = dados.nome.replace(/ /g, "_");
    let quantidadeDeLeadsConvertidos = 0;
    let status = dados.status;
    this.landingPages.removeAttribute('id');
    const insert = this.landingPages.build({
      nome: dados.nome,
      identificador: identificador,
      status: dados.status,
      quantidadeDeLeadsConvertidos: quantidadeDeLeadsConvertidos,
      situacao: 1,
      createdAt: Sequelize.fn("getdate"),
      updatedAt: Sequelize.fn("getdate"),
    });
    insert.save();
    
  }

  atualizarLandingPage(dados, idLandingPage){
    this.landingPages.update(dados,{where: { id : idLandingPage} });
    this.landingPages.update({updatedAt: Sequelize.fn("getdate")},{where: { id : idLandingPage} });
  }
  deletarLandingPage(idLandingPage){
    this.landingPages.update({situacao: 2},{where: { id : idLandingPage} });
  }
};
