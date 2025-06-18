import { QueryResult } from 'pg';
import pool from '../database/database';
import projectSchema from '../models/projects';
import ProjectData from '../utils/projectInterface';


const listProjects = async (): Promise<ProjectData[]> => {
    try {
        const result = await pool.query('SELECT * FROM projects'); 
        const projects = result.rows.map((row) => projectSchema(row));
        return projects; 
    } catch (err) {
        throw err; 
    }
}

const createNewProject = async (data: ProjectData): Promise<QueryResult> => {
    try {
        const { title, description, thumbnail, url } = projectSchema(data);
        const sql = `INSERT INTO projects (title, description, thumbnail, url) VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [title, description, thumbnail, url];

        const res = await pool.query(sql, values);
        return res.rows[0]; 
    } catch (error) {
        
        throw error;
    }
};

const deleteProjectById = async (projectId: number): Promise<QueryResult | null> => {
    try { 
        const sql = `DELETE FROM projects WHERE id = $1 RETURNING *` ;
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



export {listProjects, createNewProject, deleteProjectById};