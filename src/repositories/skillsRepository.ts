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
};

const createNewSkill = async (data: SkillData): Promise<QueryResult> => {
    try {
        const { title, rate} = skillsSchema(data);
        const sql = `INSERT INTO skills (title, rate) VALUES ($1, $2) RETURNING *`;
        const values = [title, rate];
        const res = await pool.query(sql, values);
        return res.rows[0]; 
    } catch (error) {
        throw error;
    }
};

const deleteSkillById = async (projectId: number): Promise<QueryResult | null> => {
    try { 
        const sql = `DELETE FROM skills WHERE id = $1 RETURNING *` ;
        const values = [projectId];
        const res = await pool.query(sql, values);
        if (!res.rows[0] || res.rows == undefined ) {
            return null;
        }
        return res.rows[0];
    } catch (error) { 
        throw error;
    }
};



export {listSkills, createNewSkill, deleteSkillById};