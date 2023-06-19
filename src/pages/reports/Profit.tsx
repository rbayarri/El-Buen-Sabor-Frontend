import {useContext, useState} from "react";
import {globalContext} from "../../routes/AppRoutes.tsx";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {settings} from "../../lib/settings.ts";
import {doRequest} from "../../lib/fetch.ts";
import {Button} from "react-bootstrap";
import {Navigate} from "react-router-dom";
import {Profit} from "../../models/reports/profit.ts";
import ProfitTable from "../../components/Reports/ProfitTable.tsx";

const Profit = () => {

    const myContext = useContext(globalContext);
    const [profit, setProfit] = useState<Profit>();
    const [isLoading, setIsLoading] = useState(false);

    if (myContext.userContext.authenticated && myContext.userContext.role === "ADMIN") {
        return (
            <>
                {isLoading ? <h1>Loading...</h1> :
                    <>
                        <h1 className="fs-2 text-center">Informe Ganancias</h1>
                        <Formik
                            initialValues={{
                                from: new Date(new Date().setDate(1)).toISOString().substring(0, 10),
                                to: new Date(Date.now()).toISOString().substring(0, 10),
                            }}
                            validationSchema={Yup.object().shape({
                                from: Yup.date().required("Campo requerido"),
                                to: Yup.date().required("Campo requerido"),
                            })}
                            onSubmit={async (values) => {
                                setIsLoading(true);
                                const api = settings.api.reports.profits;
                                const response = await doRequest<Profit>({
                                    path: `${api.path}?from=${values.from}&to=${values.to}`,
                                    method: api.method,
                                    jwt: myContext.userContext.jwt
                                });
                                if (response) {
                                    setProfit(response);
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
                                    <Button variant="btn btn-primary mt-2" type="submit">Buscar</Button>
                                </Form>
                            )}
                        </Formik>
                        {profit &&
                            <div className="mt-4 col-6">
                                <div className="d-flex align-items-center">
                                    <h2 className="fs-6 fw-bold me-3 mb-0">Movimientos monetarios</h2>
                                    <img
                                        src="https://cdn.iconscout.com/icon/free/png-256/free-excel-1-129882.png?f=webp"
                                        alt=""
                                        width={"30px"}
                                        style={{cursor: "pointer"}}/>
                                </div>
                                <ProfitTable profit={profit}/>
                            </div>
                        }
                    </>
                }
            </>
        );
    }
    return <Navigate to={"/"}/>;
};

export default Profit;