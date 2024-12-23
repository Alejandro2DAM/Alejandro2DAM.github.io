

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















	// Código otorgado por nuestro profesor de Lenguajes de Marcas de primer curso



	/*addEventListener('load',inicio,false);
    function inicio() {
		document.getElementById('sugerencias').addEventListener('change',cambioSugerencias,false);
	}
	
	function cambioSugerencias() {
		//alert(' function cambioSugerencias() ');
		var longi = parseInt(document.getElementById('sugerencias').maxlength); //document.getElementById('sugerencias').length;
		document.getElementById('numCaractRest').innerHTML = devCuentaCaract(longi);		
	}
	
	function LimpiarSugerencias() {
		document.getElementById('sugerencias').value = "";
		document.getElementById('sugerencias').value.lenght = 0;
	} */


	function getTxtSexo() {
	  var sex = document.getElementsByName('sexo'); //document.forms[2];
	  var txt = ""; //sex.name + "  ,  ";
	  var i, j;
	  /*
	  for (j = 0; j < document.forms.length; j++) { 
		txt = txt + document.forms[j] + "  ";
	  }
	*/
	  for (i = 0; i < sex.length; i++) {
		if (sex[i].checked)
			txt = txt + sex[i].value + " ";
	  }
	 
	  return txt;
	  //<input type="radio" name="coffee" value="cream">With cream<br>
      //<input type="radio" name="coffee" value="sugar">With sugar<br>
	}	
		

	function kkRecorre() {
	  var sex = document.getElementsByName('sexo'); //document.forms[2];
	  var txt = "";
	  var i;
	  for (i = 0; i < document.forms.length; i++) {
		if (true) { //(sex[i].checked) {
		  txt = txt + document.forms[i].value + " "; // //sex[i].value + " ";
		}
	  }
	  
	  if (txt.length==0)
		txt = " nada! ";
	  
	  return (txt);// + sex.name + " ";
	}
	
	
	function devCuentaCaract(){
		var cont = parseInt(document.getElementById('sugerencias').value.length);
		var len = parseInt(document.getElementById('sugerencias').getAttribute("maxlength"));
		//document.getElementById('cadInnerHTML').innerHTML = ' function devCuentaCaract(): sugerencias:  maxlength: ' +len+ ' | cont: ' +cont;

		if (cont == len) {
			document.getElementById('numCaractRest').style = "color:red";		
			document.getElementById('numCaractRest').innerHTML = '' +cont;
		//document.getElementById('numCaractRest').innerHTML = "<span style='color:RED'> " +cont+ "</span> ";				
		} 
		if (cont < len)  { 
			document.getElementById('numCaractRest').style = "color:black";		
			document.getElementById('numCaractRest').innerHTML = '' +cont;
		//document.getElementById('numCaractRest').innerHTML = "<span style='color:black'> " +cont+ "</span> ";	
		}

		document.getElementById('numCaractRest').innerHTML = cont;		
		return true;
	}	
		
	
	function popUp() {	
		
		//alert("En popUp() !!!");	
		//recorre();
		var d = new Date();
		
		//var numMes = d.getMonth()+1;
		document.getElementById('fechaactual').value = obtenerFechaActual(); //d.getDate() + '/' + numMes + '/' + d.getFullYear();
		//document.getElementById('horaactual').value = obtenerHoraActual(); //d.getHours() + ':' + d.getMinutes();
		
		var cad = "";
		cad += "NomyApe: " + document.getElementById('nomyape').value;
		cad += "\nEmail: " + document.getElementById('email').value;
		cad += "\nCod Postal: " + document.getElementById('codpostal').value;		
		cad += "\nSexo: " +  getTxtSexo();//document.getElementsByName('sexo')[0].value;
		//.getElementById('sexo').value;
	    //cad += "\nCapturas carnet alberguista: " + document.getElementById('files').value;				
		cad += "\nFecha 1a visita: " + document.getElementById('fechavis').value;				
		cad += "\nHora 1a visita: " + document.getElementById('timecontrolvis').value;				
		cad += "\nURL web/blog: " + document.getElementById('urlweb').value;
		cad += "\nNavegador: " + document.getElementById('navegador').value;
		//Textarea
		cad += "\nSugerencias: " + document.getElementById('sugerencias').value;
		//Checkbox
		cad += "\nAceptacion Politica Privacidad: " + document.getElementById('aceptacion').value;
		// los Hidden
		cad += "\nFecha actual: " + document.getElementById('fechaactual').value;
		alert(cad);
	}
	
	function obtenerFechaActual() {	
		var d = new Date();
		var numMes = d.getMonth()+1;
		var cadFechaActual = "";
		cadFechaActual = d.getDate() + '/' + numMes + '/' + d.getFullYear();
	   document.getElementById('fechaactual').value = cadFechaActual;
		return cadFechaActual;
	}
	
	function obtenerHoraActual() {	
		var d = new Date();
		var cadHoraActual = "";
		cadHoraActual =	d.getHours() + ':' + d.getMinutes();;
		return cadHoraActual;
	}	


	// mio msg de texto al hacer 'onMouseOver' sobre una elemento
	function textoOnMouseOverElemento(idElem, txt) {	
		document.getElementById(idElem).innerHTML = txt;			
		//var cadHoraActual = "";
		//document.getElementById(idElem).alt = txt;		
		//document.getElementById(idElem).src = "";		
		//return cadHoraActual;
	}	
	
	// mio msg de texto al hacer 'onMouseOut' sobre un elemento
	function textoOnMouseOutElemento(idElem, txt) {	
		document.getElementById(idElem).innerHTML = txt;			
		//var cadHoraActual = "";
		//document.getElementById(idElem).alt = txt;		
		//document.getElementById(idElem).src = "";		
		//return cadHoraActual;
	}		



   // Del FORM AVANZADO (cod_javascript1.js)
	var myVideo = document.getElementById("videoAjustable2"); // 'videoAdjustable' debe ser el name del selector de tamaño de video 

	addEventListener('load',inicio,false);

   function inicio()
        {document.getElementById('lineaEdad').addEventListener('change',cambioEdad,false);
		 //document.getElementById('videoAjustable2').addEventListener('change',makeSize,false);
		}

	function cambioEdad()
        {document.getElementById('edadSpan').innerHTML=document.getElementById('lineaEdad').value;}
	
	function makeSize(s) { 
		//alert("En makeSize(" +s+ ") !!!");
		s = document.getElementById('lineaVideoSize').value;
		document.getElementById("video1").width = s*5; 
		video1.width = s*10; 
	}
 	
	function playPause() {
	  var objMiVideo = document.getElementById("video1");		
	  if (objMiVideo.paused) 
		objMiVideo.play(); 
	  else 
		objMiVideo.pause(); 
	} 



	function fechaYHoraActual() {	
		var d = new Date();
		var numMes = d.getMonth()+1;
		var numDia = d.getDate();
		
		document.getElementById('timecontrolvis').value = d.getHours()+ ':' +d.getMinutes();			

  //numDia=4;	
		if (numDia>0 && numDia<10)
			numDia = "0" +numDia;
  //numMes=1;
		if (numMes>0 && numMes<10)
			numMes = "0" +numMes;
		//document.getElementById('txtAnuncio').innerHTML = d.getFullYear() + '-' +numMes + '-' + numDia; 
		document.getElementById('fechavis').value = d.getFullYear() + '-' +numMes + '-' + numDia; //numDia + '-' +numMes + '-' + d.getFullYear();
	}


 function handleFiles(files) {
	 const fileList = document.getElementById('file-list');
	 fileList.innerHTML = '';

	 for (let i = 0; i < files.length; i++) {

	   const file = files[i];
	   const listItem = document.createElement('li');
	   const fileName = document.createTextNode(file.name);
	   const removeButton = document.createElement('button');
	   removeButton.innerHTML = 'X';
	   removeButton.onclick = function() {
	     fileList.removeChild(listItem);
	     //document.getElementById('ficherosupload').value = '';
	   };
	   listItem.appendChild(fileName);
	   listItem.appendChild(removeButton);
	   fileList.appendChild(listItem);
	}
	 
 }
