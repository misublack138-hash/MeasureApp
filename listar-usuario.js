const db =
require("./database");

db.all(

    `
    SELECT *
    FROM usuarios
    `,

    [],

    (err,rows)=>{

        console.log(
            rows
        );

        db.close();

    }

);