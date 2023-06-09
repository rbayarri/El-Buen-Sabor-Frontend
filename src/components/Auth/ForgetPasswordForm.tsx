import {Link, useNavigate} from "react-router-dom";
import {RequestInformation} from "../../types/request-information.ts";
import {settings} from "../../lib/settings.ts";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import {FormFieldWithMessage} from "../FormFieldWithMessage.tsx";
import {Button} from "react-bootstrap";
import {doRequest} from "../../lib/fetch.ts";
import swal from "sweetalert";

const ForgetPasswordForm = () => {

    const navigation = useNavigate();

    const validation = Yup.object().shape(
        {
            username: Yup.string()
                .email("Correo electrónico no válido")
                .required("Correo electrónico requerido")
        }
    )

    return (<>
            <Formik initialValues={{username: ""}}
                    validationSchema={validation}
                    onSubmit={async (values, {setSubmitting}) => {

                        const body = {
                            username: values.username
                        }

                        const api: RequestInformation = settings.api.auth.forgetPassword;

                        const response = await doRequest<{ message: string }>({
                            path: api.path,
                            method: api.method,
                            body: body
                        });
                        if (response) {
                            swal(response.message, "Revise su correo electrónico para reestablecer su contraseña", "success");
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
                        <p className={"mt-3"}>Mandaremos un correo electrónico con las instrucciones para el
                            restablecimiento de tu clave</p>
                        <Button variant="primary" type={"submit"} className={"d-block w-100 mt-3"}
                                disabled={(isSubmitting)}>
                            Enviar
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

export default ForgetPasswordForm;