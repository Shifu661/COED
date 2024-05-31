document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombres = document.getElementById('nombres').value;
    const apellidos = document.getElementById('apellidos').value;
    const email = document.getElementById('email').value;
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('contrasena').value;
    const repetirContrasena = document.getElementById('repetir-contrasena').value;

    if (password !== repetirContrasena) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Las contraseñas no coinciden. Por favor, inténtelo de nuevo.'
        });
        return;
    }

    const data = {
        nombresUsuario: nombres,
        apellidosUsuario: apellidos,
        email: email,
        usuario: usuario,
        password: password
    };

    // Enviar una solicitud POST al endpoint de registro
    fetch('http://127.0.0.1:8003/COED/usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            Swal.fire({
                icon: 'success',
                title: '¡Registrado!',
                text: 'Usuario creado correctamente.',
                timer: 1000, // El mensaje desaparecerá después de 1 segundo
                showConfirmButton: false
            }).then((result) => {
                // Redirige al usuario a la página principal después de que el mensaje desaparezca
                if (result.dismiss === Swal.DismissReason.timer) {
                    window.location.href = 'index.html';
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: data.error || 'No se pudo registrar el usuario. Por favor, inténtelo de nuevo.'
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al intentar registrar el usuario. Por favor, inténtelo de nuevo más tarde.'
        });
    });
});