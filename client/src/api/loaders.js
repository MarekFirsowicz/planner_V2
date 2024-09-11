import axios from "axios";
import { axiosPrivate } from "./axiosPrivate";


//1.Calendars
const getAllCalendars = async () => {
    try {
        const res = await axiosPrivate.get(`/calendars/`)
        return res.data
    } catch (err) {
        throw Error('cannot get calendars')
    }
}

const getCalendar = async (id) => {
    //console.log(id)
    try {
        const res = await axiosPrivate.get(`/calendars/`+id)
        return res.data
    } catch (err) {
        throw Error('cannot get calendar')
    }
}

export function getAllCalendarsLoader() {
    return getAllCalendars()
}

export function getCalendarLoader({params}) {
    const id = params.calendarId
    return getCalendar(id)
}


//2. Employees
const getEmployee = async (id) => {
    try {
        const res = await axios.all([
            axiosPrivate.get(`/employees/`+id),
            axiosPrivate.get(`/patterns/`),
            axiosPrivate.get(`/contracts/`)
        ])
        
        return res
    } catch (err) {
        throw Error('cannot get employee')
    }
}

export function getEmployeeLoader({params}) {
    const id = params.employeeId
    return getEmployee(id)
}

const getAllEmployees = async (query) => {
    try {
        const res = await axiosPrivate.get(`/employees/`+query)
        return res.data
    } catch (err) {
        throw Error('cannot get employees table')
    }
}



export function getAllEmployeesLoader({request}) {
    const url = new URL(request.url);
    return getAllEmployees(url.search)
}


const getReport = async (query) => {
    //console.log(query.filter)
    try {
        const res = await axios.all([
            axiosPrivate.get(`/employees/report/events/` + query),
            axiosPrivate.get(`/patterns/`),
            //axiosPrivate.get(`/contracts/`)
        ])
        
        return res
    } catch (err) {
        throw Error('cannot get data')
    }
}

export function getReportLoader({ request }) {
    const url = new URL(request.url);
    return getReport(url.search)
}

//3. Contracts
const getPatternsAndContract = async () => {
    try {
        const res = await axios.all([
            axiosPrivate.get(`/patterns/`),
            axiosPrivate.get(`/contracts/`)
        ])
        return res
    } catch (err) {
        throw Error('cannot get employees Contract and Patterns')
    }
}

export function getPatternsAndContractLoader() {
    //const url = new URL(request.url);
    return getPatternsAndContract()
}


const getAllContracts = async () => {
    try {
        const res = await axiosPrivate.get(`/contracts/`)
        return res.data
    } catch (err) {
        throw Error('cannot get contracts')
    }
}

const getContract = async (id) => {
    try {
        const res = await axiosPrivate.get(`/contracts/`+id)
        return res.data
    } catch (err) {
        throw Error('cannot get contract')
    }
}

export function getAllContractsLoader(){
    return getAllContracts()
}

export function getContractLoader({params}) {
    const id = params.contractId
    return getContract(id)
}

//4.Patterns

const getAllPatterns = async () => {
    try {
        const res = await axiosPrivate.get(`/patterns/`)
        return res.data
    } catch (err) {
        throw Error('cannot get patterns')
    }
}

export function getAllPatternsLoader(){
    return getAllPatterns()
}