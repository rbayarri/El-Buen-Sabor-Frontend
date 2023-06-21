import {ChangeEventHandler, useContext, useEffect, useState} from "react";
import {globalContext} from "../../routes/AppRoutes.tsx";
import {settings} from "../../lib/settings.ts";
import {doRequest} from "../../lib/fetch.ts";
import {User} from "../../models/users/User.ts";
import {Link, Navigate} from "react-router-dom";
import {Form} from "react-bootstrap";
import {Role} from "../../types/role.ts";
import UsersTable from "../../components/Users/UsersTable.tsx";

const UsersPage = () => {

    const myContext = useContext(globalContext);
    const [search, setSearch] = useState<string>("");
    const [roleSearch, setRoleSearch] = useState<string>("ALL");
    const [users, setUsers] = useState<User[]>();
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const getUsers = async () => {

        const api = settings.api.users.findAll;
        const response = await doRequest<User[]>({
            path: api.path,
            method: api.method,
            jwt: myContext.userContext.jwt
        });
        if (response) {
            setUsers(response);
            setFilteredUsers(response);
            setIsLoading(false);
        }
    }

    const nameFilter: ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = event.target.value;
        if (users) {
            const usersFiltered =
                users.filter((u) => u.name.toLowerCase().includes(value.toLowerCase()) && (roleSearch === "ALL" ? true : u.role === roleSearch));
            setFilteredUsers(usersFiltered);
            setSearch(value);
        }
    }

    const roleFilter: ChangeEventHandler<HTMLSelectElement> = (event) => {
        const value = event.target.value;
        if (users) {
            const usersFiltered =
                users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) && (value === "ALL" ? true : u.role === value));
            setFilteredUsers(usersFiltered);
            setRoleSearch(value as Role);
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    if (myContext.userContext.authenticated && myContext.userContext.role === "ADMIN") {
        return (
            <>
                <div className={"my-4 d-flex justify-content-between align-items-center"}>
                    <div className="d-flex align-items-center">
                        <h1>Usuarios</h1>
                        <Link className="btn btn-success ms-3" to={"/usuarios/nuevo"}>Nuevo</Link>
                    </div>
                    <div className={"d-flex align-items-center"}>
                        <span>Filtrar: </span>
                        <Form className="d-flex ms-3">
                            <Form.Control
                                type="search"
                                placeholder="Nombre"
                                value={search}
                                onChange={nameFilter}
                            />
                            <Form.Select
                                className="ms-3"
                                value={roleSearch}
                                onChange={roleFilter}>
                                <option key={"ALL"} value={"ALL"}>Todos</option>
                                <option key={"USER"} value={"USER"}>Usuario</option>
                                <option key={"CASHIER"} value={"CASHIER"}>Cajero</option>
                                <option key={"CHEF"} value={"CHEF"}>Cocinero</option>
                                <option key={"DELIVERY"} value={"DELIVERY"}>Delivery</option>
                                <option key={"ADMIN"} value={"ADMIN"}>Admin</option>
                            </Form.Select>
                        </Form>
                    </div>
                </div>
                {isLoading ? <p>Loading...</p> : (
                    <UsersTable users={filteredUsers}/>
                )}
            </>
        );
    }
    return <Navigate to={"/"}/>
};

export default UsersPage;