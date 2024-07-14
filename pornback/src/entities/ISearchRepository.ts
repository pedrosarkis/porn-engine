interface ISearchRepository {
    search(query: string): Promise<any[]>
}

export default ISearchRepository

//Revisar depois o uso do any[]