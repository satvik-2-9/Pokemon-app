import React from 'react'
/* again destructuring it for a pokemon */
export default function PokemonList({pokemon}) {
    return (
        <div>
            {pokemon.map(p => {
                return(
                <div key={p}>{p}</div>
                )
            })}
        </div>
    )
}
/* also in react whenever we are mapping through an array and creating an html element
we need to give every element a unique key which can be anything but has to be unique to ever element. */


