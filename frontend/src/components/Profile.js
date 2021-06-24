import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./Auth/LogoutButton";
const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently, error } = useAuth0();
  const [userMetadata, setProfileMetadata] = useState(null);

  if(error){
      return <div>Oops ... {error.message}</div>
  }
  useEffect(() => {
    const getProfileMetadata = async () => {
      const domain = "dev--c34vvj2.us.auth0.com";
      console.log("Datos Usuario: ", user);
      
      try {
        console.log("Print1")
        /*
        const accessToken = await getAccessTokenSilently({
          audience: `http://localhost:8000/api`,
          scope: "read:current_user",
        });
        */
        const accessToken = await getAccessTokenSilently();
        const userDetailsByIdUrl = "http://localhost:8000/api/problemas"//`https://${domain}/api/v2/users/${user.sub}`;
        const metadataResponse = await fetch(userDetailsByIdUrl, {
            method:'GET', 
            'Content-Type': 'application/json',
            headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const {data} = await metadataResponse.json();
        console.log("hemos terminado", data, metadataResponse);
        /*
        //Esto es lo mismo que arriba
        const url = 'api/problemas'
        await fetch(url, {
            method:'GET', 
            'Content-Type': 'application/json',
            headers: {
            Authorization: `Bearer ${accessToken}`,
            },
        }).then((response) => response.json())
        .then((json) =>{
            console.log("Hola soy : ",json);
            
            
        })
        */



        //setProfileMetadata(user_metadata);
      } catch (e) {
        console.log("Mensaje de error al pedir el token: ",e)
        console.log(e.message);
      }
      
    };

    getProfileMetadata();
  }, [user]);

  //JSON.stringify(userMetadata, null, 2)

  return (
    isAuthenticated && (
      <div className="container">
        <a href={"/home"}> Ir al Home</a>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>{user.sub}</p>
        <h3>Profile Metadata</h3>
        {userMetadata ? (
          <pre>
            <table className="table container table-striped">
              
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Mercenario</th>
                  <th scope="col">Horas</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(userMetadata).map((key, index) => (
                  <tr key={index}>
                    <td>{key}</td>
                    <td>{userMetadata[key]}</td>
                  </tr>
                ))}
                
              </tbody>
            </table>
          </pre>
        ) : (
          "No user metadata definedd"
        )}
        <LogoutButton />
      </div>
    )
  );
};


export default Profile