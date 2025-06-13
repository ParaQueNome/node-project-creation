

const projectSchema = (data: { id: number, title: Text, description: Text, thumbnail: Text, url: Text })=>{
    return { 
        id: data.id,
        title: data.title,
        description: data.description,
        thumbnail: data.thumbnail,
        url: data.url,
    }


}

export default projectSchema;