import {Form, Formik} from "formik";
import {LoginCredentials} from "../../models/auth/login-credentials.ts";
import * as Yup from 'yup';
import {Button} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {FormFieldWithMessage} from "../FormFieldWithMessage.tsx";
import {FormField} from "../FormField.tsx";
import {settings} from "../../lib/settings.ts";
import {doRequest} from "../../lib/fetch.ts";
import {Token} from "../../models/auth/token.ts";
import {getUserFromCookie, saveTokenCookie} from "../../lib/cookies.ts";
import {RequestInformation} from "../../types/request-information.ts";
import {useContext} from "react";
import {globalContext} from "../../routes/AppRoutes.tsx";

const FormLogin = () => {

    const navigation = useNavigate();

    const myContext = useContext(globalContext);

    const api: RequestInformation = settings.api.auth.authentication;

    const initLoginCredentials: LoginCredentials = {password: "", rememberMe: false, username: ""}

    const loginCredentialsValidation = Yup.object().shape(
        {
            username: Yup.string()
                .email("Correo electrónico no válido")
                .required("Correo electrónico requerido"),
            password: Yup.string()
                .matches(RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$"),
                    {message: "La contraseña debe tener al menos:\n • 1 letra minúscula\n • 1 letra mayúscula\n • 1 número\n • 1 caracter especial"})
                .required("Contraseña requerida")
        }
    )

    return (<>
            <Formik initialValues={initLoginCredentials}
                    validationSchema={loginCredentialsValidation}
                    onSubmit={async (values, {setSubmitting}) => {
                        const response = await doRequest<Token>({
                            path: api.path,
                            method: api.method,
                            body: values
                        });
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
                        <FormFieldWithMessage type={"email"}
                                              classes={"form-control"}
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
                        <div className="form-check mt-3">
                            <FormField type={"checkbox"}
                                       classes={"form-check-input"}
                                       id={"rememberMe"}
                                       placeholder={""}/>
                            <label className="form-check-label" htmlFor={"rememberMe"}>
                                Recuérdame
                            </label>
                        </div>
                        <div className="my-3">
                            <Link to={"/forgetPassword"} className={"small"}>Olvidé mi contraseña</Link>
                        </div>
                        <Button variant="primary" type={"submit"} className={"d-block w-100 mt-3"}
                                disabled={(isSubmitting)}>
                            Ingresar
                        </Button>
                        <p className="mb-3 my-2 text-center">
                            ¿No tienes una cuenta?{" "}
                            <Link to="/signup" className="text-primary fw-bold">
                                Regístrate
                            </Link>
                        </p>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default FormLogin;