import { QueryResult } from 'pg';
import pool from '../database/database';
import projectSchema from '../models/projects';


const listProjects = async () => {
    try {
        const result = await pool.query('SELECT * FROM projects'); 
        
        const projects = result.rows.map((row) => projectSchema(row));
        return projects; 
    } catch (err) {
        throw err; 
    }
}

export default listProjects;