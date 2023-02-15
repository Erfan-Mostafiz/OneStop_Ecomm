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

    // Product Filter Feature using price and category
    filter() {

        // need to modify queryStr. But need to store original queryStr so that it doesn't get modified
        // const queryCopy = this.queryStr (wrong) [this.queryStr is an object. And queryCopy is a reference to that object, so modifying queryCopy will actually modify this.queryStr]
        // Need to use spreadoperator to avoid this. So that only the copy is modified.
        const queryCopy = {...this.queryStr };

        // Removing some fields for category
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach(key => delete queryCopy[key]);

        // Filter for Price and Rating - Will show products within a price range
        let queryStr = JSON.stringify(queryCopy); // converting the object to string
        // gt = greater than, lt = less than, gte = greater than or equal to, lte = less than or equal to
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);


        // JSON.parse(queryCopy) to convert it back to object from string
        this.query = this.query.find(JSON.parse(queryStr)); // Product.find()

        return this;
    }

    // Product Pagination
    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1; // if no page given, then by default show page 1

        // how many products to skip from starting and show in this page. 
        const skipFromFirst = resultPerPage * (currentPage - 1) // 50 - 10. 3rd page -> skip first 20 products. So 10*(3-1) = 20. Show 10 products from 21st product in 3rd page
        this.query = this.query.limit(resultPerPage).skip(skipFromFirst)

        return this;
    }
};

module.exports = ApiFeatures