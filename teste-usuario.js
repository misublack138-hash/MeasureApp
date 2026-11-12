const db =
require("./database");

db.run(

    `
    INSERT INTO usuarios(
        usuario,
        senha
    )

    VALUES(?,?)
    `,

    [
        "mike",
        "123"
    ],

    err => {

        if(err){

            console.log(
                err.message
            );

        }else{

            console.log(
                "Usuário criado!"
            );

        }

        db.close();

    }

);