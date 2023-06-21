import {User} from "../../models/users/User.ts";
import {useContext} from "react";
import {globalContext} from "../../routes/AppRoutes.tsx";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {settings} from "../../lib/settings.ts";
import {doRequest} from "../../lib/fetch.ts";
import {FormFieldWithMessage} from "../FormFieldWithMessage.tsx";
import {Button} from "react-bootstrap";
import swal from "sweetalert";
import {NewEditUser} from "../../models/users/new-edit-user.ts";
import {Role} from "../../types/role.ts";

const NewEditUserForm = (props: { user: User | undefined, found: boolean }) => {

    const {user, found} = props;
    const myContext = useContext(globalContext);
    const navigation = useNavigate();

    let userForm: NewEditUser;

    if (found && user) {
        userForm = {
            name: user.name,
            lastName: user.lastName,
            username: user.username,
            role: user.role as Role,
            active: user.active
        }
    } else {
        userForm = {
            name: "",
            lastName: "",
            username: "",
            password: "",
            confirmPassword: "",
            role: "USER",
            active: true
        }
    }

    const newUserValidation = Yup.object().shape(
        {
            name: Yup.string().required("Nombre es requerido"),
            lastName: Yup.string().required("Apellido es requerido"),
            username: Yup.string().email("Correo electrónico no válido").required("Correo electrónico requerido"),
            password: Yup.string()
                .matches(RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$"),
                    {message: "La contraseña debe tener al menos:\n • 1 letra minúscula\n • 1 letra mayúscula\n • 1 número\n • 1 caracter especial"})
                .required("Contraseña requerida"),
            confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Las contraseñas no coinciden").required("Campo requerido"),
            rol: Yup.string().oneOf(["USER", "CHEF", "CASHIER", "DELIVERY", "ADMIN"], "Rol no válido").optional(),
            active: Yup.boolean().required("Campo requerido")
        });

    const existingUserValidation = Yup.object().shape(
        {
            name: Yup.string().required("Nombre es requerido"),
            lastName: Yup.string().required("Apellido es requerido"),
            username: Yup.string().email("Correo electrónico no válido").required("Correo electrónico requerido"),
            rol: Yup.string().oneOf(["USER", "CHEF", "CASHIER", "DELIVERY", "ADMIN"], "Rol no válido").optional(),
            active: Yup.boolean().required("Campo requerido")
        });


    return (
        <Formik initialValues={userForm}
                validationSchema={found ? existingUserValidation : newUserValidation}
                onSubmit={async (values, {setSubmitting}) => {

                    if (found) {
                        const body = {
                            name: values.name,
                            lastName: values.lastName,
                            role: values.role,
                            username: values.username,
                            active: values.active
                        }
                        const {path, method} = settings.api.users.updateAsAdmin;
                        const response = await doRequest<User>({
                            path: path + "/" + user!.id,
                            method: method,
                            body: body,
                            jwt: myContext.userContext.jwt
                        });
                        if (response) {
                            swal("Usuario modificado", "", "success");
                            navigation("/usuarios")
                        }

                    } else {
                        const body = {
                            name: values.name,
                            lastName: values.lastName,
                            password: values.password,
                            role: values.role,
                            username: values.username
                        }
                        const {path, method} = settings.api.users.save;
                        const response = await doRequest<User>({
                            path,
                            method,
                            body: body,
                            jwt: myContext.userContext.jwt
                        });
                        if (response) {
                            swal("Usuario guardado", "", "success");
                            navigation("/usuarios")
                        }
                    }
                    setSubmitting(false);
                }}>
            {({
                  errors,
                  touched,
                  isSubmitting,
              }) => (
                <Form className={"p-2"}>
                    <FormFieldWithMessage type={"text"}
                                          classes={"form-control mt-3"}
                                          id={"name"}
                                          placeholder={"Nombre"}
                                          error={errors.name}
                                          touched={touched.name}/>
                    <FormFieldWithMessage type={"text"}
                                          classes={"form-control mt-3"}
                                          id={"lastName"}
                                          placeholder={"Apellido"}
                                          error={errors.lastName}
                                          touched={touched.lastName}/>
                    <FormFieldWithMessage type={"email"}
                                          classes={"form-control mt-3"}
                                          id={"username"}
                                          placeholder={"Correo Electrónico"}
                                          error={errors.username}
                                          touched={touched.username}/>
                    {!found && <>
                        <FormFieldWithMessage type={"password"}
                                              classes={"form-control mt-3"}
                                              id={"password"}
                                              placeholder={"Contraseña"}
                                              error={errors.password}
                                              touched={touched.password}/>
                        <FormFieldWithMessage type={"password"}
                                              classes={"form-control mt-3"}
                                              id={"confirmPassword"}
                                              placeholder={"Confirmar contraseña"}
                                              error={errors.confirmPassword}
                                              touched={touched.confirmPassword}/>
                    </>}
                    <Field as="select"
                           className="form-select mt-3"
                           id="role"
                           name="role">
                        <option key="USER" value="USER">Usuario</option>
                        <option key="CASHIER" value="CASHIER">Cajero</option>
                        <option key="CHEF" value="CHEF">Cocinero</option>
                        <option key="DELIVERY" value="DELIVERY">Delivery</option>
                        <option key="ADMIN" value="ADMIN">Admin</option>
                    </Field>
                    <p className="text-danger small"><ErrorMessage name={"role"}/></p>
                    {found &&
                        <>
                            <Field as="select"
                                   className="form-select mt-3"
                                   id="active"
                                   name="active">
                                <option key={"true"} value={"true"}>Si</option>
                                <option key={"false"} value={"false"}>No</option>
                            </Field>
                            <p className="text-danger small"><ErrorMessage name={"active"}/></p>
                        </>
                    }
                    <Button variant="primary" type={"submit"} className={"d-block w-100 mt-3"}
                            disabled={(isSubmitting)}>
                        {found ? "Editar Usuario" : "Crear Usuario"}
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default NewEditUserForm;