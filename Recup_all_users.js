const queries = require('./UserQueries');
const {sendError, sendMessage} = require ("./message");

async function GetAllUsers(req,res) {
    const utilisateurs = await queries.getUsersAll() ;
    return sendMessage(res,utilisateurs);
}

module.exports = GetAllUsers ;