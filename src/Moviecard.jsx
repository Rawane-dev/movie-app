import "./Moviecard.css"

export default function Moviecard({movie}) {


  return (
    <>
    
   
    <div className="movie-card" style={{
    backgroundImage:
      movie.Poster && movie.Poster !== "N/A"
        ? `url(${movie.Poster})`
        : `url(/fallback.jpg)`,
  }}>
      {console.log(movie.Poster)}
      <p>{movie.Year}</p>
      <div className="text">
        <h2>{movie.Type}</h2>
        <h3>{movie.Title}</h3>
      </div>
    </div>
    </>
  )
}
