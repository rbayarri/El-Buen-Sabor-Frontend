import {ChangeEvent, useContext} from "react";
import {Button} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import Ingredient from "../../models/ingredient";
import {globalContext} from "../../routes/AppRoutes.tsx";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {getMeasurementUnits} from "../../lib/measurement-unit.ts";
import {settings} from "../../lib/settings.ts";
import {doRequest} from "../../lib/fetch.ts";
import swal from "sweetalert";

export default function BuyIngredientForm(props: {
    ingredients: Ingredient[],
    ingredient: Ingredient,
    found: boolean
}) {

    const myContext = useContext(globalContext);
    const {ingredients, ingredient} = props;
    const navigate = useNavigate();

    const purchaseForm = {
        date: new Date().toISOString().substring(0, 10),
        ingredientId: ingredient.id,
        measurementUnit: ingredient.measurementUnit,
        quantity: 0,
        unitCost: 0
    }

    const numberInputOnWheelPreventChange = (e: WheelEvent) => {
        // Prevent the input value change
        if (e.target instanceof HTMLInputElement) {
            e.target.blur()
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
            <Formik
                initialValues={purchaseForm}
                enableReinitialize={true}
                validationSchema={Yup.object().shape({
                    date: Yup.date().max(new Date(), "La fecha de la compra no puede ser posterior a la fecha actual").required("Campo requerido"),
                    ingredientId: Yup.string().not(["0"], "Campo requerido").required("Campo requerido"),
                    measurementUnit: Yup.string().required("Campo requerido").not(["0"], "Unidad no válida"),
                    quantity: Yup.number().min(0.01, "Valor no permitido").required("Campo requerido"),
                    unitCost: Yup.number().min(0.01, "Valor no permitido").required("Campo requerido")
                })}
                onSubmit={async (values) => {

                    const body = {
                        date: values.date,
                        ingredient: {
                            id: values.ingredientId
                        },
                        clientMeasurementUnit: values.measurementUnit,
                        quantity: values.quantity,
                        unitPrice: values.unitCost
                    }
                    const api = settings.api.ingredients.purchase;
                    const response = await doRequest<object>({
                        path: api.path,
                        method: api.method,
                        body: body,
                        jwt: myContext.userContext.jwt
                    });
                    if (response) {
                        swal("Compra guardada", "", "success");
                        navigate("/ingredientes")
                    }
                }}
            >{({values, setFieldValue}) => {
                const ingre = ingredients.find(ing => ing.id === values.ingredientId);
                let measurementUnits: {
                    name: string,
                    nombre: string,
                    other: { name: string, nombre: string }[]
                } | undefined;
                if (ingre) {
                    measurementUnits = getMeasurementUnits(ingre.measurementUnit);
                }
                return <Form>
                    <div>
                        <label htmlFor="ingredient" className="form-label">
                            Ingrediente
                        </label>
                        <div className={"d-flex"}>
                            <Field
                                as={"select"}
                                name={"ingredientId"}
                                id={"ingredientId"}
                                className={"form-select"}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    setFieldValue("ingredientId", e.target.value)
                                    setFieldValue("measurementUnit", "0");
                                }}
                            >
                                <option key={"0"} value={"0"}>Seleccione Ingrediente</option>
                                {ingredients.map(i => (
                                    <option key={i.id} value={i.id}>
                                        {i.name}
                                    </option>
                                ))}
                            </Field>
                            <Link to={"/ingredientes/nuevo"} className={"ms-3 btn btn-success"}>Nuevo</Link>
                        </div>
                        <div className="invalid-feedback d-block mb-3" style={{whiteSpace: "pre-wrap"}}>
                            <ErrorMessage name={"ingredientId"}/>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">
                            Fecha
                        </label>
                        <div className={"d-flex"}>
                            <Field
                                type={"date"}
                                name={"date"}
                                id={"date"}
                                className={"form-control"}>
                            </Field>
                        </div>
                        <div className="invalid-feedback d-block" style={{whiteSpace: "pre-wrap"}}>
                            <ErrorMessage name={"date"}/>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="quantity" className="form-label">
                            Cantidad
                        </label>
                        <Field
                            name="quantity"
                            type="number"
                            className="form-control"
                            id="quantity"
                            onWheel={numberInputOnWheelPreventChange}
                        />
                        <div className="invalid-feedback d-block" style={{whiteSpace: "pre-wrap"}}>
                            <ErrorMessage name={"quantity"}/>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="measurementUnit" className="form-label">
                            Unidad de medida
                        </label>
                        <Field
                            as={"select"}
                            name="measurementUnit"
                            className="form-select"
                            id="measurementUnit"
                            disabled={values.ingredientId === "0"}
                        >
                            <option key={"0"} value={"0"}>Seleccione..</option>
                            <option key={measurementUnits?.name}
                                    value={measurementUnits?.name}>{measurementUnits?.nombre}</option>
                            {measurementUnits?.other.map(mu =>
                                <option key={mu.name} value={mu.name}>{mu.nombre}</option>
                            )}
                        </Field>
                        <div className="invalid-feedback d-block" style={{whiteSpace: "pre-wrap"}}>
                            <ErrorMessage name={"measurementUnit"}/>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="unitCost" className="form-label">
                            Costo Unitario (por unidad de medida)
                        </label>

                        <div className="input-group">
                            <span className="input-group-text">$</span>
                            <Field
                                name="unitCost"
                                type="number"
                                className="form-control"
                                id="unitCost"
                                onWheel={numberInputOnWheelPreventChange}
                            />
                        </div>
                        <div className="invalid-feedback d-block" style={{whiteSpace: "pre-wrap"}}>
                            <ErrorMessage name={"unitCost"}/>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="totalCost" className="form-label">
                            Costo Total
                        </label>
                        <div className="input-group">
                            <span className="input-group-text">$</span>
                            <Field
                                disabled={true}
                                type="number"
                                className="form-control"
                                id="totalCost"
                                value={values.unitCost * values.quantity}
                            />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <Link to={"/ingredientes"} className={"btn btn-danger me-3"}>Cancelar</Link>
                        <Button variant="dark" type={"submit"}>
                            Registrar
                        </Button>
                    </div>
                </Form>;
            }
            }
            </Formik>
        </>
    );
}
