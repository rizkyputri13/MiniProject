import axios from 'axios'
import { domain } from '../config/config'

const getBatch = async()=>{
    try {
        const result = await axios.get(`${domain}/api/batch/batch`)
        const data = result.data
        return data
    } catch (error) {
        return await error.message
    }
}

const getBatchStudent = async()=>{
    try {
        const result = await axios.get(`${domain}/api/batch/batchStudent`)
        const data = result.data
        return data
    } catch (error) {
        return await error.message
    }
}

const updateBatch = async(data)=>{
    try {
        const result = await axios.put(`${domain}/api/batch/editBatch/${data.batchId}`,data)
        return result
    } catch (error) {
        return await error.message
    }
}

const deleteBatch = async(batchId)=>{
    try {
        const result = await axios.delete(`${domain}/api/batch/removeBatch/${batchId}`)
        return result
    } catch (error) {
        return await error.message
    }
}

// const findOne = async(id)=>{
//     try {
//         const result = await axios.get(`${domain}/api/batch/${id}`)
//         return result.data 
//     } catch (error) {
//         return await error.message
//     }
// }

export default {getBatch, getBatchStudent,updateBatch, deleteBatch}