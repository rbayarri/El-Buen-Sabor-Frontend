import {Address} from "../../models/users/address.ts";
import {PhoneNumber} from "../../models/users/phone-number.ts";

const ShipmentOrderInfo = (props: {
    address: Address,
    phoneNumber: PhoneNumber,
    user: { name: string, lastName: string }
}) => {

    const {address, phoneNumber, user} = props;

    return (
        <>
            <div className="d-flex flex-column flex-lg-row">
                <p className="mb-0 col">
                    <b>Calle y
                        Número: </b>
                    {address.street + " - " + address.number}
                </p>
                <p className="mb-0 col">
                    <b>Nombre y Apellido: </b>
                    {user.name + " " + user.lastName}
                </p>
            </div>
            <div className="d-flex flex-column flex-lg-row">
                <p className="mb-0 col">
                    <b>Piso: </b>
                    {address.floor}
                </p>
                <p className="mb-0 col">
                    <b>Apartamento : </b>
                    {address.apartment}
                </p>
            </div>
            <div className="d-flex flex-column flex-lg-row">
                <p className="mb-0 col">
                    <b>Comentarios: </b>
                    {address.details}
                </p>
                <p className="mb-0 col">
                    <b>Comentarios: </b>
                    {phoneNumber.areaCode + " " + phoneNumber.phoneNumber}
                </p>
            </div>
        </>
    );
}

export default ShipmentOrderInfo;