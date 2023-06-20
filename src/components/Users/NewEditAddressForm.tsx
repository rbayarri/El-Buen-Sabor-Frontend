import {Address} from "../../models/users/address.ts";
import * as Yup from "yup";
import {Button} from "react-bootstrap";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import {settings} from "../../lib/settings.ts";
import {doRequest} from "../../lib/fetch.ts";
import swal from "sweetalert";
import {useContext} from "react";
import {globalContext} from "../../routes/AppRoutes.tsx";

const NewEditAddressForm = (props: { address: Address | undefined }) => {

    const myContext = useContext(globalContext);
    const navigate = useNavigate();

    const emptyAddress: Address = {
        street: "",
        number: "",
        floor: "",
        apartment: "",
        zipCode: "",
        details: "",
        active: true,
        predetermined: false
    }
    const found = !!props.address;
    const address = props.address ? props.address : emptyAddress;

    const handleSave = async (body: object) => {
        const api = settings.api.addresses.save;
        const response = await doRequest<Address>({
            path: api.path,
            method: api.method,
            body: body,
            jwt: myContext.userContext.jwt
        });
        if (response) {
            swal("Dirección guardada", "", "success");
            navigate("/direcciones")
        }
    }

    const handleUpdate = async (body: object) => {
        const api = settings.api.addresses.update;
        const response = await doRequest<Address>({
            path: api.path + "/" + address.id,
            method: api.method,
            body: body,
            jwt: myContext.userContext.jwt
        });
        if (response) {
            swal("Dirección guardada", "", "success");
            navigate("/direcciones")
        }
    }

    return (
        <Formik
            initialValues={address}
            validationSchema={Yup.object().shape({
                id: Yup.string().optional(),
                street: Yup.string().required("Campo requerido"),
                number: Yup.string().required("Campo requerido"),
                floor: Yup.string().optional(),
                apartment: Yup.string().optional(),
                zipCode: Yup.string().required("Campo requerido"),
                details: Yup.string().optional(),
                active: Yup.boolean().required("Campo requerido"),
                predetermined: Yup.boolean().required("Campo requerido"),
            })}
            onSubmit={(values) => {

                const {id, ...body} = values;
                found ? handleUpdate(body) : handleSave(values);

            }}>
            {
                <Form className="col-12 col-md-6">
                    <label className="form-label form-label-sm">Calle</label>
                    <Field className={"form-control form-control-sm"}
                           id={"street"}
                           type={"text"}
                           name={"street"}/>
                    <div className="invalid-feedback d-block" style={{whiteSpace: "pre-wrap"}}>
                        <ErrorMessage name={"street"}/>
                    </div>
                    <div>
                        <label className="form-label form-label-sm">Número</label>
                        <Field className={"form-control form-control-sm"}
                               id={"number"}
                               type={"text"}
                               name={"number"}/>
                        <div className="invalid-feedback d-block" style={{whiteSpace: "pre-wrap"}}>
                            <ErrorMessage name={"number"}/>
                        </div>
                    </div>
                    <div>
                        <label className="form-label form-label-sm">Piso</label>
                        <Field className={"form-control form-control-sm"}
                               id={"floor"}
                               type={"text"}
                               name={"floor"}/>
                        <div className="invalid-feedback d-block" style={{whiteSpace: "pre-wrap"}}>
                            <ErrorMessage name={"floor"}/>
                        </div>
                    </div>
                    <div>
                        <label className="form-label form-label-sm">Apartamento</label>
                        <Field className={"form-control form-control-sm"}
                               id={"apartment"}
                               type={"text"}
                               name={"apartment"}/>
                        <div className="invalid-feedback d-block" style={{whiteSpace: "pre-wrap"}}>
                            <ErrorMessage name={"apartment"}/>
                        </div>
                    </div>
                    <div>
                        <label className="form-label form-label-sm">Código Postal</label>
                        <Field className={"form-control form-control-sm"}
                               id={"zipCode"}
                               type={"text"}
                               name={"zipCode"}/>
                        <div className="invalid-feedback d-block" style={{whiteSpace: "pre-wrap"}}>
                            <ErrorMessage name={"zipCode"}/>
                        </div>
                    </div>
                    <div>
                        <label className="form-label form-label-sm">Detalles</label>
                        <Field className={"form-control form-control-sm"}
                               id={"details"}
                               type={"text"}
                               name={"details"}/>
                        <div className="invalid-feedback d-block" style={{whiteSpace: "pre-wrap"}}>
                            <ErrorMessage name={"details"}/>
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
                    <Link to={`/direcciones`} className={"btn btn-danger mt-3 me-2"}>Cancelar</Link>
                    <Button variant={found ? "dark" : "success"} type={"submit"} className={"mt-3"}>
                        {found ? "Modificar" : "Nuevo"}
                    </Button>
                </Form>
            }
        </Formik>
    );

}

export default NewEditAddressForm;