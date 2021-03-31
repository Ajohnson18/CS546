const mongoCollections = require('../config/mongoCollections');
const reviews = mongoCollections.reviews;
var ObjectId = require('mongodb').ObjectID;

module.exports = {
	async read(id) {
	 	if (!id) throw 'You must provide an id to search for';
	 	if(typeof id != "string" || id.trim().length == 0) throw "Error: wrong type for id";
	 	if(!(ObjectId.isValid(id))) throw 'Error: Not a valid objectId';

	    const reviewCollections = await reviews();

	    const review = await reviewCollections.findOne({ _id: id });
	    if (review === null) throw 'No review with that id';

	    return review;
	},
	async readAll() {
   		const reviewCollections = await reviews();

    	const review = await reviewCollections.find({}).toArray();
    	if(!review) throw "No reviews in the system";

    	return review;
  	},
  	async remove(id) {
	 	if (!id) throw 'You must provide an id to search for';
	 	if(typeof id != "string" || id.trim().length == 0) throw "Error: wrong type for id";
	 	if(!(ObjectId.isValid(id))) throw 'Error: Not a valid objectId';

	    const reviewCollections = await reviews();

	    const review = await reviewCollections.findOne({ _id: id });
		if (review === null) throw 'No review with that id';

	    const reviewD = await reviewCollections.deleteOne({ _id: id });
	    if (reviewD.deleteCount === 0) throw 'No review with that id';

	    return review.title + " has been successfully deleted";
	},
	async create(title, reviewer, bookBeingReviewed, rating, dateOfReview, review) {
		try {
			title = title.trim();
			reviewer = reviewer.trim();
			dateOfReview = dateOfReview.trim();
			review = review.trim();
		} catch (error) {
			throw "Error: Invalid Arguments";
		}
		if(!title || !reviewer || !bookBeingReviewed || !rating || !dateOfReview || !review) throw "Error: Please specify all arguments.";
		if(typeof title != "string" || typeof reviewer != "string" || typeof dateOfReview != "string" || typeof review != "string") throw "Error: Incorrect argument types";
		if(title.length == 0 || reviewer.length == 0 || dateOfReview.length == 0 || review.length == 0) throw "Error: Invalid strings";
		if(typeof rating != "number") throw "Error: Incorrect argument type";
		if(!(ObjectId.isValid(bookBeingReviewed))) throw 'Error: Not a valid objectId';

		let newObjId = ObjectId().toString();

		let obj = {
			_id: newObjId,
			title: title,
			reviewer: reviewer,
			bookBeingReviewed: bookBeingReviewed,
			rating: rating,
			dateOfReview: dateOfReview,
			review: review
		};

		const reviewCollections = await reviews();

		const insertInfo = await reviewCollections.insertOne(obj);
	    if (insertInfo.insertedCount === 0) throw 'Could not add review';

	    const newId = insertInfo.insertedId;

	  	const review1 = await this.read(newId);

		return review1;
	}
}