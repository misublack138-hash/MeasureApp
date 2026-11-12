const express =
require("express");

const cors =
require("cors");

const db =
require("./database");

const app =
express();

app.use(cors());

app.use(express.json());

app.post(
    "/cadastro",
    (req,res)=>{

        const {
            usuario,
            senha
        } = req.body;

        db.run(

            `
            INSERT INTO usuarios(
                usuario,
                senha
            )
            VALUES(?,?)
            `,

            [
                usuario,
                senha
            ],

            err => {

                if(err){

                    return res
                    .status(400)
                    .json({

                        sucesso:false,

                        erro:
                        err.message

                    });

                }

                res.json({

                    sucesso:true

                });

            }

        );

    }
);

app.post(
    "/login",
    (req,res)=>{

        const {
            usuario,
            senha
        } = req.body;

        db.get(

            `
            SELECT *
            FROM usuarios
            WHERE usuario = ?
            AND senha = ?
            `,

            [
                usuario,
                senha
            ],

            (err,row)=>{

                if(row){

                    return res.json({

                        sucesso:true,

                        usuario:
                        row.usuario

                    });

                }

                res
                .status(401)
                .json({

                    sucesso:false

                });

            }

        );

    }
);

app.get(
    "/usuarios",
    (req,res)=>{

        db.all(

            `
            SELECT *
            FROM usuarios
            `,

            [],

            (err,rows)=>{

                if(err){

                    return res
                    .status(500)
                    .json({
                        erro:
                        err.message
                    });

                }

                res.json(
                    rows
                );

            }

        );

    }
);

app.listen(
    3000,
    ()=>{

        console.log(
            "Servidor rodando na porta 3000"
        );

    }
);