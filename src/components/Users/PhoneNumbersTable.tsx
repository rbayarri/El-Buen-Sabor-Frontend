import {PhoneNumber} from "../../models/users/phone-number.ts";
import {Table} from "react-bootstrap";
import {Link} from "react-router-dom";

const PhoneNumbersTable = (props: { phoneNumbers: PhoneNumber[] }) => {
    const phoneNumbers = props.phoneNumbers;

    return (

        <Table striped bordered hover size="sm" responsive className="small">
            <thead className='table-dark'>
            <tr>
                <th className='text-center'>Código de área</th>
                <th className='text-center'>Teléfono</th>
                <th className='text-center'>Activo</th>
                <th className='text-center'>Predeterminado</th>
                <th className='text-center'>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {phoneNumbers.map(pn => {
                return (
                    <tr key={pn.id}>
                        <td className="text-center">{pn.areaCode}</td>
                        <td className="text-center">{pn.phoneNumber}</td>
                        <td className="text-center">{pn.active ? "Si" : "No"}</td>
                        <td className="text-center">{pn.predetermined ? "Si" : "No"}</td>
                        <td className="text-center">
                            <Link to={`/telefonos/${pn.id}`} className="btn btn-primary btn-sm">Editar</Link>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </Table>
    );
}

export default PhoneNumbersTable;