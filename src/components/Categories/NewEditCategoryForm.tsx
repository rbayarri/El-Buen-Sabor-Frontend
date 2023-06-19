import {useContext, useEffect, useState} from "react";
import {globalContext} from "../../routes/AppRoutes.tsx";
import {NewEditCategory} from "../../models/categories/new-edit-category.ts";
import {Link, useNavigate} from "react-router-dom";
import {doRequest} from "../../lib/fetch.ts";
import {settings} from "../../lib/settings.ts";
import {EntityReference} from "../../models/entity-reference.ts";
import {Field, Form, Formik} from "formik";
import {Method} from "../../types/method.ts";
import {Button, FloatingLabel} from "react-bootstrap";
import {FormFieldWithMessage} from "../FormFieldWithMessage.tsx";
import * as Yup from "yup";
import swal from 'sweetalert';

export const NewEditCategoryForm = (props: { target: string, category: NewEditCategory, found: boolean }) => {

    const myContext = useContext(globalContext);
    const [posibleParents, setPosibleParents] = useState<EntityReference[]>();
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const {target, category, found} = props;

    const categoryForm = {
        name: category.name,
        container: category.container,
        active: category.active,
        parent: category.parent ? (category.parent as EntityReference).id : "0"
    }


    const getParents = async () => {
        let parentApiSettings;
        if (target === "productos") {
            parentApiSettings = settings.api.categories.posibleProductCategoryParents;
        } else {
            parentApiSettings = settings.api.categories.posibleIngredientCategoryParents;
        }
        const parents = await doRequest<EntityReference[]>({
            path: parentApiSettings.path,
            method: parentApiSettings.method,
            jwt: myContext.userContext.jwt
        });
        if (parents) {
            setPosibleParents(parents);
            setIsLoading(false);
        }
    }

    useEffect((() => {
        getParents();
    }), [target]);

    return (
        <>
            {isLoading ? <h1>Loading...</h1> : (
                <>
                    <Formik
                        initialValues={categoryForm}
                        validationSchema={Yup.object().shape(
                            {
                                name: Yup.string().required("Nombre es requerido"),
                                active: Yup.bool().required(),
                                container: Yup.bool().required(),
                                parent: Yup.string().required()
                            })}
                        onSubmit={async (values) => {

                            const body: NewEditCategory = {
                                name: values.name,
                                active: values.active,
                                container: values.container,
                            };

                            if (values.parent !== "0") {
                                body.parent = {
                                    id: values.parent
                                }
                            }

                            let path: string;
                            let method: Method;
                            if (found) {
                                path = settings.api.categories.editCategory.path + "/" + category.id;
                                method = settings.api.categories.editCategory.method;
                            } else {
                                if (target === "ingredientes") {
                                    path = settings.api.categories.newIngredientCategory.path;
                                    method = settings.api.categories.newIngredientCategory.method;
                                } else {
                                    path = settings.api.categories.newProductCategory.path;
                                    method = settings.api.categories.newProductCategory.method;
                                }
                            }

                            const result = await doRequest({path, method, body: body, jwt: myContext.userContext.jwt});

                            if (result) {
                                await swal("Guardado con éxito", "", "success");
                                navigate(`/rubros/${target}`);
                            }
                        }}>
                        {({
                              errors,
                              touched,
                          }) => (
                            <Form className={"p-2"}>
                                <FloatingLabel
                                    controlId="name"
                                    label="Nombre"
                                    className="mb-3"
                                >
                                    <FormFieldWithMessage type={"text"}
                                                          classes={"form-control mt-3"}
                                                          id={"name"}
                                                          placeholder={"Nombre"}
                                                          error={errors.name}
                                                          touched={touched.name}/>
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="container"
                                    label="Final"
                                    className="mb-3"
                                >
                                    <Field as="select"
                                           name="container"
                                           className={"form-select mt-3"}
                                           id={"container"}
                                           error={errors.container}
                                           defaultValue={category.container}
                                    >
                                        <option key={1} value="false">Si</option>
                                        <option key={2} value="true">No</option>
                                    </Field>
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="active"
                                    label="Activo"
                                    className="mb-3"
                                >
                                    <Field as="select"
                                           name="active"
                                           className={"form-select mt-3"}
                                           id={"active"}
                                           error={errors.active}
                                           defaultValue={category.active}
                                    >
                                        <option key={1} value="true">Si</option>
                                        <option key={2} value="false">No</option>
                                    </Field>
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="parent"
                                    label="Rubro padre"
                                    className="mb-3"
                                >
                                    <Field as="select"
                                           name="parent"
                                           className={"form-select mt-3"}
                                           id={"parent"}
                                           error={errors.parent}
                                    >
                                        <option key={0} value="0">Seleccione
                                        </option>
                                        {posibleParents?.map(pp => {
                                            return (<option key={pp.id} value={pp.id}>{pp.name}</option>)
                                        })}
                                    </Field>
                                </FloatingLabel>

                                <Link to={`/rubros/${target}`} className={"btn btn-danger mt-3 me-2"}>Cancelar</Link>
                                <Button variant={found ? "dark" : "success"} type={"submit"} className={"mt-3"}>
                                    {found ? "Modificar" : "Nuevo"}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </>
            )}
        </>
    );
}