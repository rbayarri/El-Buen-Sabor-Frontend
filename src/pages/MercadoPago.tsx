import {initMercadoPago, Wallet} from '@mercadopago/sdk-react'
import {useState} from "react";

initMercadoPago('TEST-7fe9b4a3-4df8-4628-9bdc-1d4101c3f82d');

const MercadoPago = () => {

    const [preferenceId, setPreferenceId] = useState(null);
    const [isReady, setIsReady] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
        setIsLoading(true);
        fetch("http://localhost:8080/api/v1/mercadoPago/createPreference")
            .then((response) => {
                return response.json();
            })
            .then((preference) => {
                console.log(preference)
                setPreferenceId(preference.id);
            })
            .catch((error) => {
                console.error(error);
            }).finally(() => {
            setIsLoading(false);
        })
    };

    const handleOnReady = () => {
        setIsReady(true);
    }

    const renderCheckoutButton = (preferenceId) => {
        if (!preferenceId) return null;

        return (
            <Wallet
                initialization={{preferenceId: preferenceId}}
                onReady={handleOnReady}/>
        )
    }
    return (
        <div>
            <button
                className="btn btn-primary btn-lg btn-block"
                onClick={handleClick}
                id="checkout-btn"
            >
                Checkout
            </button>
            {renderCheckoutButton(preferenceId)}
        </div>
    );
};

export default MercadoPago;