export function setMidnight(date){
    return new Date(date).setHours(0,0,0,0)
}

export function formatDateWithDay(date){
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const year = new Date(date).getFullYear()
    let month = new Date(date).getMonth()+1
    month = month<10?`0${month}`:month
    let day = new Date(date).getDate()
    day=day<10?`0${day}`:day
    const nameOfDay = days[new Date(date).getDay()]

    const formatedDate = `${nameOfDay}, ${day}/${month}/${year}`
    return formatedDate
}

export function capitals (data){
    const word = data.split(/[- ]+/)
    const uword = word.map(el=>{
        const str = el.charAt(0).toUpperCase()
        const srtCont = el.slice(1)
        return str+srtCont
    })
    const jword = uword.join(' ')
    return  jword
}


export function capNameSurname (data){
    const word = data.split(' ')
    const uword = word.map(el=>{
        const str = el.charAt(0).toUpperCase()
        const srtCont = el.slice(1)
        return str+srtCont
    })
    const jword = uword.join(' ')
    return  jword
}

export const formatDate =(data)=>{
    const date = new Date(data)
    const year = date.getFullYear()
    const month = (date.getMonth()+1)<10?'0'+ (date.getMonth()+1): (date.getMonth()+1)
    const day = date.getDate()<10?'0'+ date.getDate(): date.getDate()
    const updatedData = (`${year}-${month}-${day}`)
    return updatedData
}

export function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}    

export const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0
  }
