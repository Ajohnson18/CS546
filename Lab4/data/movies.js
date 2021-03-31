const mongoCollections = require('../config/mongoCollections');
const movies = mongoCollections.movies;
var ObjectId = require('mongodb').ObjectID;

module.exports = {
	async get(id) {
	 	if (!id) throw 'You must provide an id to search for';
	 	if(typeof id != "string" || id.trim().length == 0) throw "Error: wrong type for id";
	 	if(!(ObjectId.isValid(id))) throw 'Error: Not a valid objectId';

	    const movieCollection = await movies();

	    const movie = await movieCollection.findOne({ _id: id });
	    if (movie === null) throw 'No movie with that id';

	    return movie;
	},
	async getAll() {
   		const movieCollection = await movies();

    	const movieList = await movieCollection.find({}).toArray();

    	return movieList;
  	},
  	async remove(id) {
	 	if (!id) throw 'You must provide an id to search for';
	 	if(typeof id != "string" || id.trim().length == 0) throw "Error: wrong type for id";
	 	if(!(ObjectId.isValid(id))) throw 'Error: Not a valid objectId';

	    const movieCollection = await movies();

	    const movie = await movieCollection.findOne({ _id: id });
		if (movie === null) throw 'No movie with that id';

	    const movieD = await movieCollection.deleteOne({ _id: id });
	    if (movieD.deleteCount === 0) throw 'No movie with that id';

	    return movie.title + " has been successfully deleted";
	},
	async rename(id, newTitle) {
	 	if (!id || !newTitle) throw 'You must provide an id to search for';
	 	if(typeof id != "string" || typeof newTitle != "string" || newTitle.trim().length == 0 || id.trim().length == 0) throw "Error: wrong type for id";
	 	if(!(ObjectId.isValid(id))) throw 'Error: Not a valid objectId';

	    const movieCollection = await movies();
	    const updateTitle = {
	    	title: newTitle,
	    };

	    const updatedInfo = await movieCollection.updateOne(
	    	{ _id: id },
	    	{ $set: updateTitle}
	    );

	    if (updatedInfo.modifiedCount === 0) {
      		throw 'could not update movie successfully';
    	}
	
    	return this.get(id);
	},
	async create(title, plot, rating, runtime, genre, cast, info) {
		try {
			title = title.trim();
			plot = plot.trim();
			rating = rating.trim();
			runtime = runtime.trim();
			genre = genre.trim();
		} catch (error) {
			throw "Error: Invalid Arguments";
		}
		if(!title || !plot || !rating || !runtime || !genre || !cast || !info) throw "Error: Please specify all arguments.";
		if(typeof title != "string" || typeof plot != "string" || typeof rating != "string" || typeof runtime != "string" || typeof genre != "string") throw "Error: Incorrect argument types";
		if(title.length == 0 || plot.length == 0 || rating.length == 0 || runtime.length == 0 || genre.length == 0) throw "Error: Invalid strings";
		if(!Array.isArray(cast)) throw 'Error: Incorrect argument types.';
		if(typeof info != "object") throw "Error: Incorrect argument types.";
		if(!info.director || typeof info.director != "string") "Error: Incorrect argument type.";
		if(!info.yearReleased || info.yearReleased.toString().length != 4 || typeof info.yearReleased != "number") throw "Error: Incorrect argument type";
		if(info.director.trim().length == 0) throw "Error: incorrect director";
		let yr = new Date();
		if(info.yearReleased < 1930 || info.yearReleased > yr.getFullYear() + 5) throw "Error: Incorrect year";

		let newObjId = ObjectId().toString();

		let obj = {
			_id: newObjId,
			title: title,
			plot: plot,
			rating: rating,
			runtime: runtime,
			genre: genre,
			cast: cast,
			info: info
		};

		const movieCollection = await movies();

		const insertInfo = await movieCollection.insertOne(obj);
	    if (insertInfo.insertedCount === 0) throw 'Could not add movie';

	    const newId = insertInfo.insertedId;

	  	const movie = await this.get(newId);

		return movie;
	}
}