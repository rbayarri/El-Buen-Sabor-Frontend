import {ChangeEvent, useContext, useState} from "react";
import {globalContext} from "../../routes/AppRoutes.tsx";
import {User} from "../../models/users/User.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import {settings} from "../../lib/settings.ts";
import {FormFieldWithMessage} from "../FormFieldWithMessage.tsx";
import {Button} from "react-bootstrap";
import {host, showErrorMessages} from "../../lib/fetch.ts";
import swal from "sweetalert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import {ApiResponseError} from "../../models/api-response-error.ts";
import {Method} from "../../types/method.ts";

const EditAccountForm = () => {

    const myContext = useContext(globalContext);
    const location = useLocation();
    const user = location.state?.user as User;
    const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate();

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);
        }
    };

    const handleUpdate = async (formData: FormData) => {

        const requestOptions: RequestInit = {
            method: "PUT" as Method,
            headers: {
                "Authorization": "Bearer " + myContext.userContext.jwt
            },
            body: formData,
            redirect: 'follow'
        };
        try {
            const response = await fetch(`${host}/users`, requestOptions);
            if (response.status == 200 || response.status == 201) {
                swal("Cambios guardados", "", "success");
                navigate("/cuenta")
            } else {
                showErrorMessages(await response.json() as ApiResponseError);
            }
        } catch (e) {
            swal("Error", "Error de conexión", "error");
        }
    }

    return (
        <>
            <h1 className="fs-2 mt-3 mt-md-0">Mi cuenta</h1>
            <div className="d-flex flex-column flex-sm-row">
                <div className="d-flex flex-column flex-align-center mt-4 mb-3 col-12 col-sm-6 text-center pe-0 pe-sm-5">
                    <h2 className="fs-5 fw-bold">Datos personales</h2>
                    <Formik initialValues={{
                        name: user.name,
                        lastName: user.lastName,
                        username: user.username,
                        imageUrl: user.image ? user.image.location : "",
                    }}
                            validationSchema={Yup.object().shape({
                                name: Yup.string().required("Campo requerido"),
                                lastName: Yup.string().required("Campo requerido"),
                                username: Yup.string().required("Campo requerido"),
                                imageUrl: Yup.string().optional()
                            })}
                            onSubmit={async (values) => {

                                const formdata = new FormData();

                                const body = {
                                    name: values.name,
                                    lastName: values.lastName,
                                    username: values.username
                                }

                                const updateUserBlob = new Blob([JSON.stringify(body)], {type: 'application/json'});
                                formdata.append("user", updateUserBlob);
                                if (file) {
                                    //const fileBlob = new Blob([file], {type: 'multipart/form-data'});
                                    formdata.append('image', file);
                                } else if (values.imageUrl) {
                                    //const urlBlob = new Blob([values.imageUrl], {type: 'multipart/form-data'});
                                    formdata.append("imageUrl", values.imageUrl);
                                }

                                handleUpdate(formdata);
                            }}
                    >{({errors, touched}) =>
                        <Form className={""}>
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
                            <FormFieldWithMessage type={"text"}
                                                  classes={"form-control mt-3"}
                                                  id={"username"}
                                                  placeholder={"Correo electrónico"}
                                                  error={errors.username}
                                                  touched={touched.username}/>
                            <FormFieldWithMessage type={"text"}
                                                  classes={"form-control mt-3"}
                                                  id={"imageUrl"}
                                                  placeholder={"Url de imagen"}
                                                  error={errors.imageUrl}
                                                  touched={touched.imageUrl}/>
                            <form className={"mb-3"}>
                                <label className={"mt-2"}>Subir imagen</label>
                                <div className="d-flex position-relative">
                                    <input type="file" accept={"image/*"} className={"form-control form-control-sm"}
                                           onChange={handleFileChange}/>
                                    <AttachFileIcon fontSize={"small"} className={"file-icon"}/>
                                </div>
                            </form>
                            <Button variant="dark" type={"submit"} className={"mt-3"}>
                                Guardar Cambios
                            </Button>
                        </Form>
                    }
                    </Formik>
                </div>
                <div className="d-flex flex-column mt-4 mb-3 col-12 col-sm-6 text-center">
                    <h2 className="fs-5 fw-bold">Cambio de contraseña</h2>
                    <Formik initialValues={{
                        password: "",
                        confirmPassword: ""
                    }}
                            validationSchema={Yup.object().shape({
                                password: Yup.string()
                                    .matches(RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$"),
                                        {message: "La contraseña debe tener al menos:\n • 1 letra minúscula\n • 1 letra mayúscula\n • 1 número\n • 1 caracter especial"})
                                    .required("Contraseña requerida"),
                                confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Las contraseñas no coinciden").required("Campo requerido")

                            })}
                            onSubmit={async (values) => {
                                const body = {
                                    newPassword: values.password
                                }
                                const api = settings.api.users.changePassword;
                                const response = await fetch(`${host}${api.path}`, {
                                    method: api.method,
                                    body: JSON.stringify(body),
                                    headers: {
                                        "Authorization": `Bearer ${myContext.userContext.jwt}`,
                                        "Content-Type": "application/json"
                                    }
                                });
                                if (response.ok) {
                                    swal("Contraseña cambiada", "", "success");
                                    navigate("/cuenta");
                                } else {
                                    swal("Error al cambiar la contraseña", "", "error");
                                }
                            }}
                    >{({errors, touched}) =>
                        <Form className={""}>
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
                            <Button variant="dark" type={"submit"} className={"mt-3"}>
                                Cambiar Contraseña
                            </Button>
                        </Form>
                    }
                    </Formik>
                </div>
            </div>
        </>
    );
};

export default EditAccountForm;