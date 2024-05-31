// document.getElementById('loginForm').addEventListener('submit', function(event) {
//   event.preventDefault(); // Evita el envío del formulario por defecto

//   var username = document.getElementById('username').value;
//   var password = document.getElementById('password').value;

//   // Verifica si el usuario es admin y la contraseña es admin
//   if (username === 'admin' && password === 'admin') {
//       // Muestra una ventana emergente de SweetAlert2 con el mensaje de bienvenida
//       Swal.fire({
//           icon: 'success',
//           title: '¡Bienvenido!',
//           text: 'Ha iniciado sesión correctamente.',
//           timer: 1000, // El mensaje desaparecerá después de 3 segundos
//           showConfirmButton: false
//       }).then((result) => {
//           // Redirige al usuario a la página principal después de que el mensaje desaparezca
//           if (result.dismiss === Swal.DismissReason.timer) {
//               window.location.href = 'pagPrincipal.html';
//           }
//       });
//   } else {
//       // Muestra un mensaje de error
//       Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'Credenciales incorrectas. Por favor, inténtelo de nuevo.'
//       });
//   }
// });

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto
  
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
  
    // Crear un objeto con los datos del formulario
    var loginData = {
      usuario: username,
      password: password
    };
  
    // Enviar una solicitud POST al endpoint del login
    fetch('http://127.0.0.1:8003/COED/usuario/login', { // Cambia la URL según sea necesario
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Muestra una ventana emergente de SweetAlert2 con el mensaje de bienvenida
        Swal.fire({
          icon: 'success',
          title: '¡Bienvenido!',
          text: 'Ha iniciado sesión correctamente.',
          timer: 1000, // El mensaje desaparecerá después de 1 segundo
          showConfirmButton: false
        }).then((result) => {
          // Redirige al usuario a la página principal después de que el mensaje desaparezca
          if (result.dismiss === Swal.DismissReason.timer) {
            window.location.href = 'pagPrincipal.html';
          }
        });
      } else {
        // Muestra un mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Credenciales incorrectas. Por favor, inténtelo de nuevo.'
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al intentar iniciar sesión. Por favor, inténtelo de nuevo más tarde.'
      });
    });
});  
  