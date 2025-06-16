

const projectSchema = (data: { id: number, title: String, description: String, thumbnail: String, url: String })=>{
    return { 
        id: data.id,
        title: data.title,
        description: data.description,
        thumbnail: data.thumbnail,
        url: data.url,
    }


}

export default projectSchema;