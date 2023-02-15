class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    // Search Feature
    search() {
        // ? -> Turnary Operation
        const keyword = this.queryStr.keyword ? {
            // if keyword found
            // name = what to search
            name: {
                // $regex = regular expression (mongoDB operator)
                $regex: this.queryStr.keyword,
                $options: "i", // means search is case insenstive  
            },
        } : {};

        this.query = this.query.find({...keyword });
        return this;
    }

    filter() {
        // need to modify queryStr. But need to store original queryStr so that it doesn't get modified
        // const queryCopy = this.queryStr (wrong) [this.queryStr is an object. And queryCopy is a reference to that object, so modifying queryCopy will actually modify this.queryStr]
        // Need to use spreadoperator to avoid this. So that only the copy is modified.
        const queryCopy = {...this.queryStr };

        // Removing some fields for category
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach(key => delete queryCopy[key]);

        this.query = this.query.find(queryCopy); // Product.find()
        return this;
    }
};

module.exports = ApiFeatures