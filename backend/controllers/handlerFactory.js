import AppError from './../utills/appErrors.js';
import catchAsync from './../utills/catchAsync.js';
import APIFeatures from './../utills/apiFeatures.js';

export function deleteOne(model) {
  return catchAsync(async (req, res, next) => {

    const doc = await model.findByIdAndDelete(req.params.id);

    if (!doc) return next(new AppError('ID doesnt exits', 404))

    res.status(204).json({
      status: 'success',
      message: 'document deleted successfully',
      data: {
        doc
      }
    });
  });
}

export function updateOne(model) {
  return catchAsync(async (req, res, next) => {

    const UpdatedModel = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(201).json({
      status: 'success',
      message: 'Completed',
      data: {
        UpdatedModel
      }
    });
  });
}

export function createOne(model) {
  return catchAsync(async (req, res, next) => {
    const doc = await model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        doc
      }
    });
  });
}
export function getOne(model, populateOptions) {
  return catchAsync(async (req, res, next) => {
    const query = model.findById(req.params.id);
    if (populateOptions) query.populate(populateOptions);
    const doc = await query;
    if (!doc) return next(new AppError('No doccument found with this ID', 404))
    res.status(200).json({
      status: "success",
      data: {
        doc
      }
    });
  });
}
export function getAll(model) {
  return catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.id)
      filter = { product: req.params.id }
    const features = new APIFeatures(model.find(filter), req.query)
    const doc = await features.query;
    res.status(200).json({
      status: "success",
      results: doc.length,
      data: {
        doc
      }
    });
  });
}