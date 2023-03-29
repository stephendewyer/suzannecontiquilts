import { mysqlconn } from '$lib/db';

export const GET = () => {

    let results = mysqlconn.query('SELECT * FROM `TABLE 1`')
        .then (function([rows, fields]) {
            console.log(rows);
            return rows;
        });
    return {
        body: results
    }
}



// export const GET = () => {
//     return new Response(JSON.stringify({message: "hello"}), { status: 200 })
// }