import {ChangeEventHandler, useContext, useEffect, useState} from "react";
import {globalContext} from "../../routes/AppRoutes.tsx";
import {Address} from "../../models/users/address.ts";
import {settings} from "../../lib/settings.ts";
import {doRequest} from "../../lib/fetch.ts";
import {PhoneNumber} from "../../models/users/phone-number.ts";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import swal from "sweetalert";
import TotalAndSubtotalOrder from "../../components/Orders/TotalAndSubtotalOrder.tsx";
import {DeliveryMethod, PaymentMethod} from "../../types/order-types.ts";

const OrderOptionsPage = () => {

    const myContext = useContext(globalContext);
    const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>(myContext.order.deliveryMethod ? myContext.order.deliveryMethod : "LOCAL_PICKUP");
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(myContext.order.paymentMethod ? myContext.order.paymentMethod : "CASH" as PaymentMethod);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([]);
    const [addressId, setAddressId] = useState<string>();
    const [phoneNumberId, setPhoneNumberId] = useState<string>();
    const navigate = useNavigate();

    const getAddresses = async () => {
        const api = settings.api.addresses.findAllActive
        const response = await doRequest<Address[]>({
            path: api.path,
            method: api.method,
            jwt: myContext.userContext.jwt
        });
        if (response) {
            setAddresses(response);
            const predetermined = response.find(r => r.predetermined);
            if(predetermined){
                setAddressId(predetermined.id)
            }else{
                setAddressId(response.at(0)!.id)
            }
        }
    }

    const getPhoneNumbers = async () => {
        const api = settings.api.phoneNumber.findAllActive
        const response = await doRequest<PhoneNumber[]>({
            path: api.path,
            method: api.method,
            jwt: myContext.userContext.jwt
        });
        if (response) {
            setPhoneNumbers(response);
            const predetermined = response.find(r => r.predetermined);
            if(predetermined){
                setPhoneNumberId(predetermined.id)
            }else{
                setPhoneNumberId(response.at(0)!.id)
            }
        }
    }

    const handleDeliveryMethodChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setDeliveryMethod(e.target.value as DeliveryMethod);
        if (e.target.value === "HOME_DELIVERY") {
            setPaymentMethod("MERCADO_PAGO");
        }
    }

    const handlePaymentMethodChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setPaymentMethod(e.target.value as PaymentMethod);
    }

    const handleAddressSelector: ChangeEventHandler<HTMLSelectElement> = e => {
        setAddressId(e.target.value);
    }


    const handlePhoneNumberSelector: ChangeEventHandler<HTMLSelectElement> = e => {
        setPhoneNumberId(e.target.value);
    }

    const handleNextButton = () => {
        if (deliveryMethod === "HOME_DELIVERY") {
            if (paymentMethod === "CASH") {
                swal("Error", "Medio de pago no permitido para envíos a domicilio", "error");
                return;
            }
            if (!addressId || !phoneNumberId) {
                swal("Error", "Completar información de envío", "error");
                return;
            }
        }
        const newOrder = {...myContext.order}
        newOrder.deliveryMethod = deliveryMethod;
        newOrder.paymentMethod = paymentMethod;
        if (addressId) {
            newOrder.address = addressId;
        }
        if (phoneNumberId) {
            newOrder.phoneNumber = phoneNumberId;
        }
        if (myContext.order.onChange) {
            myContext.order.onChange(newOrder);
        }
        navigate("/pedido/confirmacion")
    }

    useEffect(() => {
        getAddresses();
        getPhoneNumbers();
    }, [])

    if (myContext.userContext.authenticated && myContext.userContext.role === "USER") {
        return (
            <>
                <h1 className={"fs-2"}>Mi Pedido</h1>
                <div className="row">
                    <section className="mt-3 col-12 col-lg-8">
                        <h2 className="fs-5 fw-bold">Forma de entrega</h2>
                        <label className="border d-flex flex-row p-4 justify-content-between"
                               htmlFor="local_pickup">
                            <div>
                                <input type="radio"
                                       id="local_pickup"
                                       name="deliveryMethod"
                                       value="LOCAL_PICKUP"
                                       checked={deliveryMethod === ("LOCAL_PICKUP" as DeliveryMethod)}
                                       className="form-check-input"
                                       onChange={handleDeliveryMethodChange}/>
                                <span className="fs-6 ms-3">Retiro en local</span>
                            </div>
                            <span className="text-success fs-6">10% OFF</span>
                        </label>
                        <label className="border d-flex flex-row p-4"
                               htmlFor="home_delivery">
                            <input type="radio"
                                   id="home_delivery"
                                   name="deliveryMethod"
                                   value="HOME_DELIVERY"
                                   checked={deliveryMethod === ("HOME_DELIVERY" as DeliveryMethod)}
                                   className="form-check-input"
                                   onChange={handleDeliveryMethodChange}/>
                            <span className="fs-6 ms-3">Recibir en mi domicilio</span>
                        </label>

                        {(deliveryMethod === "HOME_DELIVERY") &&
                            <>
                                <div className="d-flex  align-items-center mt-3">
                                    <div className={"w-50 me-2 d-flex flex-column align-items-center"}>
                                        <div className={"w-100 mb-2"}>
                                            <label htmlFor="address" className="form-label">Dirección</label>
                                            <select className="form-select" id="address" name="address"
                                                    onChange={handleAddressSelector}>
                                                {addresses &&
                                                    addresses.map(a =>
                                                        <option key={a.id} value={a.id}
                                                                selected={a.predetermined}>{a.street} {a.number}</option>)
                                                }
                                            </select>
                                        </div>
                                        <Link to={"/direcciones/nuevo"} className="btn btn-secondary">Nuevo</Link>
                                    </div>
                                    <div className={"w-50 me-2 d-flex flex-column align-items-center"}>
                                        <div className={"w-100 mb-2"}>
                                            <label htmlFor="phoneNumber" className="form-label">Teléfono</label>
                                            <select className="form-select" id="phoneNumber" name="phoneNumber"
                                                    onChange={handlePhoneNumberSelector}>
                                                {phoneNumbers &&
                                                    phoneNumbers.map(pn =>
                                                        <option key={pn.id}
                                                                value={pn.id}
                                                                selected={pn.predetermined}
                                                        >{pn.areaCode} {pn.phoneNumber}</option>)
                                                }
                                            </select>
                                        </div>
                                        <Link to={"/telefonos/nuevo"} className="btn btn-secondary">Nuevo</Link>
                                    </div>
                                </div>
                            </>
                        }
                        <h2 className="fs-5 fw-bold mt-2">Forma de pago</h2>
                        <label className="border d-flex flex-row p-4"
                               htmlFor="mercado_pago">
                            <input type="radio"
                                   id="mercado_pago"
                                   name="paymentMethod"
                                   value="MERCADO_PAGO"
                                   checked={paymentMethod === ("MERCADO_PAGO" as PaymentMethod) || deliveryMethod === ("HOME_DELIVERY" as DeliveryMethod)}
                                   className="form-check-input"
                                   onChange={handlePaymentMethodChange}/>
                            <span className="fs-6 ms-3">Mercado Pago</span>
                        </label>
                        {deliveryMethod !== "HOME_DELIVERY" &&
                            <label className="border d-flex flex-row p-4"
                                   htmlFor="cash">
                                <input type="radio"
                                       id="cash"
                                       name="paymentMethod"
                                       value="CASH"
                                       checked={paymentMethod === ("CASH" as PaymentMethod) || deliveryMethod !== ("HOME_DELIVERY" as DeliveryMethod)}
                                       className="form-check-input"
                                       onChange={handlePaymentMethodChange}/>
                                <span className="fs-6 ms-3">Efectivo</span>
                            </label>}
                    </section>
                    <section className="col-12 col-lg-3 ms-3">
                        <TotalAndSubtotalOrder deliveryMethod={deliveryMethod} order={undefined}/>
                    </section>
                </div>
                <div className="d-flex justify-content-around mt-3 ">
                    <Link className={"btn btn-outline-danger col mx-5"} to={"/pedido"}>VOLVER</Link>
                    <Button className={"col mx-5"} onClick={handleNextButton}>SIGUIENTE</Button>
                </div>
            </>
        );
    }
    return <Navigate to={"/"}/>
};

export default OrderOptionsPage;