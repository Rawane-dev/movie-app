
import { IoSearch } from "react-icons/io5"
import "./App.css"
import { useEffect, useState } from "react"
import axios from "axios"
import Moviecard from "./Moviecard.jsx"
import { BeatLoader } from "react-spinners"

export default function App() {
  const API_KEY="http://www.omdbapi.com/?i=tt3896198&apikey=a05435da"
  const [input,setInput]=useState("Batman")
 const[data,setData]=useState([])
useEffect(()=>{
  if (input.trim() !== ""){
  axios.get(`${API_KEY}&s=${input}`).then((res)=>setData(res.data.Search)).catch((err)=>console.log(err))}
  else{
    axios.get(`${API_KEY}&s=Batman`).then((res)=>setData(res.data.Search)).catch((err)=>console.log(err))
  }

},[input])

  return (
    <>
    <div className="container">
     <div className="title">
        <h1>MovieLand</h1>
        </div>
        <div className="search">
          <input type="text" placeholder="Search for a movie" onChange={(e)=>setInput(e.target.value)} />
          <IoSearch id="icon" />
        </div>
        {data? 
        <div className="movie-list">
          {data && data.map(movie => (
            <Moviecard key={movie.imdbID} movie={movie} />
          ))}
        </div>: <div className="spinner"> <BeatLoader color="#f9d3b4" /> </div>}
        </div>
    </>
  )
}
