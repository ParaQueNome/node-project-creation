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

const deleteSkillById = async (skillId: number): Promise<QueryResult | null> => {
    try { 
        const sql = `DELETE FROM skills WHERE id = $1 RETURNING *` ;
        const values = [skillId];
        const res = await pool.query(sql, values);
        if (!res.rows[0] || res.rows == undefined ) {
            return null;
        }
        return res.rows[0];
    } catch (error) { 
        throw error;
    }
};

const updateSkillById = async (skillId: {id:number}, data: SkillData ): Promise<QueryResult | null> =>{
    try { 
        const setClause = Object.keys(data).map((key, index) => `${key} = $${index +1}`).join(', ');
        const whereClause = Object.keys(skillId).map((key, index) => `${key} = $${index +1 + Object.keys(data).length}`).join(' AND ');
        const sql = `UPDATE projects SET ${setClause} WHERE ${whereClause} RETURNING *`;
        const values = [...Object.values(data), ...Object.values(skillId)]
        const res = await pool.query(sql, values);
        if(!res.rows[0] || res.rows ==undefined) {
            return null;
        }
        return res.rows[0];
    } catch (error) { 
        throw error;
    }
};



export {listSkills, createNewSkill, deleteSkillById, updateSkillById};