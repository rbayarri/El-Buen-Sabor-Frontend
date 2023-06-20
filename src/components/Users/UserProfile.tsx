import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { settings } from '../../lib/settings';
import { doRequest } from '../../lib/fetch';
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from 'react-bootstrap';
import { User } from '../../models/users/User';

export default function UserProfile() {
    const { id } = useParams();
    const [user, setUser] = useState<User>();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const getUser = async (id: string) => {
        const api = settings.api.users.findById;

        const fetchedUser = await doRequest<User>({
            path: api.path + "/" + id,
            method: api.method,

        });
        if (fetchedUser) {
            setUser(fetchedUser);
            setIsLoading(false);
        } else {
            swal("Usuario no encontrado", '', "error")
            navigate('/');
        }
    }

    useEffect((() => {
        if (id) {
            getUser(id);
        }
    }), []);

    return (
        <>
            <Row>
                <Col xs={8} md={6} border="dark" style={{ marginBottom: '15px' }}>                         
                        {user?.image ? (
                            <img className='' src={`${user.image.location}`} alt='' style={{ width: '300px'}}/>
                        ) : (                            
                            <img className='' style={{ width: '300px'}} src='https://telefe-static2.akamaized.net/media/256103/usuario-sin-foto-perfil-whatsapp.jpg?v=20200618170035000&format=main&width=640&height=360&mode=crop' alt='Imagen por defecto' />
                        )}                      
                    <Link className='btn btn-outline-secondary' style={{ placeItems: 'lefth', display: 'grid', width: '200px' }} to={''}>
                        <FontAwesomeIcon icon={faPenToSquare} size="xs" />
                        Editar
                    </Link>
                </Col>
                <Col xs={8} md={4}>
                    <p className=''>Nombre: {user?.name}</p>
                    <p className=''>Apellido: {user?.lastName}</p>
                    <p className=''>Dirección: { }</p>
                    <p className=''>Departamento: { }</p>
                    <p className=''>Telefono: { }</p>
                </Col>
            </Row>
            {isLoading ? <h1>Loading...</h1> : (
                <div className=''>
                    
                </div>
            )}
        </>
    );
}