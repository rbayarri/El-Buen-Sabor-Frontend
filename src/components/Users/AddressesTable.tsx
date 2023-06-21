import {Address} from "../../models/users/address.ts";
import {Table} from "react-bootstrap";
import {Link} from "react-router-dom";

const AddressesTable = (props: { addresses: Address[] }) => {

    const addresses = props.addresses;

    return (

        <Table striped bordered hover size="sm" responsive className="small">
            <thead className='table-dark'>
            <tr>
                <th className=''>Calle</th>
                <th className='text-center'>Número</th>
                <th className='text-center d-none d-xl-table-cell'>Piso</th>
                <th className='text-center d-none d-xl-table-cell'>Apartamento</th>
                <th className='text-center'>CP</th>
                <th className='d-none d-xl-table-cell'>Detalles</th>
                <th className='text-center'>Activo</th>
                <th className='text-center'>Predeterminado</th>
                <th className='text-center'>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {addresses.map(add => {
                return (
                    <tr key={add.id}>
                        <td className="">{add.street}</td>
                        <td className="text-center">{add.number}</td>
                        <td className="text-center d-none d-xl-table-cell">{add.floor}</td>
                        <td className="text-center d-none d-xl-table-cell">{add.apartment}</td>
                        <td className="text-center">{add.zipCode}</td>
                        <td className="d-none d-xl-table-cell">{add.details}</td>
                        <td className="text-center">{add.active ? "Si" : "No"}</td>
                        <td className="text-center">{add.predetermined ? "Si" : "No"}</td>
                        <td className="text-center">
                            <Link to={`/direcciones/${add.id}`} className="btn btn-primary btn-sm">Editar</Link>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </Table>
    );
}
export default AddressesTable;