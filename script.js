const app = {};

//Alanna's API key
app.apiKey = "aa0e1ce1cb622fb5704728e8b09bd4bd";
app.url = "http://ws.audioscrobbler.com/2.0/";

let userInput = '';

//method to store user's input into the user input variable

$('form').on('submit', function (event) {
  event.preventDefault();
  app.getUserInput();
})

app.getUserInput = function() {
  userInput = $('#search').val();
  // console.log(userInput);
  app.getSimilarArtists(userInput);
}

//this method returns the top 10 similar artist results to the user's input
app.getSimilarArtists = function(artist){
  $.ajax({
    url: app.url,
    data: {
      api_key: app.apiKey,
      method: 'artist.getsimilar',
      format: 'json',
      artist: artist,
      autocorrect: 1,
      limit: 10
    }
  }).then(function (result) {
    // console.log(result.similarartists.artist);
    //this variable stores the artist array
    const artistMatch = result.similarartists.artist;
    // console.log(artistMatch)
    //this variable is created from the filter method on the artist match array. the filter loops through each array and only returns the ones that have an mbid(artist id)
   const artistIdFilter = artistMatch.filter((artist) => {
      return artist.mbid;
    })

    //this variable is an array of ids of the artists that had ids
   const artistIds = artistIdFilter.map((id) => {
      return id.mbid;
    })

    // console.log(artistIds);

    //each id is passed through as an argument in the getTopAlbum method.
    artistIds.forEach((id) => {
      app.getTopAlbum(id);
    })
    // console.log(artistIds);
  })
}

//this method gets similiar artist recommendations album info
// this id refers to the artist id
app.getTopAlbum = function(id){
  $.ajax({
    url: app.url,
    data: {
      api_key: app.apiKey,
      method: 'artist.gettopalbums',
      format: 'json',
      mbid: id,
      limit: 1
    }
  }).then(function(result){
    console.log(result);
    return result;
  })
}

//this method is to get the album info of the top album for each artist. we need to pass the mbid of the top album as the argument in this method
//using the album id from GetTopAlbums, pass through GetTopAlbumInfo to get cover art, track list, etc.
app.getTopAlbumInfo = function(id) {
  $.ajax({
    url: app.url,
    data: {
      api_key: app.apiKey,
      method: 'album.getinfo',
      format: 'json',
      mbid: id,
      limit: 1
    }
  }).then(function (result) {
    console.log(result);
    return result;
  })
}



// app.getAlbumInfo("38f59974-2f4d-4bfa-b2e3-d2696de1b675");

//


app.init = function() {
  
}

//document ready
$(function(){
  app.init();  
})