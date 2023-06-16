import {Form, Formik} from "formik";
import {FormFieldWithMessage} from "../FormFieldWithMessage.tsx";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import * as Yup from 'yup';
import {Registration} from "../../models/auth/registration.ts";
import {useContext} from "react";
import {globalContext} from "../../routes/AppRoutes.tsx";
import {settings} from "../../lib/settings.ts";
import {doRequest} from "../../lib/fetch.ts";
import {Token} from "../../models/auth/token.ts";
import {getUserFromCookie, saveTokenCookie} from "../../lib/cookies.ts";

const FormSignup = () => {

    const myContext = useContext(globalContext);

    const navigation = useNavigate();

    const {path, method} = settings.api.auth.registration;

    const initRegistration: Registration = {
        name: "",
        lastName: "",
        username: "",
        password: "",
        confirmPassword: "",
    }

    const registrationValidator = Yup.object().shape(
        {
            name: Yup.string().required("Nombre es requerido"),
            lastName: Yup.string().required("Apellido es requerido"),
            username: Yup.string().email("Correo electrónico no válido").required("Correo electrónico requerido"),
            password: Yup.string()
                .matches(RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$"),
                    {message: "La contraseña debe tener al menos:\n • 1 letra minúscula\n • 1 letra mayúscula\n • 1 número\n • 1 caracter especial"})
                .required("Contraseña requerida"),
            confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Las contraseñas no coinciden").required("Campo requerido")
        });


    return (
        <Formik initialValues={initRegistration}
                validationSchema={registrationValidator}
                onSubmit={async (values, {setSubmitting}) => {

                    const body = {...values, role: "USER"}
                    const response = await doRequest<Token>({path, method, body: body});
                    if (response) {
                        const {token} = response as Token;
                        saveTokenCookie(token);
                        const userFromCookie = getUserFromCookie();
                        if (userFromCookie) {
                            userFromCookie.onChange = myContext.userContext.onChange;
                            if (myContext.userContext.onChange !== undefined) {
                                myContext.userContext.onChange(userFromCookie);
                            }
                        }
                        setSubmitting(false);
                        navigation("/");
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
                    <Button variant="primary" type={"submit"} className={"d-block w-100 mt-3"}
                            disabled={(isSubmitting)}>
                        Registrarse
                    </Button>
                    <p className="mb-3 my-2 text-center">
                        ¿Ya tienes una cuenta?{" "}
                        <Link to="/login" className="text-primary fw-bold">
                            Ingresar
                        </Link>
                    </p>
                </Form>
            )}
        </Formik>
    );
};

export default FormSignup;
