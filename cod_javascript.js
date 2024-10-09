

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
