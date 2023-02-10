const Product = require('../models/products');

const getAllProducts = async(req,res)=>{
    
    // const products = await Product.find({});
    // const products = await Product.find({ featured:true });
    // const products = await Product.find({ name:'mobile' });
    // res.status(200).json({ products, nbHits: products.length });

    // sort, select, limit, skip
    // const products = await Product.find({  }).sort('-name').select('name price').limit(5).skip(2);
    // res.status(200).json({ products, nbHits: products.length });

    // price > or <
    const product = await Product.find({price: {$gt:700000}});
    res.send(product);

    // $regex
    // const search = 'a';
    // const products = await Product.find({ name: {$regex:search, $options:'i'} });
    // res.status(200).json({ products, nbHits: products.length });
}



const getAllProductsTesting = async(req,res)=>{
    // searching
    const { featured, company, name, sort, fields, numericFilters } = req.query;
    const queryObject = {};
    if(featured){
        queryObject.featured = featured === 'true'? true:false
    }
    if(company){
        queryObject.company = company;
    }
    if(name){
        queryObject.name = { $regex:name, $options: 'a' };
    }
    // const product = await Product.find(queryObject);
    // res.status(200).json({product, nbHits: product.length})


    // numericFilter
    if(numericFilters){
        const operatorMap = {
            '>' : '$gt',
            '>=' : '$gte',
            '=' : '$eq',
            '<' : '$lt',
            '<=' : '$lte',
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/
        let filters = numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`);
        const option = ['price','rating'];
        filters = filters.split(',').forEach((item) => {
            const [field,oprator,value] = item.split('-');
            if(option.includes(field)){
                queryObject[field] = { [oprator]:Number(value) }
            }
        });
    }
    console.log(queryObject);

    // sort
    let result = Product.find(queryObject);
    if(sort){
        const sortList = sort.split(',').join('');
        result = result.sort(sortList);
    }else{
        result = result.sort('createdAt');
    }

    // fields
    if(fields){
        const fieldsList = fields.split(',').join('');
        result = result.select(fieldsList);
    }

    // limit, skip
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);
    
    const product = await result;
    res.status(200).json({product, nbHits: product.length})
}

module.exports = {getAllProducts,getAllProductsTesting};