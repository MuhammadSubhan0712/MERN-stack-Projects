export class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        //Filtering:
        const queryObj = { ...this.queryString }
    }
}