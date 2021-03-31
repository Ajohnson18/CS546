const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const me = [{
    	"name": "Alex Johnson",
    	"cwid": "10439617",
    	"biography": "I was born in Red Bank NJ and currently live between Hoboken NJ and Point Pleasant NJ. I grew up going to Point Pleasant Borough school district where I swam and was in the band. My favorite subjects in school were Math and Computer Science which lead me to go to Stevens Institute of Technology. I swim on the men's varsity team at Stevens and also am in the Theta Xi Fraternity Gamma Chapter. \nOne of my favorite things to do is surf. I began surfing when I was about 7 years old through the Summertime Surf Camp. I went to the camp for many years until I was able to work there. I am now currently the operations director of the company and hope to move onto doing IT for them aswell. Surfing has been one of my most defining attributes making me into who I am today.",
    	"favoriteShows": ["Always Sunny", "Avatar: The Last Airbender", "Blacklist"]
    }]
    res.json(me);
  } catch (e) {
    res.status(404).json({ message: 'not found!' });
  }
});

module.exports = router;