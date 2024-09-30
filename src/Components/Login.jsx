import React from 'react';
import user from '../Assets/user.jpg';
import clinic from '../Assets/clinic.png';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div style={styles.container}>
      <div style={styles.item} >
        <Link to="/signin">
          <img
            src={user}
            alt="user image icon"
            style={styles.image}
          />
          <h1 style={styles.text}>USER</h1>
        </Link>
      </div>
      <div style={styles.item} 
      // onClick={()=>{window.open('http://localhost:3000/clinic_signin', '_blank', 'noopener')}}
      >
        <Link to="/clinic_signin">
          <img
            src={clinic}
            alt="Clinic image icon"
            style={styles.image}
          />
          <h1 style={styles.text}>CLINIC</h1>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    width: "100vw",
    height: "60vh",
    justifyContent: "center"
  },
  item: {
    margin: "0 20px",
    textAlign: "center"
  },
  image: {
    width: "200px",
    height: "200px"
  },
  text: {
    margin: "10px 0 0",
    fontSize: "24px",
    color: "#333" // You can change this to any color you prefer
  }
};



// import React from 'react';
// import user from '../Assets/user.jpg';
// import clinic from '../Assets/clinic.png';
// import { Link } from 'react-router-dom';



// export default function Login() {
//   return (
//     <div style={{ display: "flex", alignItems: "center", width: "100vw", height: "60vh", justifyContent: "center" }}>
//       <div>
//         <Link to="/signin">
//           <img
//             src={user}
//             alt="user image icon"
//             style={{
//               width: "200px",
//               height: "200px"
//             }}
//           />
//           <h1 >USER </h1>
//         </Link>
//       </div>
//       <div>
//         <Link to="/clinic_request">
//         <img
//           src={clinic}
//           alt="Clinic image icon"
//           style={{
//             width: "200px",
//             height: "200px"
//           }}
//         />
//         <h1>CLINIC </h1>
//         </Link>
//       </div>
//     </div>
//   )
// }