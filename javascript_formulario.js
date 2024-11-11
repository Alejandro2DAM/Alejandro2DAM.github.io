
  document.addEventListener('DOMContentLoaded', function() {  // Nos aseguramos de que se cargue el DOM antes de ejecutar el código

	const formulario = document.getElementById("formulario");  // Creamos una variable con el formulario del documento HTML

	document.getElementById('formulario').addEventListener('submit', function(event) {  // Creamos un evento que se dispare al presionar el botón de enviar

		const birthdate = new Date(document.getElementById('birthdate').value);  // Creamos una variable para la fecha introducida
		const today = new Date();  // Creamos la variable con la fecha de hoy
		var age = today.getFullYear() - birthdate.getFullYear();  // Calculamos la edad en años
		const monthDiff = today.getMonth() - birthdate.getMonth();  // Guardamos la diferencia de meses (sin tener en cuenta los años)

		var enviar = true;  // Establecemos una variable para no enviar los datos introducidos al archivo PHP hasta que no haya errores de validación desde Javascript

		if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {  // Si el mes de nacimiento es posterior al actual o si es el mismo y el día introducido es mayor que el actual
			age--;  // Restamos un año, puesto que no ha cumplido años en el año actual
		}
		if (age < 18) {  // Si la edad es menor que 18
			event.preventDefault();  // Evitamos el envío del formulario
			alert('Debes ser mayor de 18 años para registrarte.');
			enviar = false;
		}

		const skills = document.querySelectorAll('input[type="checkbox"][data-skill="true"]:checked');  // Guardamos las habilidades seleccionadas
		if (skills.length === 0) {  // Si no se seleccionó ninguna
			event.preventDefault();
			alert('Debes seleccionar al menos una habilidad profesional.');
			enviar = false;
		}

		if(enviar) {  // Si se debe hacer el envío a PHP

			event.preventDefault(); // Evitar que el formulario se envíe de manera tradicional

			const formData = new FormData(formulario);  // Creamos una variable con los datos del formulario
	
			fetch('validacion.php', {  // Enviamos los datos introducidos al archivo PHP
				method: 'POST',  // Mediante el método POST
				body: formData  // Con los datos creados antes como cuerpo del envío
			})
			.then(response => response.json())  // Convertimos la respuesta a JSON
			.then(data => {  // Procesamos la respuesta del archivo PHP y la mostramos en el documento HTML

				var resultado = document.getElementById("formulario");
				resultado.innerHTML = ""; // Limpiar contenido previo

				const mensajes = Object.values(data);  // Convertimos el objeto JSON en un array de textos

				document.getElementById("resultadoNombre").innerHTML = mensajes[0];  // Establecemos el contenido correspondiente en el documento HTML según lo devuelto por el archivo PHP
				if(data.errors.includes("fullName")) {  // Si hubo error en la validación
					document.getElementById("resultadoNombre").classList.add('error');  // Añadimos la clase 'error', definida para mostrar la respuesta de validación en rojo
				}
				document.getElementById("resultadoEmail").innerHTML = mensajes[1];
				if(data.errors.includes("email")) {
					document.getElementById("resultadoEmail").classList.add('error');
				}
				document.getElementById("resultadoPhone").innerHTML = mensajes[2];
				if(data.errors.includes("phone")) {
					document.getElementById("resultadoPhone").classList.add('error');
				}
				document.getElementById("resultadoBirthdate").innerHTML = mensajes[3];
				if(data.errors.includes("birthdate")) {
					document.getElementById("resultadoBirthdate").classList.add('error');
				}
				document.getElementById("resultadoGender").innerHTML = mensajes[4];
				if(data.errors.includes("gender")) {
					document.getElementById("resultadoGender").classList.add('error');
				}
				
				if (data.habilidades.length > 0) {  // Si se seleccionaron habilidades
					const habilidadesList = document.createElement("ul");  // Creamos la lista
					data.habilidades.forEach(habilidad => {  // Por cada elemento de la lista de habilidades
						const listItem = document.createElement("li");  // Creamos el elemento
						listItem.textContent = habilidad;  // Establecemos el valor
						habilidadesList.appendChild(listItem);  // Añadimos el elemento a la lista
					});
					document.getElementById("resultadoHabilidades").innerHTML = "Se han seleccionado las siguientes habilidades: ";  // Línea introductoria a la lista
					document.getElementById("resultadoHabilidades").appendChild(habilidadesList);  // Establecemos el contenido correspondiente en el documento HTML
					//resultado.appendChild(habilidadesList);
				} else {
					const noHabilidades = document.createElement("p");
					noHabilidades.textContent = "No se seleccionaron habilidades.";
					document.getElementById("resultadoHabilidades").innerHTML = noHabilidades.textContent;
				}

				if(data.errors.includes("habilidades")) {
					document.getElementById("resultadoHabilidades").classList.add('error');
				}

				document.getElementById("resultadoImage").innerHTML = mensajes[6];
				if(data.errors.includes("profilePic")) {
					document.getElementById("resultadoImage").classList.add('error');
				}
				document.getElementById("resultadoCountry").innerHTML = mensajes[7];
				if(data.errors.includes("country")) {
					document.getElementById("resultadoCountry").classList.add('error');
				}
				document.getElementById("resultadoDescription").innerHTML = mensajes[8];
				document.getElementById("resultadoTerms").innerHTML = mensajes[9];
				if(data.errors.includes("terms")) {
					document.getElementById("resultadoTerms").classList.add('error');
				}
				
			})
			.catch(error => console.error('Error:', error));

		}

	});

	document.getElementById('profilePic').addEventListener('change', function(event) {  // Al cambiar el contenido del selector de imágenes
		var file = event.target.files[0];  // Obtenemos la primera (y única imagen)
		var validFormats = ['image/jpeg', 'image/jpg', 'image/png'];  // Establecemos los formatos válidos
		var maxSize = 300 * 1024; // 300 KB
	
		if (file) {  // Si se seleccionó una imagen
			if (!validFormats.includes(file.type)) {  // Si la imagen no posee un formato válido
				alert('El formato del archivo debe ser JPG, JPEG o PNG');  // Mostramos el error como una alerta.
				event.target.value = '';  // Limpiamos el selector.
				return;
			}
			if (file.size > maxSize) {  // Si la imagen es demasiado grande
				alert('El tamaño del archivo no debe superar los 300 KB');
				event.target.value = '';
				return;
			}
			//alert('Archivo válido');
		}
	});

  });






