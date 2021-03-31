const express = require('express');
const router = express.Router();
const axios = require('axios');


async function getTVByKeyword(key){
    const url = "http://api.tvmaze.com/search/shows?q=" + key;
    const { data } = await axios.get(url);
    return data;
  }

router.post('/', async (req, res) => {
    try {
        if(req.body.searchTerm.trim().length == 0 || !req.body.searchTerm)
            res.status(400).render('search/error');
        const tv = await getTVByKeyword(req.body.searchTerm);
        if(tv.length > 20) tv = tv.slice(0,20);
        res.render('search/index', {shows: tv, keyword: req.body.searchTerm});
    } catch (e) {
        res.status(404).json({ message: e});
    }
});

module.exports = router;