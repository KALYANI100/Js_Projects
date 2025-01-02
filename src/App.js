
import { useEffect, useState } from 'react';
import './App.css';


const movies = [
  {
    name: "Inception",
    id:2021,
    year: 2010,
    image: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg"
  },
  {
    name: "Interstellar",
    year: 2014,
    id:2012,
    image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
  },
  {
    name: "Interstellar",
    year: 2014,
    id:2019,
    image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
  },{
    name: "Inception",
    year: 2010,
    id:2013,
    image: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg"
  },{
    name: "Inception",
    year: 2010,
    id:2014,
    image: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg"
  },
  
];




function App() {
  const [results,setupresults]=useState('');
  const [presult,setresults]=useState('');
  const [isState,setupstate]=useState(true);
  const [numresult,setupnum]=useState(0);
  console.log(results);
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Clean up on unmount
    return () => {
        document.head.removeChild(link);
    };
}, []);
  // if(results==='')
  // {
  //   return<div className="App">
  //     <Navbar setupresults={setupresults} key1={results} numresult={numresult}></Navbar>
  //      <div className='results'>
  //     <div className='search-results'></div>
  //     <div className='search-results'></div>
  //     </div></div>
  // }
  return (
    <div className="App">
      <Navbar setupresults={setupresults} key1={results} numresult={numresult}></Navbar>
      <div className='results'>
      <Search results={results} setresults={setresults} setupstate={setupstate} setupnum={setupnum}></Search>
      <Movie presult={presult} isState={isState} setupstate={setupstate}></Movie>
      </div>
    </div>
  );
}
function Navbar({setupresults ,key1,numresult})
{
  const [inputvalue,setupinput]=useState(key1);
  function handleSearch(e)
  {
    
    const val=e.target.value;
    setupinput(val);
setupresults(val);

console.log(val);


   }
  return <div className='navbar'>
    <h2> movieMate 🍿
    </h2>
    <input placeholder='Search movies....' value={inputvalue} onChange={handleSearch}></input>
    <h3>Found {numresult} results</h3>
  </div>
}
function Search({results,setresults,setupstate,setupnum})
 
{
  
  const [movie,setupmovie]=useState([]);
  
  useEffect(()=>{
  const fetchMovieData = async () => {
    const apiKey = "2dd2333f"; //
    const url = `http://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}&s=${results}`;
   
    try {
      const response = await fetch(url);
      console.log(results);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Movie Data:", data);
      if(data.Error)
      {
        throw data.Error;
      }
    
      setupmovie(data.Search)
      setupnum(data.Search.length);
      console.log(movie);
    } catch (error) {
      console.error("Error fetching data:", error);
      
    }}
    fetchMovieData() }, [results]); 
    function handleClick(e)
    {
      console.log(e);
      setresults(e.imdbID);
      setupstate(true);
    }
    
    return <div className='search-results'>
    <div className='list' >{movie?.length > 0 && movie.map((item)=>
    <div className='element' key={item.id} onClick={()=>handleClick(item)}>
      <img src={item.Poster} alt='movie'></img>
      <div className='li-right'>
        <span>{item.Title}</span>
        <p>📅{item.Year}</p>
      </div>
    </div>)}</div>
  </div>;
  };
 
