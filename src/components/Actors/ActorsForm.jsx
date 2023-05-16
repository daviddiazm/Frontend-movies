import React, { useEffect, useState } from 'react';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addActor, addActorThunk, updateActorThunk } from '../../store/slices/actors.slice';
import EmptyImg from '../EmptyImg';
import ModalForm from '../ModalForm';

const defaultActor = { firstName: "", lastName: "", birthday: "", nationality: "", image: "" }

const ActorsForm = ({ show, handleClose, actorSelected }) => {

    const [ actor, setActor ] = useState(defaultActor);

    useEffect(() => {
        if(actorSelected) setActor(actorSelected);
        else setActor(defaultActor)
    }, [actorSelected])

    const editActor = (field, value) => setActor({...actor, [field]: value});

    const dispatch = useDispatch();

    const saveActor = () => {
        if(!actorSelected)dispatch(addActorThunk(actor))
        else dispatch(updateActorThunk(actorSelected.id, actor));
        handleClose();
        setActor(defaultActor)
    }

    return (
        <ModalForm
            show={show}
            handleClose={handleClose}
            title="Actors form"
            save={saveActor}
        >
            <Form>
                <Row className="mb-3">
                    <Col xs={9}>
                        <FloatingLabel label="Image URL">
                            <Form.Control
                                required 
                                placeholder="Image URL" 
                                value={actor.image}
                                onChange={e => editActor("image", e.target.value)}
                            />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <EmptyImg src={actor.image}/>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <FloatingLabel label="First name">
                            <Form.Control
                                required 
                                placeholder="First name" 
                                value={actor.firstName}
                                onChange={e => editActor("firstName", e.target.value)}
                            />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel label="Last name">
                            <Form.Control
                                required 
                                placeholder="Last name" 
                                value={actor.lastName}
                                onChange={e => editActor("lastName", e.target.value)}
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
                                value={actor.nationality}
                                onChange={e => editActor("nationality", e.target.value)}
                            />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel label="Birthday">
                            <Form.Control
                                required 
                                type="date" 
                                placeholder="Birthday" 
                                value={actor.birthday}
                                onChange={e => editActor("birthday", e.target.value)}
                            />
                        </FloatingLabel>
                    </Col>
                </Row>
            </Form>

        </ModalForm>
    );
};

export default ActorsForm;