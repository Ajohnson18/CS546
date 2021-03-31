const express = require('express');
const router = express.Router();
const axios = require('axios');


async function getTV(id){
    const url = "http://api.tvmaze.com/shows/" + id;
    const { data } = await axios.get(url);
    return data;
  }

router.get('/:id', async (req, res) => {
    try {
        const tv = await getTV(req.params.id);
        if(!tv) res.status(404).render('show/error');
        res.render('show/show', {show: tv});
    } catch (e) {
        res.status(404).render('show/error');
    }
});

module.exports = router;