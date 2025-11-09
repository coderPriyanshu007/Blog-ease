import pool from "../config/db.js";


export const updateUserProfile = async (name,bio,password,id) =>{
    const query = 
    `UPDATE  users
     SET name = $1,bio = $2
     WHERE id = $3
    `
    const query2 = `UPDATE  users
     SET name = $1,bio = $2 , password = $3
     WHERE id = $4
    `
       
    
    const values = [name,bio,password,id];
    const values1 =[name,bio,id]
    
    await pool.query(password ? query2:query,password? values : values1);
}




  
