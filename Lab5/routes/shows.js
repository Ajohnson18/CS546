const express = require('express');
const axios = require('axios');
const router = express.Router();

async function getShows(){
  const url = "http://api.tvmaze.com/shows";
  const { data } = await axios.get(url);
  return data;
}

function getShow(shows, id) {
	if(id === undefined) throw "Error: No parameter defined.";

	for(i = 0; i < shows.length; i++) {
		if(shows[i].id == id) return shows[i];
	}

	return "Error: No show found";
}

router.get('/', async (req, res) => {
  try {
    const shows = await getShows();
    res.json(shows);
  } catch (e) {
    res.status(404).json({ message: 'not found!' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const shows = await getShows();
    const show = getShow(shows, req.params.id);
    res.json(show);
  } catch (e) {
    res.status(404).json({ message: 'not found!' });
  }
});

module.exports = router;