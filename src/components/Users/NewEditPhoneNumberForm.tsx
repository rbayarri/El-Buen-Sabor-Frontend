import {useContext} from "react";
import {globalContext} from "../../routes/AppRoutes.tsx";
import {Link, useNavigate} from "react-router-dom";
import {settings} from "../../lib/settings.ts";
import {doRequest} from "../../lib/fetch.ts";
import swal from "sweetalert";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {Button} from "react-bootstrap";
import {PhoneNumber} from "../../models/users/phone-number.ts";

const NewEditPhoneNumberForm = (props: { phoneNumber: PhoneNumber | undefined }) => {

    const myContext = useContext(globalContext);
    const navigate = useNavigate();

    const emptyPhoneNumber: PhoneNumber = {
        areaCode: "",
        phoneNumber: "",
        active: true,
        predetermined: false
    }
    const found = !!props.phoneNumber;
    const phoneNumber = props.phoneNumber ? props.phoneNumber : emptyPhoneNumber;

    const handleSave = async (body: object) => {
        const api = settings.api.phoneNumber.save;
        const response = await doRequest<PhoneNumber>({
            path: api.path,
            method: api.method,
            body: body,
            jwt: myContext.userContext.jwt
        });
        if (response) {
            swal("Teléfono guardado", "", "success");
            navigate("/telefonos")
        }
    }

    const handleUpdate = async (body: object) => {
        const api = settings.api.phoneNumber.update;
        const response = await doRequest<PhoneNumber>({
            path: api.path + "/" + phoneNumber.id,
            method: api.method,
            body: body,
            jwt: myContext.userContext.jwt
        });
        if (response) {
            swal("Teléfono guardado", "", "success");
            navigate("/telefonos")
        }
    }

    return (
        <Formik
            initialValues={phoneNumber}
            validationSchema={Yup.object().shape({
                id: Yup.string().optional(),
                areaCode: Yup.string().required("Campo requerido"),
                phoneNumber: Yup.string().required("Campo requerido"),
                active: Yup.boolean().required("Campo requerido"),
                predetermined: Yup.boolean().required("Campo requerido"),
            })}
            onSubmit={(values) => {

                const {id, ...body} = values;
                found ? handleUpdate(body) : handleSave(values);

            }}>
            {
                <Form className="col-12 col-md-6">
                    <label className="form-label form-label-sm">Código de área</label>
                    <Field className={"form-control form-control-sm"}
                           id={"areaCode"}
                           type={"text"}
                           name={"areaCode"}/>
                    <div className="invalid-feedback d-block" style={{whiteSpace: "pre-wrap"}}>
                        <ErrorMessage name={"areaCode"}/>
                    </div>
                    <div>
                        <label className="form-label form-label-sm">Número de teléfono</label>
                        <Field className={"form-control form-control-sm"}
                               id={"phoneNumber"}
                               type={"text"}
                               name={"phoneNumber"}/>
                        <div className="invalid-feedback d-block" style={{whiteSpace: "pre-wrap"}}>
                            <ErrorMessage name={"phoneNumber"}/>
                        </div>
                    </div>
                    <div>
                        <label className="form-label form-label-sm">Activo</label>
                        <Field as="select"
                               name="active"
                               className={"form-select form-select-sm"}
                               id={"active"}
                        >
                            <option key={1} value="true">Si</option>
                            <option key={2} value="false">No</option>
                        </Field>
                        <div className="invalid-feedback d-block" style={{whiteSpace: "pre-wrap"}}>
                            <ErrorMessage name={"active"}/>
                        </div>
                    </div>
                    <div>
                        <label className="form-label form-label-sm">Predeterminado</label>
                        <Field as="select"
                               name="predetermined"
                               className={"form-select form-select-sm"}
                               id={"predetermined"}
                        >
                            <option key={1} value="true">Si</option>
                            <option key={2} value="false">No</option>
                        </Field>
                        <div className="invalid-feedback d-block" style={{whiteSpace: "pre-wrap"}}>
                            <ErrorMessage name={"predetermined"}/>
                        </div>
                    </div>
                    <Link to={`/telefonos`} className={"btn btn-danger mt-3 me-2"}>Cancelar</Link>
                    <Button variant={found ? "dark" : "success"} type={"submit"} className={"mt-3"}>
                        {found ? "Modificar" : "Nuevo"}
                    </Button>
                </Form>
            }
        </Formik>
    );

}

export default NewEditPhoneNumberForm;