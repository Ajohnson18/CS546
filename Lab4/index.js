const movies = require("./data/movies");
const connection = require('./config/mongoConnection');


const main = async () => {

	const db = await connection();
    
	try {
		const endGame = await movies.create(
			"Avengers Endgame",
			"The avengers take on Thanos in their final movie",
			"PG-13",
			"3hrs",
			"Action / Fantasy",
			["Robert Downey Jr.", "Chris Hemsworth", "Paul Rudd"],
			{director: "Russo Brothers", yearReleased: 2019}
		)
		console.log(endGame);
	} catch (error) {
		console.log(error);
	}

	try {
		const jp = await movies.create(
			"Jurrasic Park",
			"A movie where some people open a park with dinosaurs",
			"PG-13",
			"2hrs",
			"Adventure / SciFi",
			["Sam Neil", "Laura Dern", "Jeff Goldbloom"],
			{director: "Steven Spieldberg", yearReleased: 1993}
		)
		const all = await movies.getAll();
		console.log(all);
	} catch (error) {
		console.log(error);
	}

	try {
		const simps = await movies.create(
			"Simpsons Movie",
			"The simpsons get trapped inside of a massive dome",
			"PG-13",
			"1.5hrs",
			"Animation / Comedy",
			["Dan Castellaneta", "Spider Pig"],
			{director: "David Silverman", yearReleased: 2007}
		)
		console.log(simps);
	} catch (error) {
		console.log(error);
	}

	try {
		const update = await movies.rename("5f7511938430095cd06f45e4", "Miracle Worker")
		console.log(update);
	} catch (error) {
		console.log(error);
	}

	try {
		const rem = await movies.remove("5f7510c28bd3e65993d4e180");
		const all = await movies.getAll();
		console.log(all);
	} catch (error) {
		console.log(error);
	}

	try {
		const bad = await movies.create(
			"					",
			"The simpsons get trapped inside of a massive dome",
			"PG-13",
			"1.5hrs",
			"Animation / Comedy",
			["Dan Castellaneta", "Spider Pig"],
			{director: 200, yearReleased: 2007}
		)
		console.log(bad);
	} catch (error) {
		console.log(error);
	}

	try {
		const remB = await movies.remove("5f7510e180");
		console.log(remB);
	} catch (error) {
		console.log(error);
	}

	try {
		const renB = await movies.rename("5f7510e180", "Billy Bob Throrton");
		console.log(renB);
	} catch (error) {
		console.log(error);
	}

	try {
		const renB = await movies.rename("5f7511938430095cd06f45e4", [1,2,3]);
		console.log(renB);
	} catch (error) {
		console.log(error);
	}

	try {
		const getNothing = await movies.get("1");
		console.log(getNothing);
	} catch (error) {
		console.log(error);
	}

    await db.serverConfig.close();

    console.log('Done!');
};

main().catch((error) => {
  console.log(error);
});