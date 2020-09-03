const d = document,
 $form = d.getElementById("song-search"),
 $loader = d.getElementById(".loader"),
 $error = d.getElementById(".error"),
 $main = d.getElementById("main"),
 $artist = d.getElementById(".artist"),
 $song = d.getElementById(".song");

 $form.addEventListener("submit",async e => {
  e.preventDefault

  try{
    $loader.style.display = "block";


    let artist = e.target.artist.value.toLowerCase(),
        song = e.target.song.value.toLowerCase(),
        $artistTemplate = "",
        $songTemplate = "",
        artistAPI = `http://theaudiodb.com/api/v1/json/1/search.php?s=${artist}`,
        songAPI = `https://api.lyrics.ovh/v1/${artist}/${song}`,
        artistFetch = fetch(artistAPI),
        songFetch = fetch(songAPI),
        [artistRes, songRes] = await Promise.all([artistFetch, songFetch]),
        artistData = await artistRes.json(),
        songData = await songRes.json();

        if(artistData.artists === null){
          $artistTemplate = `<h2>No existe el intérprete <mark>${artist}</mark></h2>`
        }else {
            
        }


  } catch (err){
    console.log(err);
    $loader.style.display = "none";
    let message = err.statusText || "Ocurrio un error";
    $error.innerHTML = `<p>Error ${err.status}: ${message}</p>`
  }
 });