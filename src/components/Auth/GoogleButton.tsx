import React, {useContext, useEffect} from "react";
import {globalContext} from "../../routes/AppRoutes.tsx";
import {doRequest} from "../../lib/fetch.ts";
import {settings} from "../../lib/settings.ts";
import {Token} from "../../models/auth/token.ts";
import {getUserFromCookie, saveTokenCookie} from "../../lib/cookies.ts";
import {useNavigate} from "react-router-dom";
import swal from "sweetalert";

interface GoogleOneTapButtonProps {
    clientId: string;
}

const GoogleOneTapButton: React.FC<GoogleOneTapButtonProps> = ({clientId}) => {

    const myContext = useContext(globalContext)
    const navigation = useNavigate();

    const googleApiSettings = settings.api.auth.googleAuthentication;

    async function handleCredentialResponse(response: any) {

        const apiResponse = await doRequest<Token>({
            path: googleApiSettings.path,
            method: googleApiSettings.method,
            body: response.credential
        });
        if(response){
            const {token} = apiResponse as Token;
            saveTokenCookie(token);
            const userFromCookie = getUserFromCookie();
            if (userFromCookie) {
                userFromCookie.onChange = myContext.userContext.onChange;
                if (myContext.userContext.onChange !== undefined) {
                    myContext.userContext.onChange(userFromCookie);
                }
                navigation("/");
            }
        }else{
            swal("Error", "Error al conectarse con el servidor", "error");
        }
    }

    useEffect(() => {
        google.accounts.id.initialize({
            client_id: clientId,
            callback: handleCredentialResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            {theme: "outline", size: "large", width: 300}  // customization attributes
        );

        google.accounts.id.prompt(); // also display the One Tap dialog

    }, [clientId]);

    return (
        <div id="buttonDiv" className="text-center"></div>
    );
};

export default GoogleOneTapButton;