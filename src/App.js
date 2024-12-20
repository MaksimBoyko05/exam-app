import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://beta.pokeapi.co/graphql/v1beta',
  cache: new InMemoryCache(),
});

const GET_POKEMONS = gql`
  query GetPokemons($limit: Int!) {
    pokemon_v2_pokemon(limit: $limit) {
      id
      name
      height
      weight
    }
  }
`;

const PokemonList = () => {
  const [limit, setLimit] = useState(10);

  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: { limit },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Pokemon List</h1>
      <label>
        Number of Pokemons to Display:
        <input
          type="number"
          value={limit}
          onChange={(e) => setLimit(parseInt(e.target.value, 10))}
        />
      </label>
      <ul>
        {data.pokemon_v2_pokemon.map((pokemon) => (
          <li key={pokemon.id}>
            <strong>{pokemon.name}</strong> (Height: {pokemon.height}, Weight: {pokemon.weight})
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => (
  <ApolloProvider client={client}>
    <PokemonList />
  </ApolloProvider>
);

export default App;
