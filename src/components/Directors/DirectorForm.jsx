import React, { useEffect, useState } from 'react';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addDirectorThunk, updateDirectorThunk } from '../../store/slices/directors.slice';
import EmptyImg from '../EmptyImg';
import ModalForm from '../ModalForm';

const defaultDirector = { firstName: "", lastName: "", birthday: "", nationality: "", image: "" }

const DirectorsForm = ({ show, handleClose, directorSelected }) => {

    const [ director, setDirector ] = useState(defaultDirector);

    useEffect(() => {
        if(directorSelected) setDirector(directorSelected);
        else setDirector(defaultDirector)
    }, [directorSelected])

    const editDirector = (field, value) => setDirector({...director, [field]: value});

    const dispatch = useDispatch();

    const saveDirector = () => {
        if(!directorSelected)dispatch(addDirectorThunk(director))
        else dispatch(updateDirectorThunk(directorSelected.id, director));
        handleClose();
        setDirector(defaultDirector)
    }

    return (
        <ModalForm
            show={show}
            handleClose={handleClose}
            title="Directors form"
            save={saveDirector}
        >
            <Form>
                <Row className="mb-3">
                    <Col xs={9}>
                        <FloatingLabel label="Image URL">
                            <Form.Control
                                required 
                                placeholder="Image URL" 
                                value={director.image}
                                onChange={e => editDirector("image", e.target.value)}
                            />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <EmptyImg src={director.image}/>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <FloatingLabel label="First name">
                            <Form.Control
                                required 
                                placeholder="First name" 
                                value={director.firstName}
                                onChange={e => editDirector("firstName", e.target.value)}
                            />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel label="Last name">
                            <Form.Control
                                required 
                                placeholder="Last name" 
                                value={director.lastName}
                                onChange={e => editDirector("lastName", e.target.value)}
                            />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className="mb-3" >
                    <Col>
                        <FloatingLabel label="Nationality">
                            <Form.Control
                                required
                                placeholder="Nationality" 
                                value={director.nationality}
                                onChange={e => editDirector("nationality", e.target.value)}
                            />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel label="Birthday">
                            <Form.Control
                                required 
                                type="date" 
                                placeholder="Birthday" 
                                value={director.birthday}
                                onChange={e => editDirector("birthday", e.target.value)}
                            />
                        </FloatingLabel>
                    </Col>
                </Row>
            </Form>

        </ModalForm>
    );
};

export default DirectorsForm;