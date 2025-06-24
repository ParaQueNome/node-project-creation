import { QueryResult } from 'pg';
import pool from '../database/database';
import skillsSchema from '../models/skills';
import SkillData from '../utils/skillsInterface';


const listSkills = async (): Promise<SkillData[]> => {
    try {
        const result = await pool.query('SELECT * FROM skills'); 
        const projects = result.rows.map((row) => skillsSchema(row));
        return projects; 
    } catch (err) {
        throw err; 
    }
}




export { listSkills};