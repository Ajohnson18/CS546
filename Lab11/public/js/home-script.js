$(document).ready(function () {
  $.ajax({
    url: "http://api.tvmaze.com/shows",
    success: function (result) {
      var list = document.getElementById("showList");
      console.log(result);
      for (var i = 0; i < result.length; i++) {
        var c = document.createElement("li");
        try {
          c.innerHTML = `
            <a href=""><h1>${result[i].name}</h1></a>
            <img src="${result[i].image.medium}" />
            <br />
            <b>Language</b>
            <p>${result[i].language}</p>
            <b>Genres</b>
            <p>${result[i].genres}</p>
            <b>Average Rating</b>
            <p>${result[i].rating.average}</p>
            <b>Network</b>
            <p>${result[i].network.name}</p>
            <b>Summary</b>
            <p>${result[i].summary}</p>
        `;
          list.appendChild(c);
        } catch (e) {}
      }
    },
  });
});

function search() {
  var searchBar = document.getElementById("search_term");
  var list = document.getElementById("showList");
  if (!searchBar.value) return;
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  console.log(searchBar.value);

  $.ajax({
    url: "http://api.tvmaze.com/search/shows?q=" + searchBar.value,
    success: function (result) {
      var list = document.getElementById("showList");
      console.log(result);
      for (var i = 0; i < result.length; i++) {
        try {
          var c = document.createElement("li");
          c.innerHTML = `
                <a href=""><h1>${result[i].show.name}</h1></a>
                <img src="${result[i].show.image.medium}" />
                <br />
                <b>Language</b>
                <p>${result[i].show.language}</p>
                <b>Genres</b>
                <p>${result[i].show.genres}</p>
                <b>Average Rating</b>
                <p>${result[i].show.rating.average}</p>
                <b>Network</b>
                <p>${result[i].show.network.name}</p>
                <b>Summary</b>
                <p>${result[i].show.summary}</p>
            `;
          list.appendChild(c);
        } catch (e) {}
      }
    },
  });
}
