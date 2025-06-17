const projectSchema = (data: { id?: number, title: string, description: string, thumbnail: string, url: string })=>{
    return { 
        id: data.id ?? undefined,
        title: data.title,
        description: data.description,
        thumbnail: data.thumbnail,
        url: data.url,
    }


}

export default projectSchema;