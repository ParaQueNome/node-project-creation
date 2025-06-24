

const skillsSchema = (data: {id?: number, title: string, rate: number }) => { 
    return { 
        id: data.id,
        title: data.title,
        rate: data.rate
    }
}

export default skillsSchema;