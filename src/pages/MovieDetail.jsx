import React, { useMemo } from 'react';
import { Button, Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ActorCard from '../components/Actors/ActorCard';
import ButtonsEditDelete from '../components/ButtonsEditDelete';
import DirectorCard from '../components/Directors/DirectorCard';
import { deleteMovieThunk } from '../store/slices/movies.slice';
import formatDate from '../utils/formatDate';

const MovieDetail = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const movies = useSelector(state => state.movies);
    const movie = useMemo(() => {
        return movies.find(m => m.id === +id)
    }, [movies]);

    if (!movie) return <></>

    const deleteMovie = () => {
        dispatch(deleteMovieThunk(movie.id))
        navigate("/")
    }

    return (
        <>
            <Row>
                <Col sm={3} md={4} xl={3}>
                    <img src={movie.image} alt="" className="img-fluid" />
                </Col>
                <Col>
                    <h1>{movie.name}</h1>
                    <ListGroup horizontal>
                        {movie.genres?.map(genre => (
                            <ListGroup.Item key={genre.id}>
                                {genre.name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <p className="mt-3"><b>Release year:</b> {movie.releaseYear}</p>
                    <p >{movie.synopsis}</p>
                    <h3>Directors</h3>
                    <Row xs={1} sm={2} xl={3} className="g-4">
                        {movie.directors?.map((director) => (
                            <DirectorCard director={director} key={director.id} showOptions={false} />
                        ))}
                    </Row>
                    <h3 className="mt-5">Actors</h3>
                    <Row xs={1} sm={2} xl={3} className="g-4">
                        {movie.actors?.map((actor) => (
                            <ActorCard actor={actor} key={actor.id} showOptions={false} />
                        ))}
                    </Row>
                </Col>
            </Row>
            <div className="options-movie-buttons">
                <ButtonsEditDelete 
                    size="lg" 
                    rounded
                    onDelete={deleteMovie}
                    onUpdate={() => navigate(`/movies/update/${movie.id}`)}
                />
            </div>
        </>
    );
};

export default MovieDetail;