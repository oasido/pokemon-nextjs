import { createStyles, SimpleGrid, Container, Title, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';

const useStyles = createStyles((theme) => ({
  container: {
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

export interface Pokemon {
  id: number;
  name: string;
  image: string;
}

export const Pokemons = ({ pokemons }: { pokemons: Pokemon[] }) => {
  const { classes } = useStyles();

  return (
    <SimpleGrid
      cols={4}
      breakpoints={[
        { maxWidth: 980, cols: 3, spacing: 'md' },
        { maxWidth: 755, cols: 2, spacing: 'sm' },
        { maxWidth: 600, cols: 1, spacing: 'sm' },
      ]}
      className={classes.container}
    >
      {pokemons.slice(0, 20).map(({ id, name, image }: Pokemon) => {
        return (
          <div key={id} className={classes.card}>
            <Image src={`/${image}`} width="200" height="200" alt={`${name}-image`} />
            <Text align="center" size="xl">
              {name}
            </Text>
          </div>
        );
      })}
    </SimpleGrid>
  );
};
