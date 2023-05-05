import React, { useContext, useEffect } from "react";
import { myContext } from "../../routes/AppRoutes";

interface GoogleOneTapButtonProps {
  clientId: string;
}

const GoogleOneTapButton: React.FC<GoogleOneTapButtonProps> = ({ clientId }) => {

  const myGoogleConxtext = useContext(myContext)

  function handleCredentialResponse(response: any) {


    //TODO: Send request to backend to verify jwt and retrieve a new jwt from backend
    //TODO: Save it into a cookie, in this case we're saving the google jwt for testing

    const expires = new Date();
    expires.setDate(Date.now() + 7 * 24 * 60 * 60 * 1000); // Set cookie to expire in 7 days
    document.cookie = `USERJWT=${response.credential}; expires=${expires.toUTCString()}; path=/; sameSite=lax;`;

    //TODO: Decode the jwt to set the new user state, here it's hardcoded for testing
    const renzo = {
      name: "Renzo",
      lastName: "Bayarri",
      picture: "empty",
      role: "ADMIN",
      authenticated: true,
      onChange: myGoogleConxtext.onChange
    }

    myGoogleConxtext.onChange(renzo)

    //TODO: Eliminar
    console.log("Encoded JWT ID token: " + response.credential);

  }

  useEffect(() => {

    google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large", width: 300 }  // customization attributes
    );

    google.accounts.id.prompt(); // also display the One Tap dialog
  }, [clientId]);

  return (
    <div id="buttonDiv" className="text-center"></div>
  );
};

export default GoogleOneTapButton;