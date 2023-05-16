const searchAndFormatMovie = (movies, id) => {

    const movie = movies.find(movie => movie.id === id);
    const genres = movie.genres?.map(genre => genre.id) || []
    const actors = movie.actors?.map(actors => actors.id) || []
    const directors = movie.directors?.map(directors => directors.id) || []

    return {...movie, genres, actors, directors};
};

export default searchAndFormatMovie;