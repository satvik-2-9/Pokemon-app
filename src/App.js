import React, { useState,useEffect} from 'react'
import PokemonList from './PokemonList';
import axios from 'axios'
import Pagenation from './Pagenation';
function App() {

  const [pokemon, setPokemon] = useState(["bulbasaur", "charmander"]); 
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [prevPageUrl, setPrevPageUrl] = useState("");
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    setLoading(true); /* every time i make a request i want to set the loading to true */
    let cancel; 
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      /* we get the data ,therefore loading=false. */
      setLoading(false); 
      setNextPageUrl(res.data.next);
      setPrevPageUrl(res.data.previous);
      setPokemon(res.data.results.map(p => p.name));
    })
     
    /* useEffect lets us return a function and this function 
       gets called every single time useEffect is called again.
       hence allows us to do a cleanup of the old request.
    */
    /* cancel is the function itself */
    return () => cancel(); 
  }, [currentPageUrl]);
  
  if (loading) return "Loading...";
  
  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }
  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }
  /* the point to cancel our previous request is that if the current page takes more time to load the page and in the meantime if the user send the next request , then 
     since we dont need the data of the previous request , also race condition could occur , hence we need to cancel our previous request.
     and we can do that in useEffect by passing the return cancel function from the cancelToken
  */


  return (
    /* send as props */
    <div>
    <PokemonList pokemon={pokemon} />
    {/* passing both the functions. */}
    <Pagenation 
      gotoNextPage={nextPageUrl?gotoNextPage:null}
      gotoPrevPage={prevPageUrl?gotoPrevPage:null}  
    />
    </div>
  );
}

export default App;
