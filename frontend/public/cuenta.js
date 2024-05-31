document.addEventListener('DOMContentLoaded', function() {
    let userPassword; // Variable para almacenar la contraseña del usuario

    // Llamar al endpoint para obtener los datos del usuario
    fetch('http://127.0.0.1:8003/COED/usuario/6')
        .then(response => response.json())
        .then(data => {
            // Verificar si los datos fueron recibidos correctamente
            if (data) {
                document.getElementById('nombres').value = data.nombresusuario || 'No disponible';
                document.getElementById('apellidos').value = data.apellidosusuario || 'No disponible';
                document.getElementById('email').value = data.email || 'No disponible';
                document.getElementById('usuario').value = data.usuario || 'No disponible';
                document.getElementById('contrasena').value = data.password || 'No disponible';
                userPassword = data.password; // Almacenar la contraseña del usuario
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Usuario no encontrado',
                    text: 'No se pudo encontrar el usuario con el ID especificado.'
                });
            }
        })
        .catch(error => {
            console.error('Error al obtener el usuario:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al obtener el usuario'
            });
        });

    // Guardar cambios
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const nombresUsuario = document.getElementById('nombres').value;
        const apellidosUsuario = document.getElementById('apellidos').value;
        const email = document.getElementById('email').value;
        const usuario = document.getElementById('usuario').value;
        const password = document.getElementById('contrasena').value;

        userPassword = password; // Actualizar la contraseña del usuario

        fetch('http://127.0.0.1:8003/COED/usuario/6', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombresUsuario: nombresUsuario,
                apellidosUsuario: apellidosUsuario,
                email: email,
                usuario: usuario,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                Swal.fire({
                    icon: 'success',
                    title: 'Usuario actualizado',
                    text: 'El usuario ha sido actualizado correctamente.'
                });
                // Volver a poner los campos en solo lectura y deshabilitados
                document.querySelectorAll('.form-control').forEach(function(input) {
                    input.setAttribute('readonly', '');
                    input.setAttribute('disabled', '');
                });
                document.getElementById('updateButtons').classList.add('d-none');
                document.getElementById('actualizarBtn').classList.remove('d-none');
                document.getElementById('eliminarBtn').classList.remove('d-none');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al actualizar',
                    text: 'No se pudo actualizar el usuario.'
                });
            }
        })
        .catch(error => {
            console.error('Error al actualizar el usuario:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al actualizar el usuario'
            });
        });
    });
    
    // Mostrar/ocultar menú
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('show-menu');
    });

    // Habilitar edición de campos
    document.getElementById('actualizarBtn').addEventListener('click', function() {
        document.querySelectorAll('.form-control').forEach(function(input) {
            input.removeAttribute('readonly');
            input.removeAttribute('disabled');
        });
        document.getElementById('updateButtons').classList.remove('d-none');
        document.getElementById('actualizarBtn').classList.add('d-none');
        document.getElementById('eliminarBtn').classList.add('d-none');
    });

    // Cancelar edición de campos
    document.getElementById('cancelarBtn').addEventListener('click', function() {
        document.querySelectorAll('.form-control').forEach(function(input) {
            input.setAttribute('readonly', '');
            input.setAttribute('disabled', '');
        });
        document.getElementById('updateButtons').classList.add('d-none');
        document.getElementById('actualizarBtn').classList.remove('d-none');
        document.getElementById('eliminarBtn').classList.remove('d-none');
    });

    // Mostrar modal de contraseña al intentar eliminar la cuenta
    document.getElementById('eliminarBtn').addEventListener('click', function() {
        Swal.fire({
            title: 'Ingrese su contraseña',
            input: 'password',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#dc3545', // Color rojo para el botón de cancelar
            showLoaderOnConfirm: true,
            preConfirm: (password) => {
                // Aquí se debe verificar la contraseña
                if (password === userPassword) { // Verificar la contraseña del usuario
                    return password;
                } else {
                    Swal.showValidationMessage('Contraseña incorrecta');
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Eliminar cuenta',
                    text: '¿Estás seguro que quieres eliminar tu cuenta?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Eliminar',
                    cancelButtonText: 'Cancelar',
                    cancelButtonColor: '#dc3545', // Color rojo para el botón de cancelar
                    reverseButtons: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Lógica para eliminar la cuenta
                        fetch(`http://127.0.0.1:8003/COED/usuario/6`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(response => response.json())
                        .then(data => {
                            if (data.message) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Cuenta eliminada',
                                    text: '¡Tu cuenta ha sido eliminada exitosamente!',
                                    timer: 5000
                                }).then(() => {
                                    window.location.href = 'index.html'; // Redirigir a index.html después de eliminar la cuenta
                                });
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error',
                                    text: 'No se pudo eliminar la cuenta. Por favor, inténtalo de nuevo.'
                                });
                            }
                        })
                        .catch(error => {
                            console.error('Error al eliminar la cuenta:', error);
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'Error al eliminar la cuenta. Por favor, inténtalo de nuevo.'
                            });
                        });
                    }
                });
            }
        });
    });
});
