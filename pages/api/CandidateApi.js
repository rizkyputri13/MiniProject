import axios from 'axios'
import { domain } from '../config/config'

const apply = async()=>{
    try {
        const result = await axios.get(`${domain}/api/candidate/apply`)
        const data = result.data
        return data
    } catch (error) {
        return await error.message
    }
}

const filter = async()=>{
    try {
        const result = await axios.get(`${domain}/api/candidate/filter`)
        const data = result.data
        return data
    } catch (error) {
        return await error.message
    }
}

const contract = async()=>{
    try {
        const result = await axios.get(`${domain}/api/candidate/contract`)
        const data = result.data
        return data
    } catch (error) {
        return await error.message
    }
}

const disqualified = async()=>{
    try {
        const result = await axios.get(`${domain}/api/candidate/disqualified`)
        const data = result.data
        return data
    } catch (error) {
        return await error.message
    }
}

const notrespond = async()=>{
    try {
        const result = await axios.get(`${domain}/api/candidate/notrespond`)
        const data = result.data
        return data
    } catch (error) {
        return await error.message
    }
}

const user = async()=>{
    try {
        const result = await axios.get(`${domain}/api/candidate/user`)
        const data = result.data
        return data
    } catch (error) {
        return await error.message
    }
}


const editApply = async(data)=>{
    try {
        const result = await axios.put(`${domain}/api/candidate/editApply/${data.boapEntityId}`,data)
        return result
    } catch (error) {
        return await error.message
    }
}

const editFilter = async(data)=>{
    try {
        const result = await axios.put(`${domain}/api/candidate/editFilter/${data.boapEntityId}`,data)
        return result
    } catch (error) {
        return await error.message
    }
}

const editContract = async(data)=>{
    try {
        const result = await axios.put(`${domain}/api/candidate/editContract/${data.boapEntityId}`,data)
        return result
    } catch (error) {
        return await error.message
    }
}

const editDisqualified = async(data)=>{
    try {
        const result = await axios.put(`${domain}/api/candidate/editDisqualified/${data.boapEntityId}`,data)
        return result
    } catch (error) {
        return await error.message
    }
}

const editNotrespond = async(data)=>{
    try {
        const result = await axios.put(`${domain}/api/candidate/editNotrespond/${data.boapEntityId}`,data)
        return result
    } catch (error) {
        return await error.message
    }
}
const findOne = async(id)=>{
    try {
        const result = await axios.get(`${domain}/api/candidate/user${id}`)
        return result.data 
    } catch (error) {
        return await error.message
    }
}


export default {apply, filter, contract, disqualified, notrespond, user, editApply, editFilter, 
    editContract, editDisqualified, editNotrespond,findOne}