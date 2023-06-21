import {User} from "../../models/users/User.ts";
import {Link} from "react-router-dom";
import {translateRole} from "../../lib/role-transate.ts";
import {Role} from "../../types/role.ts";

const UsersTable = (props: { users: User[] }) => {

    const users = props.users;

    return (
        <>
            {users.length === 0 ? <p>No hay registros</p> : (
                <table className="table" style={{textAlign: "center"}}>
                    <thead>
                    <tr className="table-dark">
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Rol</th>
                        <th scope="col">Correo Electrónico</th>
                        <th scope="col">Activo</th>
                        <th scope="col">Correo confirmado</th>
                        <th scope="col">Primera vez</th>
                        <th scope="col">Acción</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((u, index) => (
                        <tr key={index}>
                            <td>{u.name}</td>
                            <td>{u.lastName}</td>
                            <td>{translateRole(u.role as Role)}</td>
                            <td>{u.username}</td>
                            <td>{u.active ? "Si" : "No"}</td>
                            <td>{u.emailConfirmed ? "Si" : "No"}</td>
                            <td>{u.firstTimeAccess ? "Si" : "No"}</td>
                            <td>
                                <Link to={`/usuarios/${u.id}`}
                                      className="btn btn-primary"
                                      style={
                                          {
                                              "--bs-btn-padding-y": ".25rem",
                                              "--bs-btn-padding-x": ".7rem",
                                              "--bs-btn-font-size": ".75rem",
                                              marginRight: "1rem",
                                              width: "5rem",
                                          } as any
                                      }>Editar</Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default UsersTable;