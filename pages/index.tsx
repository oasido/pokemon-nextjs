import { Container, createStyles, Input, Text, SimpleGrid } from '@mantine/core';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import { Pokemons } from '@components/Pokemons';

const useStyles = createStyles((theme) => ({
  input: {
    width: '100%',
    marginTop: '1rem',
    marginBottom: '2rem',
  },

  card: {
    padding: '2rem',
    border: '2px solid black',
    borderRadius: '0.5rem',

    ':hover': {
      backgroundColor: theme.colors.dark[5],
    },
  },
}));

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

const fetchPokemons = async () => {
  const response = await axios.get('http://localhost:3000/api/');
  const data = await response.data;
  return data;
};

export const getServerSideProps = async () => {
  return {
    props: {
      initialPokemon: await fetchPokemons(),
    },
  };
};

const Home = ({ initialPokemon }: { initialPokemon: Pokemon[] }) => {
  const [filter, setFilter] = useState<string>('');
  const { classes } = useStyles();

  const { data: pokemon } = useQuery(['pokemon'], fetchPokemons, {
    initialData: initialPokemon,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const filteredPokemons = useMemo(
    () => pokemon.filter((p: Pokemon) => p.name.toLowerCase().includes(filter.toLowerCase())),
    [filter, pokemon]
  );

  return (
    <Container>
      <Input
        size="lg"
        className={classes.input}
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setFilter(evt.target.value)}
        value={filter}
      />
      <Pokemons pokemons={filteredPokemons} />
    </Container>
  );
};

export default Home;
