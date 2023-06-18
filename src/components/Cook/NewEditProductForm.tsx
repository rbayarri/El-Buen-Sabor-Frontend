import {ChangeEvent, useContext, useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {CompleteProduct} from "../../models/products/complete-product.ts";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {globalContext} from "../../routes/AppRoutes.tsx";
import {EntityReference} from "../../models/entity-reference.ts";
import {settings} from "../../lib/settings.ts";
import {doRequest, host, showErrorMessages} from "../../lib/fetch.ts";
import swal from "sweetalert";
import "./new-edit-product.css";
import Ingredient from "../../models/ingredient.ts";
import {ErrorMessage, Field, FieldArray, Form, Formik} from "formik";
import * as Yup from "yup";
import {getMeasurementUnits} from "../../lib/measurement-unit.ts";
import {ApiResponseError} from "../../models/api-response-error.ts";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {pink} from "@mui/material/colors";
import {ProductDetail} from "../../models/product-detail.ts";

export default function NewEditProductForm(props: { product: CompleteProduct, found: boolean }) {

    const myContext = useContext(globalContext);
    const [posibleCategories, setPosibleCategories] = useState<EntityReference[]>();
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const navigate = useNavigate();
    const {product, found} = props;

    const getPosibleCategories = async () => {
        const api = settings.api.products.findPossibleParents;

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

    const getIngredientes = async () => {

        const api = settings.api.ingredients.findAll;
        const response = await doRequest<Ingredient[]>({
            path: api.path,
            method: api.method,
            jwt: myContext.userContext.jwt
        });
        if (response) {
            setIngredients(response);
            setIsLoading(false);
        }
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);

            // create a URL for the selected file
            const previewUrl = URL.createObjectURL(selectedFile);
            setPreviewUrl(previewUrl);
        }
    };

    const setImagePreview = () => {
        if (product.image) {
            setPreviewUrl(product.image.location);
        }
    }

    useEffect(() => {
        getPosibleCategories();
        getIngredientes();
        setImagePreview();
    }, []);


    const handleSave = async (formData: FormData) => {

        const api = settings.api.products.save;

        const requestOptions: RequestInit = {
            method: api.method,
            headers: {
                "Authorization": "Bearer " + myContext.userContext.jwt
            },
            body: formData,
            redirect: 'follow'
        };
        try {
            const response = await fetch(`${host}${api.path}`, requestOptions);
            if (response.status == 200 || response.status == 201) {
                swal("Producto guardado", "", "success");
                navigate("/productos")
            } else {
                showErrorMessages(await response.json() as ApiResponseError);
            }
        } catch (e) {
            swal("Error", "Error de conexión", "error");
        }
    }

    const handleUpdate = async (formData: FormData) => {
        const api = settings.api.products.update;
        const requestOptions: RequestInit = {
            method: api.method,
            headers: {
                "Authorization": "Bearer " + myContext.userContext.jwt
                // "Content-Type" : "multipart/form-data"
            },
            body: formData,
            redirect: 'follow'
        };
        try {
            const response = await fetch(`${host}${api.path}/${product.id}`, requestOptions);
            if (response.status == 200 || response.status == 201) {
                swal("Producto guardado", "", "success");
                navigate("/productos")
            } else {
                showErrorMessages(await response.json() as ApiResponseError);
            }
        } catch (e) {
            swal("Error", "Error de conexión", "error");
        }
    }

    const productForm = {
        id: product.id,
        name: product.name,
        description: product.description,
        categoryId: product.category.id,
        cookingTime: product.cookingTime,
        profitMargin: product.profitMargin,
        active: product.active,
        imageUrl: product.image ? product.image.location : "",
        recipe: product.recipe ? product.recipe : undefined,
        productDetails: product.productDetails
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

    function getMeasurementUnits1(productDetail: ProductDetail) {
        const currentIngredient = ingredients.find(i => i.id === productDetail.ingredient.id);
        if (currentIngredient) {
            return getMeasurementUnits(currentIngredient.measurementUnit);
        }
    }

    return (
        <>
            {isLoading ? <h1>Loading...</h1> : (
                <>
                    <Formik
                        initialValues={productForm}
                        validationSchema={Yup.object().shape({
                            id: Yup.string().optional(),
                            name: Yup.string().required("Campo requerido"),
                            description: Yup.string().required("Campo requerido"),
                            categoryId: Yup.string().required("Campo requerido"),
                            cookingTime: Yup.number().required("Campo requerido").integer("Debe ser un valor entero"),
                            profitMargin: Yup.number().required("Campo requerido").min(0.01, "Valor no permitido"),
                            active: Yup.boolean().required("Campo requerido"),
                            imageUrl: Yup.string().optional(),
                            recipe: Yup.string().optional(),
                            productDetails: Yup.array().min(1, "Al menos un ingrediente").of(Yup.object({
                                ingredient: Yup.object({
                                    id: Yup.string().required("Campo requerido").not(["0"], "Campo requerido")
                                }),
                                clientMeasurementUnit: Yup.string().required("Campo requerido").not(["0"], "Unidad no válida"),
                                quantity: Yup.number().required("Campo requerido").positive("Valor no válido")
                            }))
                        })}
                        onSubmit={(values) => {

                            const formdata = new FormData();

                            const bodyProduct: CompleteProduct = {
                                name: values.name,
                                description: values.description,
                                cookingTime: values.cookingTime,
                                category: {
                                    id: values.categoryId
                                },
                                active: values.active,
                                profitMargin: values.profitMargin / 100,
                                productDetails: values.productDetails
                            }

                            if (values.recipe) {
                                bodyProduct.recipe = values.recipe;
                            }

                            const productBlob = new Blob([JSON.stringify(bodyProduct)], {type: 'application/json'});
                            formdata.append("product", productBlob);
                            if (file) {
                                //const fileBlob = new Blob([file], {type: 'multipart/form-data'});
                                formdata.append('image', file);
                            } else if (values.imageUrl) {
                                //const urlBlob = new Blob([values.imageUrl], {type: 'multipart/form-data'});
                                formdata.append("imageUrl", values.imageUrl);
                            }

                            found ? handleUpdate(formdata) : handleSave(formdata);
                        }}
                    >{({values, setFieldValue}) => (
                        <Form className={"row"}>
                            <div className="col-4">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">
                                        Nombre
                                    </label>
                                    <Field className={"form-control form-control-sm"}
                                           id={"name"}
                                           type={"text"}
                                           placeholder={"Nombre"}
                                           name={"name"}/>
                                    <div className="invalid-feedback d-block" style={{whiteSpace: "pre-wrap"}}>
                                        <ErrorMessage name={"name"}/>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="categoryId" className="form-label">
                                        Rubro
                                    </label>
                                    <Field as={"select"}
                                           className={"form-select form-select-sm"}
                                           id={"categoryId"}
                                           name={"categoryId"}>
                                        <option key={0} value="0">Seleccione..</option>
                                        {posibleCategories?.map(pc => {
                                            return (
                                                <option key={pc.id} value={pc.id}>{pc.name}</option>
                                            )
                                        })}
                                    </Field>
                                    <div className="invalid-feedback d-block" style={{whiteSpace: "pre-wrap"}}>
                                        <ErrorMessage name={"categoryId"}/>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">
                                        Descripción
                                    </label>
                                    <Field className={"form-control form-control-sm"}
                                           id={"description"}
                                           type={"text"}
                                           placeholder={"Descripción"}
                                           name={"description"}/>
                                    <div className="invalid-feedback d-block" style={{whiteSpace: "pre-wrap"}}>
                                        <ErrorMessage name={"description"}/>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cookingTime" className="form-label">
                                        Tiempo de preparación
                                    </label>
                                    <Field className={"form-control form-control-sm"}
                                           id={"cookingTime"}
                                           type={"number"}
                                           name={"cookingTime"}
                                           onWheel={numberInputOnWheelPreventChange}/>
                                    <div className="invalid-feedback d-block" style={{whiteSpace: "pre-wrap"}}>
                                        <ErrorMessage name={"cookingTime"}/>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="profitMargin" className="form-label">
                                        Margen de ganancia
                                    </label>
                                    <div className="input-group">
                                        <Field className={"form-control form-control-sm"}
                                               id={"profitMargin"}
                                               type={"number"}
                                               name={"profitMargin"}
                                               onWheel={numberInputOnWheelPreventChange}
                                        />
                                        <span className="input-group-text">%</span>
                                    </div>
                                    <div className="invalid-feedback d-block" style={{whiteSpace: "pre-wrap"}}>
                                        <ErrorMessage name={"profitMargin"}/>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="active" className="form-label">
                                        Activo
                                    </label>
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
                            </div>
                            <div className="col-5">
                                <FieldArray
                                    name={"productDetails"}
                                    render={arrayHelpers => (
                                        <>
                                            <div>
                                                <span>Ingredientes</span>
                                                <AddBoxIcon className="ms-2 add-ingredient"
                                                            onClick={() => arrayHelpers.push({
                                                                    ingredient: {
                                                                        id: "0"
                                                                    },
                                                                    clientMeasurementUnit: "GRAMS",
                                                                    quantity: 0
                                                                }
                                                            )}>
                                                </AddBoxIcon>
                                            </div>
                                            <table className="table table-sm mt-2 text-center small">
                                                <thead>
                                                <tr className="table-dark">
                                                    <th>Nombre</th>
                                                    <th>U. medida</th>
                                                    <th>Cantidad</th>
                                                    <th></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {values.productDetails.map((productDetail, index) => (
                                                    <tr>
                                                        <td>
                                                            <Field
                                                                as={"select"}
                                                                name={`productDetails[${index}].ingredient.id`}
                                                                id={`productDetails[${index}].ingredient.id`}
                                                                className={"form-select form-select-sm"}
                                                                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                                                    setFieldValue(`productDetails[${index}].ingredient.id`, e.target.value);
                                                                    setFieldValue(`productDetails[${index}].clientMeasurementUnit`, "0");
                                                                }}
                                                            >
                                                                <option key={"0"} value={"0"}>Seleccione Ingrediente
                                                                </option>
                                                                {ingredients.map(i => (
                                                                    <option key={i.id} value={i.id}>
                                                                        {i.name}
                                                                    </option>
                                                                ))}
                                                            </Field>
                                                            <div
                                                                className={"invalid-feedback d-block"}
                                                                style={{whiteSpace: "pre-wrap"}}>
                                                                <ErrorMessage
                                                                    name={`productDetails[${index}].ingredient.id`}/>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <Field
                                                                as={"select"}
                                                                name={`productDetails[${index}].clientMeasurementUnit`}
                                                                className="form-select form-select-sm"
                                                                id={`productDetails[${index}].clientMeasurementUnit`}
                                                                disabled={values.productDetails[index].ingredient.id === "0"}
                                                            >
                                                                <option key="0" value="0">Seleccione..</option>
                                                                <option
                                                                    key={getMeasurementUnits1(productDetail)?.name}
                                                                    value={getMeasurementUnits1(productDetail)?.name}
                                                                >
                                                                    {getMeasurementUnits1(productDetail)?.nombre}
                                                                </option>
                                                                {getMeasurementUnits1(productDetail)?.other.map(mu =>
                                                                    <option key={mu.name}
                                                                            value={mu.name}>{mu.nombre}</option>
                                                                )}
                                                            </Field>
                                                            <div className="invalid-feedback d-block"
                                                                 style={{whiteSpace: "pre-wrap"}}>
                                                                <ErrorMessage
                                                                    name={`productDetails[${index}].clientMeasurementUnit`}/>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <Field
                                                                name={`productDetails[${index}].quantity`}
                                                                type="number"
                                                                className="form-control form-control-sm"
                                                                id={`productDetails[${index}].quantity`}
                                                                onWheel={numberInputOnWheelPreventChange}
                                                            />
                                                            <div className="invalid-feedback d-block"
                                                                 style={{whiteSpace: "pre-wrap"}}>
                                                                <ErrorMessage
                                                                    name={`productDetails[${index}].quantity`}/>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <HighlightOffIcon
                                                                className={"remove-ingredient mt-1"}
                                                                sx={{color: pink[500]}}
                                                                onClick={() => arrayHelpers.remove(index)}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>

                                        </>
                                    )}
                                />
                                <label htmlFor="recipe">Receta</label>
                                <Field
                                    as={"textarea"}
                                    id={"recipe"}
                                    name={"recipe"}
                                    placeholder={"Receta"}
                                    className="w-100 form-control form-control-sm"

                                />
                                <div className="invalid-feedback d-block" style={{whiteSpace: "pre-wrap"}}>
                                    <ErrorMessage name={"recipe"}/>
                                </div>
                            </div>
                            <div className="col-3">
                                <form className={"mb-3"}>
                                    {previewUrl ?
                                        <img src={previewUrl} alt="Selected file" className="img-thumbnail"/> :
                                        <img
                                            src={"https://www.webempresa.com/foro/wp-content/uploads/wpforo/attachments/3200/318277=80538-Sin_imagen_disponible.jpg"}
                                            alt="Selected file" className="img-thumbnail"/>
                                    }
                                    <label className={"mt-2"}>Subir imagen</label>
                                    <div className="d-flex position-relative">
                                        <input type="file" accept={"image/*"} className={"form-control form-control-sm"}
                                               onChange={handleFileChange}/>
                                        <AttachFileIcon fontSize={"small"} className={"file-icon"}/>
                                    </div>
                                </form>
                                <label htmlFor="imageUrl">URL de la imagen</label>
                                <Field
                                    type={"text"}
                                    name={"imageUrl"}
                                    id={"imageUrl"}
                                    className={"form-control form-control-sm"}
                                />
                                <div className="invalid-feedback d-block" style={{whiteSpace: "pre-wrap"}}>
                                    <ErrorMessage name={"imageUrl"}/>
                                </div>
                            </div>
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <Link to={`/productos`} className={"btn btn-danger mt-3 me-2"}>Cancelar</Link>
                                <Button variant={found ? "dark" : "success"} type="submit" className={"mt-3"}
                                >
                                    {found ? "Modificar" : "Guardar"}
                                </Button>
                            </div>
                        </Form>
                    )
                    }
                    </Formik>


                </>
            )}
        </>
    )
        ;
}
