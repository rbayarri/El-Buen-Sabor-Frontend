import {useContext, useState} from "react";
import {globalContext} from "../../routes/AppRoutes.tsx";
import {settings} from "../../lib/settings.ts";
import {doRequest} from "../../lib/fetch.ts";
import {RankingProduct} from "../../models/reports/ranking-product.ts";
import {Navigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import RankingProductsTable from "../../components/Reports/RankingProductsTable.tsx";
import {Button} from "react-bootstrap";

const ProductRanking = () => {

    const myContext = useContext(globalContext);
    const [rankingProducts, setRankingProducts] = useState<RankingProduct[]>();
    const [isLoading, setIsLoading] = useState(false);

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

    if (myContext.userContext.authenticated && myContext.userContext.role === "ADMIN") {
        return (
            <>
                {isLoading ? <h1>Loading...</h1> :
                    <>
                        <h1 className="fs-2 text-center">Ranking de Productos</h1>
                        <Formik
                            initialValues={{
                                from: new Date(new Date().setDate(1)).toISOString().substring(0, 10),
                                to: new Date(Date.now()).toISOString().substring(0, 10),
                                quantity: 5
                            }}
                            validationSchema={Yup.object().shape({
                                from: Yup.date().required("Campo requerido"),
                                to: Yup.date().required("Campo requerido"),
                                quantity: Yup.number().integer().required("Campo requerido")
                            })}
                            onSubmit={async (values) => {
                                setIsLoading(true);
                                const api = settings.api.reports.rankingProducts;
                                const response = await doRequest<RankingProduct[]>({
                                    path: `${api.path}?from=${values.from}&to=${values.to}&quantityRegisters=${values.quantity}`,
                                    method: api.method,
                                    jwt: myContext.userContext.jwt
                                });
                                if (response) {
                                    setRankingProducts(response);
                                    setIsLoading(false);
                                } else {
                                    setIsLoading(false);
                                }
                            }}>
                            {() => (
                                <Form className="col-12 col-md-3">
                                    <label htmlFor="from" className="small">Fecha desde</label>
                                    <Field type={"date"}
                                           name={"from"}
                                           id={"from"}
                                           className="form-control"
                                    />
                                    <div className="invalid-feedback d-block" style={{whiteSpace: "pre-wrap"}}>
                                        <ErrorMessage name={"from"}/>
                                    </div>
                                    <label htmlFor="to" className="small mt-3">Fecha hasta</label>
                                    <Field type={"date"}
                                           name={"to"}
                                           id={"to"}
                                           className="form-control"
                                    />
                                    <div className="invalid-feedback d-block" style={{whiteSpace: "pre-wrap"}}>
                                        <ErrorMessage name={"to"}/>
                                    </div>
                                    <label htmlFor="quantity" className="small mt-3">Registros a mostrar</label>
                                    <Field type={"number"}
                                           name={"quantity"}
                                           id={"quantity"}
                                           onWheel={numberInputOnWheelPreventChange}
                                           className="form-control"
                                    />
                                    <div className="invalid-feedback d-block" style={{whiteSpace: "pre-wrap"}}>
                                        <ErrorMessage name={"number"}/>
                                    </div>
                                    <Button variant="btn btn-primary mt-2" type="submit">Buscar</Button>
                                </Form>
                            )}
                        </Formik>
                        {rankingProducts &&
                            <div className="mt-4 d-flex">
                                <div className="col-6">
                                    <div className="d-flex align-items-center">
                                        <h2 className="fs-6 fw-bold me-3 mb-0">Productos de elaboración</h2>
                                        <img
                                            src="https://cdn.iconscout.com/icon/free/png-256/free-excel-1-129882.png?f=webp"
                                            alt=""
                                            width={"30px"}
                                            style={{cursor: "pointer"}}/>
                                    </div>
                                    <RankingProductsTable products={rankingProducts.filter(rp => rp.cookingTime > 0)}/>
                                </div>
                                <div className="col-6">
                                    <div className="d-flex align-items-center">
                                        <h2 className="fs-6 fw-bold me-3 mb-0">Productos de bebidas</h2>
                                        <img
                                            src="https://cdn.iconscout.com/icon/free/png-256/free-excel-1-129882.png?f=webp"
                                            alt=""
                                            width={"30px"}
                                            style={{cursor: "pointer"}}/>
                                    </div>
                                    <RankingProductsTable
                                        products={rankingProducts.filter(rp => rp.cookingTime === 0)}/>
                                </div>

                            </div>
                        }
                    </>
                }
            </>
        );
    }
    return <Navigate to={"/"}/>;
};

export default ProductRanking;