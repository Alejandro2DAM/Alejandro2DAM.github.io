

	// Mi código


	var indice = 0;
	var tamanio = 0;
	var respuestas = [];
	var respuestasCorrectas = [];
	var puntuacion = 0;
	var fin = false;
	var x;
	
	function loadDoc() {
		fin = false;
		const xhttp = new XMLHttpRequest();
		xhttp.onload = function() {
		  myFunction(this);
		}
		xhttp.open("GET", "test.xml");
		xhttp.send();
	  }

	function myFunction(xml) {

		document.getElementById("botonInicio").hidden = true;

		const xmlDoc = xml.responseXML;
		x = xmlDoc.getElementsByTagName("PREGUNTA");

		Array.from(x).forEach((p) => {
            const respuestas = p.getElementsByTagName("RESPUESTA");
            Array.from(respuestas).forEach((r) => {
                if (r.getAttribute("correct") === "true") {
                    respuestasCorrectas.push(r.textContent);
                }
            });
        });

		/*respuestasCorrectas[0] = "undefined";
		respuestasCorrectas[1] = "push";
		respuestasCorrectas[2] = "===";
		respuestasCorrectas[3] = "function myFunction()";
		respuestasCorrectas[4] = "define";
		respuestasCorrectas[5] = "length";
		respuestasCorrectas[6] = "break";
		respuestasCorrectas[7] = "getElementById";
		respuestasCorrectas[8] = "parseInt";
		respuestasCorrectas[9] = "try...catch";*/

		tamanio = x.length;
		
		mostrar();
	}

	function mostrar(){
		if(fin){
			mostrarResultados();
		}else{
			mostrarPregunta()
		}
	}

	function mostrarPregunta() {
		let form = "<div class='card'>";
		form += "<div class='card-body'>";
		form += "<h5 class='card-title'>";
		form += "Pregunta " + (indice + 1) + ": " + x[indice].getElementsByTagName("ENUNCIADO")[0].childNodes[0].nodeValue;
		form += "</h5>";
		
		form += "<form><div class='form-check'>";
		
		form += "<input class='form-check-input' type='radio' name='RESPUESTA' id='q1' value='";
			form += x[indice].getElementsByTagName("RESPUESTA")[0].childNodes[0].nodeValue + "'>";
		form += "<label class='form-check-label' for='q1'>"
			form += x[indice].getElementsByTagName("RESPUESTA")[0].childNodes[0].nodeValue + "</label>";
		form += "<br>";
		
		form += "<input class='form-check-input' type='radio' name='RESPUESTA' id='q2' value='";
			form += x[indice].getElementsByTagName("RESPUESTA")[1].childNodes[0].nodeValue + "'>";
		form += "<label class='form-check-label' for='q2'>"
			form += x[indice].getElementsByTagName("RESPUESTA")[1].childNodes[0].nodeValue + "</label>";
		form += "<br>";
		
		form += "<input class='form-check-input' type='radio' name='RESPUESTA' id='q3' value='";
			form += x[indice].getElementsByTagName("RESPUESTA")[2].childNodes[0].nodeValue + "'>";
		form += "<label class='form-check-label' for='q3'>"
			form += x[indice].getElementsByTagName("RESPUESTA")[2].childNodes[0].nodeValue + "</label>";
		form += "<br>";
		
		form += "<input class='form-check-input' type='radio' name='RESPUESTA' id='q4' value='";
			form += x[indice].getElementsByTagName("RESPUESTA")[3].childNodes[0].nodeValue + "'>";
		form += "<label class='form-check-label' for='q4'>"
			form += x[indice].getElementsByTagName("RESPUESTA")[3].childNodes[0].nodeValue + "</label>";
		form += "<br>"; 
		
		form += "</div></form>";
		form += "</div></div>";
		
		form += "<br>";
		
		form += "&nbsp&nbsp";
		form += "<button class='btn btn-primary' onclick='cambiarPregunta(tamanio, 1)'>Anterior</button>";
		form += "&nbsp&nbsp";

		if(indice < tamanio - 1){
			form += "<button class='btn btn-primary' onclick='cambiarPregunta(tamanio, 2)'>Siguiente</button>";
		}
		else{
			form += "<button class='btn btn-primary' onclick='finalizar()'>Finalizar</button>";
		}
	  
		/*form += "<p>Índice: " + indice + "</p>";
		
		form += "<p>Tamaño array respuestas: " + respuestas.length + "</p>";
		
		form += "<p id='idPrueba'>";
		
		respuestas.forEach(function(r, index) {
		  form += index + " " + r + "<br>";
		});
	  
		form += "</p>";*/
		
		document.getElementById("contenidoXML").innerHTML = form;
		
		let aux = document.querySelectorAll('input[name="RESPUESTA"]');
	  
		aux.forEach((r) => {
		  if(r.value === respuestas[indice]){
			  r.checked = true;
		  }
		});
	}
	function cambiarPregunta(tamanio,opcion) {
	  
		let respuestaSeleccionada = document.querySelector('input[name="RESPUESTA"]:checked');
		
		if(respuestaSeleccionada){
			respuestas[indice] = respuestaSeleccionada.value;
		}
		else{
			respuestas[indice] = "No se ha seleccionada nada";
		}
	  
		/*if (opcion === 1){
			indice -= 1;
		  loadDoc();
		}
		else if (opcion === 2){
		  indice += 1;
		  loadDoc();
		}*/
		
		switch(opcion) {
		case 1:
		  if(indice > 0){
			  indice -= 1;
		  }
		  loadDoc();
		  break;
		case 2:
		  if(indice < tamanio - 1){
			  indice += 1;
		  }
		  loadDoc();
		  break;
		//default:
		  // code block
		 
		}
	}
	function finalizar(){
		let respuestaSeleccionada = document.querySelector('input[name="RESPUESTA"]:checked');
		
		if(respuestaSeleccionada){
			respuestas[indice] = respuestaSeleccionada.value;
		}
		else{
			respuestas[indice] = "No se ha seleccionada nada";
		}

		fin = true;
		mostrar();
	}
	function mostrarResultados(){

		var textoFin = "";

		respuestas.forEach((r, indiceR) => {
		if(r === respuestasCorrectas[indiceR]){
			puntuacion += 1;
		}
		//textoFin += "<br>Respuesta marcada " + indiceR + ": " + r + ".   Respuesta correcta: " + respuestasCorrectas[indiceR] + "<br>";
		});

		textoFin += "<div class='container mt-5'>";
		textoFin +=      "<div class='card custom-card h-200'>";
		textoFin +=		    "<div class='card-body'>";
		textoFin +=		    "<h5 class='card-title'>Resultados del test</h5>";
		textoFin +=		    "<p class='card-text'>Número de respuestas acertadas: " + puntuacion + "/" + tamanio + "</p>";
		textoFin +=		    "<p class='card-text'>Puntuación: " + (puntuacion * 10 / tamanio).toFixed(2) + " / 10.00</p>";
		textoFin +=			"<button id='botonComprobar' class='btn btn-primary' onclick='mostrarCorreccion()'>Comprobar</button>"
		textoFin +=		    "</div>";
		textoFin +=	     "</div>";
		textoFin += "</div>";

		indice = 0;

		document.getElementById("contenidoXML").innerHTML = textoFin;
	}
	function mostrarCorreccion(){

		var textoComprobar = "";

		textoComprobar += "<div class='container mt-5'>";
		textoComprobar +=      "<div class='card custom-card h-200'>";
		textoComprobar +=		    "<div class='card-body'>";
		textoComprobar +=		    "<h5 class='card-title'>Pregunta " + (indice + 1) + ": " + x[indice].getElementsByTagName("ENUNCIADO")[0].childNodes[0].nodeValue + "</h5>";

		const respuestasTemp = x[indice].getElementsByTagName("RESPUESTA");
		const respuestaUsuario = respuestas[indice];
		const respuestaCorrecta = respuestasCorrectas[indice];

		Array.from(respuestasTemp).forEach((r) => {
			textoComprobar += "<p class='card-text'> - ";

			// Añadir la respuesta actual al texto
			textoComprobar += r.childNodes[0].nodeValue;

			// Marcar la respuesta correcta y la respuesta del usuario
			if (r.childNodes[0].nodeValue === respuestaCorrecta) {
				textoComprobar += " (Correcta)";
			}

			if (r.childNodes[0].nodeValue === respuestaUsuario) {
				if (r.childNodes[0].nodeValue !== respuestaCorrecta) {
					textoComprobar += " (Marcada)";
				}
			}

			textoComprobar += "</p>";
		});	

		textoComprobar +=		    "</div>";
		textoComprobar +=	     "</div>";
		textoComprobar += "</div>";

		textoComprobar += "<br>"

		textoComprobar += "&nbsp&nbsp";
		textoComprobar += "<button class='btn btn-primary' onclick='cambiarMuestra(1)'>Anterior</button>";
		textoComprobar += "&nbsp&nbsp";
		textoComprobar += "<button class='btn btn-primary' onclick='cambiarMuestra(2)'>Siguiente</button>";

		document.getElementById("contenidoXML").innerHTML = textoComprobar;
	}
	function cambiarMuestra(op){
		switch(op) {
			case 1:
			  if(indice > 0){
				  indice -= 1;
			  }
			  mostrarCorreccion();
			  break;
			case 2:
			  if(indice < tamanio - 1){
				  indice += 1;
			  }
			  mostrarCorreccion();
			  break;
			//default:
			  // code block
			 
			}
	}


