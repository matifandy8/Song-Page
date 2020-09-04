const d = document,
 $form = d.getElementById("song-search"),
 $loader = d.getElementById(".loader"),
 $error = d.getElementById(".error"),
 $main = d.getElementById("main"),
 $artist = d.getElementById(".artist"),
 $song = d.getElementById(".song");

 $form.addEventListener("submit",async e => {
  e.preventDefault();

  try{


    let artist = e.target.artist.value.toLowerCase(),
        song = e.target.song.value.toLowerCase(),
        $artistTemplate = "",
        $songTemplate = "",
        artistAPI = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artist}`,
        songAPI = `https://api.lyrics.ovh/v1/${artist}/${song}`,
        artistFetch = fetch(artistAPI),
        songFetch = fetch(songAPI),
        [artistRes, songRes] = await Promise.all([artistFetch, songFetch]),
        artistData = await artistRes.json(),
        songData = await songRes.json();

        console.log(artistRes, songRes);
        console.log(artistData, songData);

        if(artistData.artists === null){
          $artistTemplate = `<h2>No existe el intérprete <mark>${artist}</mark></h2>`
        }else {
            let artist = artistData.artists[0];
            $artistTemplate = `
             <h2>${artist.strArtist}</h2>
             <img src="${artist.strArtistThumb}" alt="${artist.strArtist}">
             <p>
               ${artist.intBornYear}-${artist.intDiedYear || "Presente"}
             </p>
             <p>${artist.strCountry}</p>
             <p>${artist.strGenre}-${artist.strStyle}</p>
             <a href="http://${artist.strWebsite}" target="_blank">Sitio Web</a>
             <p>${artist.strBiographyEN}</p>
            `;
        }

        if(songData.error){
          $songTemplate = `<h2>No existe la cancion <mark>${song}</mark> </h2>`;
        }else{
          $songTemplate = `
          <h2>${song}</h2>
          <blckqoute>${songData.lyrics}</blockqoute>
          `;
        }

        $artist.innerHTML = $artistTemplate;
        $song.innerHTML = $songTemplate;


  } catch (err){
    console.log(err);
    
    let message = err.statusText || "Ocurrio un error";
    $error.innerHTML = `<p>Error ${err.status}:${message}</p>`;
  }
 });