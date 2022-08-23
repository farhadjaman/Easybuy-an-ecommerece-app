class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryobj = { ...this.queryString };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach(el => delete queryobj[el])
    let querystr = JSON.stringify(queryobj);
    querystr = querystr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    this.query = this.query.find(JSON.parse(querystr));
    return this;
    //let query = Tour.find(JSON.parse(querystr));
  }

  sort() {
    if (this.queryString.sort) {
      const sortStr = this.queryString.sort.replace(/\b(,)\b/g, ' ');
      this.query = this.query.sort(sortStr);
    }
    else {
      this.query = this.query.sort('price');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.replace(/\b(,)\b/g, ' ');
      this.query = this.query.select(fields);
      //console.log(fields);
    }
    else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }

}
export default APIFeatures;