import {Form, Formik} from "formik";
import {FormFieldWithMessage} from "../FormFieldWithMessage.tsx";
import {Button} from "react-bootstrap";
import * as Yup from "yup";
import {host} from "../../lib/fetch.ts";
import swal from "sweetalert";
import {settings} from "../../lib/settings.ts";
import {useNavigate} from "react-router-dom";

const ResetPasswordForm = (props: { userId: string | undefined, tokenId: string | undefined }) => {

    const navigate = useNavigate();
    const {userId, tokenId} = props;

    const validator = Yup.object().shape(
        {
            password: Yup.string()
                .matches(RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$"),
                    {message: "La contraseña debe tener al menos:\n • 1 letra minúscula\n • 1 letra mayúscula\n • 1 número\n • 1 caracter especial"})
                .required("Contraseña requerida"),
            confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Las contraseñas no coinciden").required("Campo requerido")
        });

    return (
        <Formik initialValues={{password: "", confirmPassword: ""}}
                validationSchema={validator}
                onSubmit={async (values) => {

                    const api = settings.api.auth.resetPassword;

                    const body = {
                        newPassword: values.password
                    };
                    const response = await fetch(`${host}${api.path}/${userId}/${tokenId}`,
                        {
                            method: "POST",
                            body: JSON.stringify(body),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        });

                    if (response.status == 200 || response.status == 201) {
                        swal(await response.text(), "", "success");
                        navigate("/")
                    } else {
                        swal(await response.text(), "", "error");
                    }
                }}>
            {({
                  errors,
                  touched,
                  isSubmitting,
              }) => (
                <Form className={"p-2"}>
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
                        Cambiar Contraseña
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default ResetPasswordForm;