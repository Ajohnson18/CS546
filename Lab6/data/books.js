const mongoCollections = require('../config/mongoCollections');
const books = mongoCollections.books;
var ObjectId = require('mongodb').ObjectID;

module.exports = {
	async read(id) {
	 	if (!id) throw 'You must provide an id to search for';
	 	if(typeof id != "string" || id.trim().length == 0) throw "Error: wrong type for id";
	 	if(!(ObjectId.isValid(id))) throw 'Error: Not a valid objectId';

	    const bookcollections = await books();

	    const book = await bookcollections.findOne({ _id: id });
	    if (book === null) throw 'No book with that id';

	    return book;
	},
	async readAll() {
   		const bookcollections = await books();

    	const bookList = await bookcollections.find({}, {projection: {_id: 1, title: 1}}).toArray();
    	if(!bookList) throw "No books in the system.";
    	if(bookList.length == 0) throw "No books in the system";

    	return bookList;
  	},
  	async remove(id) {
	 	if (!id) throw 'You must provide an id to search for';
	 	if(typeof id != "string" || id.trim().length == 0) throw "Error: wrong type for id";
	 	if(!(ObjectId.isValid(id))) throw 'Error: Not a valid objectId';

	    const bookcollections = await books();

	    const book = await bookcollections.findOne({ _id: id });
		if (book === null) throw 'No book with that id';

	    const bookD = await bookcollections.deleteOne({ _id: id });
	    if (bookD.deleteCount === 0) throw 'No book with that id';

	    return book.title + " has been successfully deleted";
	},
	async update(id, title, author, genre, datePublished, summary, reviews) {
		try {
			title = title.trim();
			summary = summary.trim();
		} catch (error) {
			throw "Error: Invalid Arguments";
		}
		if(!title || !author || !genre || !datePublished || !summary || !reviews) throw "Error: Please specify all arguments.";
		if(typeof title != "string" || typeof summary != "string") throw "Error: Incorrect argument types";
		if(title.length == 0 || summary.length == 0) throw "Error: Invalid strings";
		if(!Array.isArray(genre) || !Array.isArray(reviews)) throw 'Error: Incorrect argument types.';
		if(typeof author != "object") throw "Error: Incorrect argument types.";
		if(!author.authorFirstName || typeof author.authorFirstName != "string" || !author.authorLastName || typeof author.authorLastName != "string") "Error: Incorrect argument type.";
		if(genre.length < 1) throw "Error: Incorrect argument type";

	    const bookcollections = await books();
	    const updatedBook = {
	    	title: title,
			author: author,
			genre: genre,
			datePublished: datePublished,
			summary: summary,
			reviews: reviews
	 	};

	    const updatedInfo = await bookcollections.updateOne(
	    	{ _id: id },
	    	{ $set: updatedBook}
	    );

	    if (updatedInfo.modifiedCount === 0) {
      		throw 'could not update book successfully';
    	}
	
    	return this.read(id);
	},
	async create(title, author, genre, datePublished, summary, reviews) {
		try {
			title = title.trim();
			summary = summary.trim();
		} catch (error) {
			throw "Error: Invalid Arguments";
		}
		if(!title || !author || !genre || !datePublished || !summary || !reviews) throw "Error: Please specify all arguments.";
		if(typeof title != "string" || typeof summary != "string") throw "Error: Incorrect argument types";
		if(title.length == 0 || summary.length == 0) throw "Error: Invalid strings";
		if(!Array.isArray(genre) || !Array.isArray(reviews)) throw 'Error: Incorrect argument types.';
		if(typeof author != "object") throw "Error: Incorrect argument types.";
		if(!author.authorFirstName || typeof author.authorFirstName != "string" || !author.authorLastName || typeof author.authorLastName != "string") "Error: Incorrect argument type.";
		if(genre.length < 1) throw "Error: Incorrect argument type";

		let newObjId = ObjectId().toString();

		let obj = {
			_id: newObjId,
			title: title,
			author: author,
			genre: genre,
			datePublished: datePublished,
			summary: summary,
			reviews: reviews
		};

		const bookcollections = await books();

		const insertInfo = await bookcollections.insertOne(obj);
	    if (insertInfo.insertedCount === 0) throw 'Could not add book';

	    const newId = insertInfo.insertedId;

	  	const book = await this.read(newId);

		return book;
	}
}