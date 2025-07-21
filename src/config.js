import dotenv from 'dotenv';
dotenv.config();

export const PORT       = process.env.PORT || 3000;
export const API_BASE   = process.env.API_BASE || 'https://fakestoreapi.com';
export const DATA_DIR   = process.env.DATA_DIR || './data';
