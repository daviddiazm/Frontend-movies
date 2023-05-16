import React from 'react';
import { Card, Form, ListGroup } from 'react-bootstrap';

const ItemsSelect = ({ items, itemsSelected, setItemsSelected, isMultiple=true, itemStructure }) => {

    const selectMultiple = (id) => {
        // si ya esta seleccionado, no hagas nada
        if(itemsSelected.includes(id)) return
        setItemsSelected([...itemsSelected, id]);
    }

    const selectOne = (id) => setItemsSelected(id);

    const deselectMultiple = id => {
        const itemsFiltered = itemsSelected.filter(artist => artist !== id);
        setItemsSelected(itemsFiltered);
    }

    const deselectOne = () => setItemsSelected(null);


    const selectItem = isMultiple ? selectMultiple : selectOne;

    const deselectItem = isMultiple ? deselectMultiple : deselectOne;

    const structure = item => {
        if(!item) return <></>
        if(itemStructure) return itemStructure(item);
        return <>
            <Card.Img src={item.image} style={{objectFit: "cover"}} />
            <Card.Body>{item.firstName} {item.lastName}</Card.Body>
        </>
    }

    return (
        <div className="items-select">

            <Form.Select className="mb-3" onChange={e => e.target.value && selectItem(+e.target.value)}>
                <option value="">Select an item</option>
                {items.map(item => (
                    <option value={item.id} key={item.id}>{item.name ? item.name : `${item.firstName} ${item.lastName}`}</option>
                ))}
            </Form.Select>

            <ListGroup horizontal className='mb-3' style={{width: "fit-content"}}>
                {
                    isMultiple ? (
                        itemsSelected.map(itemId => {
                            const item = items.find(item => item.id === itemId);
                            return (
                                <div className="form-card-container" key={itemId}>
                                    <button className="delete-button" onClick={() => deselectItem(itemId)}>
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                    <Card
                                        className="form-card"
                                        key={item.id} 
                                    >
                                        {structure(item)}
                                    </Card>
                                </div>
                            )
                        })
                    ) : (
                        <Card className="form-card">
                            {structure(items.find(item => item.id === itemsSelected))}
                        </Card>
                    )
                }
            </ListGroup>
        </div>
    );
};

export default ItemsSelect;