function Movie({presult,isState,setupstate})
{
  const [movieData, setMovieData] = useState(null);
  const [rate,seuprate]=useState([]);//watched movie
  //const [isState,setupstate]=useState(true);
  //const [watched,setwatch]=useState([]);
  
  useEffect(()=>{
  const fetchMovieData = async () => {
  const apiKey = "2dd2333f"; //
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&i=${presult}`;
   
    try {
      const response = await fetch(url);
      console.log(presult);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Movie Data:", data);
    setMovieData(data);}
      catch (error) {
        console.error("Error fetching data:", error);
        
      }};
      fetchMovieData();},[presult]);
      console.log(movieData);
      // useEffect(()=>
      // {
      //   function addel()
      //   {
          
      //     setwatch([...watched,rate]);
      //     console.log(watched);
      //   };
      //   addel();
      // },rate);
      if(presult==='')
      {
        return <div className='search-results'>
        <Moviewatch rate={rate}></Moviewatch>
        {rate.map((movie)=><Moviesbook movie={movie}></Moviesbook> )}
       </div>;
      }
      if(isState){
  return <div className='search-results'>
    
    <Info movie={movieData} setupstate={setupstate}></Info>
    <Description movie={movieData} seuprate={seuprate} rate={rate} setupstate={setupstate} isState={isState}></Description>
    </div>;}
    else{
      return <div className='search-results'>
     <Moviewatch rate={rate}></Moviewatch>
     {rate.map((movie)=><Moviesbook movie={movie}></Moviesbook> )}
    </div>;}
  
}
function Info({movie,setupstate})
{
  if(movie===null)
  {
    return <div className='Info'></div>;
  }
  console.log({movie});
  return <div className='Info'>
    <button onClick={()=>setupstate(false)}><i class="ri-arrow-left-line"></i></button>
    <img src={movie.Poster} alt="image1"></img>
    <div className='Info-right'>
    <h2>{movie.Title}</h2>
    <p>{movie.Released}{"     "}{movie.Runtime}</p>
    <p>{movie.Genre}</p>
    <p>⭐️{movie.imdbRating}</p>
    </div>
  </div>
}
function Description({movie,seuprate,setupstate,isState,rate})
{
  if(movie===null)
    {
      return <div className='Info'></div>;
    }
  return <div className='Des-info'>
    <Ratings seuprate={seuprate} movie={movie} setupstate={setupstate} isState={isState} rate={rate} ></Ratings>
    <p>{movie.Plot}</p>
  
  </div>
}
function Ratings({seuprate,movie,setupstate,isState,rate})
{
  const [state1,setstate1]=useState(false);
  const m=movie;
  function handleClick(rating1)
  {
    console.log('Hi');
    // console.log(e1);
    // const m=movie;
    m.ratings=rating1;
    console.log(m);
    //seuprate(()=>m);
   // setupstate(!isState);
    setstate1(true);
    //seuprate(e);
  }
  function handleAdd()
  {
    console.log(m);
    seuprate((rate) => [...rate, { ...m }]);
    setupstate(false);
  }

  return <center><div class="rating">
  <input type="radio" id="star5" name="rating" value="5" onClick={()=>handleClick(5)} />
  <label htmlFor="star5" title="5 stars">★</label>
  
  <input type="radio" id="star4" name="rating" value="4" onClick={()=>handleClick(4)} />
  <label htmlFor="star4" title="4 stars">★</label>
  
  <input type="radio" id="star3" name="rating" value="3" onClick={()=>handleClick(3)}/>
  <label htmlFor="star3" title="3 stars">★</label>
  
  <input type="radio" id="star2" name="rating" value="2" onClick={()=>handleClick(2)}/>
  <label htmlFor="star2" title="2 stars">★</label>
  
  <input type="radio" id="star1" name="rating" value="1" onClick={()=>handleClick(1)}/>
  <label htmlFor="star1" title="1 star">★</label>
</div>
{state1?<Add handleAdd={handleAdd} setupstate={setupstate}></Add>:''}</center>
}
function Add({handleAdd,setupstate})
{
  return <button className='add-list' onClick={()=>handleAdd()}>Add</button>
}
// function Moviewatch({rate})
// {
  
//   return <div className='movies-info' >
//   <h3>MOVIES YOU WATCHED</h3>
//   <div className='movie-watch'>
//   <p> 🎬 {rate.length} movies</p>
//   <p> ⭐️</p>
//   <p> 🌟 10.00</p>
//   <p> ⌛ 169min</p>
//   </div>
//   </div>
// }
function Moviewatch({ rate }) {
  if (rate.length === 0) {
    return (
      <div className='movies-info'>
        
        <h3>MOVIES YOU WATCHED</h3>
        <div className='movie-watch'>
          <p> 🎬 0 movies</p>
          <p> ⭐️ 0.0</p>
          <p> 🌟 0.0</p>
          <p> ⌛ 0 min</p>
        </div>
      </div>
    );
  }
  // Calculate the average rating
  const averageRating = rate.reduce((sum, movie) => sum + Number(movie.ratings), 0) / rate.length;

  // Calculate the total time watched
  const totalTimeWatched = rate.reduce((sum, movie) => sum + (parseInt(movie.Runtime) || 0), 0);

  // Calculate the average rating of the start (assuming 'rating' is the rating of the movie)
  const averageStarRating = rate.reduce((sum, movie) => sum + Number(movie.imdbRating), 0) / rate.length;

  return (
    <div className='movies-info'>
      <h3>MOVIES YOU WATCHED</h3>
      <div className='movie-watch'>
        <p> 🎬 {rate.length} movies</p>
        <p> ⭐️ {averageStarRating.toFixed(1)}</p>
        <p> 🌟 {averageRating.toFixed(1)}</p>
        <p> ⌛ {totalTimeWatched} min</p>
      </div>
    </div>
  );
}
function Moviesbook({movie})
{
  return <div className='movie-watched'>
    <img src={movie.Poster} alt='imagea'></img>
   
  <div className='movies1-info'>
  <span>{movie.Title}</span>
  <div className='movie1-watch'>
  <p> ⭐️ {movie.ratings}</p>
  <p> 🌟 {movie.imdbRating}</p>
  <p> ⌛ {movie.Runtime}</p>
  </div>
  </div>
  </div>
}
export default App;
