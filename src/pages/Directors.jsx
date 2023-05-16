import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import DirectorCard from '../components/Directors/DirectorCard';
import DirectorForm from '../components/Directors/DirectorForm';
import getOneProperty from '../utils/getOneProperty';

const Directors = () => {

    const directors = useSelector(state => state.directors);

    const [showDirectorsForm, setShowDirectorsForm] = useState(false);
    const [directorSelected, setDirectorSelected] = useState(null);
    const [ directorsFiltered, setDirectorsFiltered ] = useState([]);
    useEffect(() => setDirectorsFiltered(directors), [directors]);

    const nationalities = getOneProperty(directors, "nationality");
    
    const filterNationality = nationality => {
        const filtered = directors.filter(
            actor => actor.nationality === nationality
        );
        setDirectorsFiltered(filtered);
    }

    const selectDirector = director => {
        setDirectorSelected(director);
        setShowDirectorsForm(true);
    }

    const closeForm = () => {
        setDirectorSelected(null);
        setShowDirectorsForm(false);
    }

    return (
        <>
            <Row>
                <Col md={3} xl={2}>
                    <h4>Filter by nationality</h4>
                    <ul>
                        {nationalities.map(nationality => (
                            <li
                                className='filter-option'
                                key={nationality}
                                onClick={() => filterNationality(nationality)}
                            >
                                {nationality}
                            </li>
                        ))}
                    </ul>
                </Col>
                <Col>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                        <h1>Directors</h1>
                        <Button
                            variant="success"
                            onClick={() => setShowDirectorsForm(true)}
                        >
                            Add director
                        </Button>
                    </div>
                    <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                        {directorsFiltered.map((director) => (
                            <DirectorCard director={director} key={director.id} selectDirector={selectDirector} />
                        ))}
                    </Row>
                </Col>
            </Row>
            <DirectorForm
                show={showDirectorsForm}
                handleClose={closeForm}
                directorSelected={directorSelected}
            />
        </>
    );
};

export default Directors;