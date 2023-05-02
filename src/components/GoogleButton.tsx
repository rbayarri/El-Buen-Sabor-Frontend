import React, { useEffect } from "react";

interface GoogleOneTapButtonProps {
  clientId: string;
}

const GoogleOneTapButton: React.FC<GoogleOneTapButtonProps> = ({ clientId }) => {
  useEffect(() => {
    function handleCredentialResponse(response: any) {
      console.log("Encoded JWT ID token: " + response.credential);
    }

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
