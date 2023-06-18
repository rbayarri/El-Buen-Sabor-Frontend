import {useContext, useEffect, useState} from "react";
import {Button, FloatingLabel} from "react-bootstrap";
import Ingredient from "../../models/ingredient";
import {globalContext} from "../../routes/AppRoutes.tsx";
import {EntityReference} from "../../models/entity-reference.ts";
import {Link, useNavigate} from "react-router-dom";
import {settings} from "../../lib/settings.ts";
import {doRequest} from "../../lib/fetch.ts";
import {ErrorMessage, Field, Form as FormikForm, Formik} from "formik";
import * as Yup from "yup";
import {measurementUnitData} from "../../lib/measurement-unit.ts";
import swal from "sweetalert";

export default function NewEditIngredientForm(props: { ingredient: Ingredient, found: boolean }) {

    const myContext = useContext(globalContext);
    const [posibleCategories, setPosibleCategories] = useState<EntityReference[]>();
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const {ingredient, found} = props;

    const getPosibleCategories = async () => {
        const api = settings.api.ingredients.findPossibleParents;

        const response = await doRequest<EntityReference[]>({
            path: api.path,
            method: api.method,
            jwt: myContext.userContext.jwt
        });
        if (response) {
            setPosibleCategories(response);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getPosibleCategories();
    }, []);

    const ingredientForm = {
        id: ingredient.id,
        name: ingredient.name,
        category: ingredient.category.id,
        minimumStock: ingredient.minimumStock,
        measurementUnit: ingredient.measurementUnit,
        active: ingredient.active,
        currentStock: ingredient.currentStock,
        lastCost: ingredient.lastCost,
    }

    const measuerementUnitValidation: string[] = measurementUnitData?.map(mu => mu.name);

    const handleSave = async (body: object) => {
        const api = settings.api.ingredients.save;
        const response = await doRequest<Ingredient>({
            path: api.path,
            method: api.method,
            body: body,
            jwt: myContext.userContext.jwt
        });
        if (response) {
            swal("Ingrediente guardado", "", "success");
            navigate("/ingredientes")
        }
    }

    const handleUpdate = async (body: object) => {
        const api = settings.api.ingredients.update;
        const response = await doRequest<Ingredient>({
            path: api.path + "/" + ingredient.id,
            method: api.method,
            body: body,
            jwt: myContext.userContext.jwt
        });
        if (response) {
            swal("Ingrediente guardado", "", "success");
            navigate("/ingredientes")
        }
    }

    const numberInputOnWheelPreventChange = (e: WheelEvent) => {
        // Prevent the input value change
        if (e.target instanceof HTMLInputElement) {
            e.target.blur();
        }

        // Prevent the page/container scrolling
        e.stopPropagation()

        // Refocus immediately, on the next tick (after the current function is done)
        setTimeout(() => {
            if (e.target instanceof HTMLInputElement) {
                e.target.focus();
            }
        }, 0)
    }

    return (
        <>
            {
                isLoading ? <h1>Loading...</h1> : (
                    <Formik
                        initialValues={ingredientForm}
                        validationSchema={Yup.object().shape({
                            id: Yup.string().optional(),
                            name: Yup.string().required("Campo requerido"),
                            category: Yup.string().required("Campo requerido").not(["0"], "Campo requerido"),
                            minimumStock: Yup.number().min(0, "El stock mínimo no puede ser negativo").required("Campo requerido"),
                            measurementUnit: Yup.string().required("Campo requerido").oneOf(measuerementUnitValidation, "Unidad de medida no permitida"),
                            active: Yup.boolean().required("Campo requerido"),
                            currentStock: Yup.number(),
                            lastCost: Yup.number()
                        })}
                        onSubmit={(values) => {

                            const body = {
                                name: values.name,
                                category: {
                                    id: values.category
                                },
                                measurementUnit: values.measurementUnit,
                                minimumStock: values.minimumStock,
                                active: values.active
                            }
                            found ? handleUpdate(body) : handleSave(body);
                        }}>
                        {
                            <FormikForm>
                                <FloatingLabel
                                    controlId="name"
                                    label="Nombre"
                                    className="mb-3"
                                >
                                    <Field className={"form-control mt-3"}
                                           id={"name"}
                                           type={"text"}
                                           placeholder={"Nombre"}
                                           name={"name"}/>
                                    <div className="invalid-feedback d-block" style={{whiteSpace: "pre-wrap"}}>
                                        <ErrorMessage name={"name"}/>
                                    </div>
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="category"
                                    label="Rubro"
                                    className="mb-3"
                                >
                                    <Field
                                        as={"select"}
                                        className={"form-select mt-3"}
                                        id={"category"}
                                        name={"category"}>

                                        <option key={0} value="0">Seleccione..</option>
                                        {posibleCategories?.map(pc => {
                                            return (
                                                <option key={pc.id} value={pc.id}>{pc.name}</option>
                                            )
                                        })}
                                    </Field>
                                    <div className="invalid-feedback d-block" style={{whiteSpace: "pre-wrap"}}>
                                        <ErrorMessage name={"category"}/>
                                    </div>
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="minimumStock"
                                    label="Stock mínimo"
                                    className="mb-3"
                                >
                                    <Field className={"form-control mt-3"}
                                           id={"minimumStock"}
                                           type={"number"}
                                           placeholder={0}
                                           name={"minimumStock"}
                                           onWheel={numberInputOnWheelPreventChange}/>
                                    <div className="invalid-feedback d-block" style={{whiteSpace: "pre-wrap"}}>
                                        <ErrorMessage name={"minimumStock"}/>
                                    </div>
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="measurementUnit"
                                    label="Unidad de medida"
                                    className="mb-3"
                                >
                                    <Field
                                        as={"select"}
                                        className={"form-select mt-3"}
                                        id={"measurementUnit"}
                                        name={"measurementUnit"}
                                        disabled={found}
                                    >
                                        <option key={0} value="0">Seleccione..</option>
                                        {measurementUnitData?.map(mu => {
                                            return (
                                                <option key={mu.name} value={mu.name}>{mu.nombre}</option>
                                            )
                                        })}
                                    </Field>
                                    <div className="invalid-feedback d-block" style={{whiteSpace: "pre-wrap"}}>
                                        <ErrorMessage name={"measurementUnit"}/>
                                    </div>
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
                                    >
                                        <option key={1} value="true">Si</option>
                                        <option key={2} value="false">No</option>
                                    </Field>
                                    <div className="invalid-feedback d-block" style={{whiteSpace: "pre-wrap"}}>
                                        <ErrorMessage name={"active"}/>
                                    </div>
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="currentStock"
                                    label="Stock actual"
                                    className="mb-3"
                                >
                                    <Field className={"form-control mt-3"}
                                           id={"currentStock"}
                                           type={"number"}
                                           name={"currentStock"}
                                           disabled={true}
                                    />
                                    <div className="invalid-feedback d-block" style={{whiteSpace: "pre-wrap"}}>
                                        <ErrorMessage name={"currentStock"}/>
                                    </div>
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="lastCost"
                                    label="Último costo"
                                    className="mb-3"
                                >
                                    <Field className={"form-control mt-3"}
                                           id={"lastCost"}
                                           type={"number"}
                                           name={"lastCost"}
                                           disabled={true}
                                    />
                                    <div className="invalid-feedback d-block" style={{whiteSpace: "pre-wrap"}}>
                                        <ErrorMessage name={"lastCost"}/>
                                    </div>
                                </FloatingLabel>
                                <Link to={`/ingredientes`} className={"btn btn-danger mt-3 me-2"}>Cancelar</Link>
                                <Button variant={found ? "dark" : "success"} type={"submit"} className={"mt-3"}>
                                    {found ? "Modificar" : "Nuevo"}
                                </Button>
                            </FormikForm>
                        }
                    </Formik>
                )
            }
        </>
    );
}
