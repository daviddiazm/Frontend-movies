import React, { useEffect, useState } from 'react';
import { Button, Card, Col, FloatingLabel, Form, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ActorsForm from '../components/Actors/ActorsForm';
import DirectorsForm from '../components/Directors/DirectorForm';
import EmptyImg from '../components/EmptyImg';
import GenresModal from '../components/Genres/GenresModal';
import ItemsSelect from '../components/ItemsSelect';
import { addMovieThunk, updateMovieThunk } from '../store/slices/movies.slice';
import searchAndFormatMovie from '../utils/searchAndFormatMovie';

const defaultMovie = {
    name: "", image: "", synopsis: "", releaseDate: "", genres: [], directors: [], actors: []
}

const MovieForm = () => {

    const { genres, actors, directors, movies } = useSelector(state => state);

    const { id } = useParams();

    useEffect(() => {
        if (id && movies.length) setMovie(searchAndFormatMovie(movies, +id))
    }, [id, movies])

    const [movie, setMovie] = useState(defaultMovie);
    const editMovie = (field, value) => setMovie({ ...movie, [field]: value });
    
    const [showForm, setShowForm] = useState({ genres: false, actors: false, directors: false });
    const openForm = form => setShowForm({ ...showForm, [form]: true });
    const closeForm = form => setShowForm({ ...showForm, [form]: false });


    const dispatch = useDispatch();

    const navigate = useNavigate();

    const saveMovie = () => {
        if (!id) {
            dispatch(addMovieThunk(movie));
            navigate("/");
        } else {
            dispatch(updateMovieThunk(+id, movie));
            navigate(`/movies/${id}`);
        }
    }

    return (
        <>
            <Row>
                <Col>
                    <FloatingLabel label="Image url" className="mb-4">
                        <Form.Control
                            placeholder='Image url'
                            value={movie.image}
                            onChange={e => editMovie("image", e.target.value)}
                        />
                    </FloatingLabel>
                    <EmptyImg src={movie.image} />
                </Col>
                <Col sm={9} md={8} xl={9}>

                    <input
                        className="movie-name-input mb-5"
                        placeholder="Movie name"
                        value={movie.name}
                        onChange={e => editMovie("name", e.target.value)}
                    />


                    <div className="d-flex justify-content-between align-items-start">
                        <h4>Genres</h4>
                        <Button variant="outline-success" size="sm" onClick={() => openForm("genres")}>
                            Add genre
                        </Button>
                    </div>
                    <ItemsSelect
                        items={genres}
                        itemStructure={genre => <Card.Body>{genre.name}</Card.Body>}
                        itemsSelected={movie.genres}
                        setItemsSelected={e => editMovie("genres", e)}
                    />


                    <FloatingLabel label="Release year" className="mb-4" style={{maxWidth: 200}}>
                        <Form.Control
                            placeholder='Release year'
                            value={movie.releaseYear}
                            onChange={e => editMovie("releaseYear", e.target.value)}
                            type="number"
                        />
                    </FloatingLabel>

                    <FloatingLabel label="Synopsis" className="mt-3">
                        <Form.Control
                            placeholder='Synopsis'
                            as="textarea"
                            type="date"
                            value={movie.synopsis}
                            onChange={e => editMovie("synopsis", e.target.value)}
                            style={{ height: '100px' }}
                        />
                    </FloatingLabel>


                    <div className="d-flex justify-content-between align-items-start mt-4">
                        <h3>Directors</h3>
                        <Button variant="outline-success" size="sm" onClick={() => openForm("directors")}>
                            Add Director
                        </Button>
                    </div>
                    <ItemsSelect
                        items={directors}
                        itemsSelected={movie.directors}
                        setItemsSelected={e => editMovie("directors", e)}
                    />

                    <div className="d-flex justify-content-between align-items-start mt-4">
                        <h3>Actors</h3>
                        <Button variant="outline-success" size="sm" onClick={() => openForm("actors")}>
                            Add actor
                        </Button>
                    </div>
                    <ItemsSelect
                        items={actors}
                        itemsSelected={movie.actors}
                        setItemsSelected={e => editMovie("actors", e)}
                    />
                </Col>
            </Row>
            <div className="options-movie-buttons">
                <Button
                    variant="success"
                    size='lg'
                    onClick={saveMovie}
                >
                    Save movie
                </Button>
            </div>
            <GenresModal show={showForm.genres} handleClose={() => closeForm("genres")} />
            <ActorsForm show={showForm.actors} handleClose={() => closeForm("actors")} />
            <DirectorsForm show={showForm.directors} handleClose={() => closeForm("directors")} />
        </>
    );
};

export default MovieForm;