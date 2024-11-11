
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {  // Si el método de envío es POST

    $response = array();  // Creamos un array de respuestas
    $errors = array();  // Creamos un array para errores

    if (isset($_POST['fullName']) && ! empty(trim($_POST['fullName']))) {  // Si existe el dato 'fullName' y no está en blanco
        $nombreCompleto = htmlspecialchars($_POST["fullName"]);  // Obtenemos el nombre mediante la función htmlspecialchars() para prevenir ataques
        $response['fullName'] = "El nombre introducido es: " . $nombreCompleto;  // Añadimos el nombre introducido como respuesta
    } else {  // En caso contrario
        $response['fullName'] = "El nombre completo es obligatorio.";  // Añadimos el texto de error como respuesta
        $errors[] = "fullName";  // Añadimos el error
    }

    if (isset($_POST['email']) && ! empty(trim($_POST['email']))) {  // Igual que antes

        $email = trim($_POST['email']);  // Quitamos espacios en blanco
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // El correo electrónico es válido
            $response['email'] = "El email introducido es: " . htmlspecialchars($email);
        } else {
            // El correo electrónico no es válido
            $response['email'] = "El email introducido no es válido.";
            $errors[] = "email";
        }
        
    } else {
        $response['email'] = "El correo electrónico es obligatorio.";
        $errors[] = "email";
    }

    if (isset($_POST['phone']) && ! empty(trim($_POST['phone']))) {

        $phone = trim($_POST['phone']);
        $pattern = "/^\(\d{3}\) \d{3}-\d{4}$/"; // Patrón regex para (123) 456-7890
        
        if (preg_match($pattern, $phone)) {
            $response['phone'] = "El teléfono introducido es: " . htmlspecialchars($phone);
        } else {
            $response['phone'] = "El teléfono introducido no es válido. Debe tener el formato (123) 456-7890.";
            $errors[] = "phone";
        }
        
    } else {
        $response['phone'] = "El teléfono es obligatorio";
        $errors[] = "phone";
    }

    if (isset($_POST['birthdate']) && ! empty(trim($_POST['birthdate']))) {
        $birthdate = trim($_POST['birthdate']);  // Quitamos los espacios en blanco
        $today = new DateTime();  // Creamos la variable para la fecha actual
        $dob = new DateTime($birthdate);  // Creamos la variable para la fecha introducida
        $age = $today->diff($dob)->y;  // Calculamos la diferencia de años entre la fecha actual y la introducida

        if ($age >= 18) {
            // La persona es mayor de edad
            $response['birthdate'] = "La fecha introducida es válida. Edad: " . $age;
        } else {
            // La persona no es mayor de edad
            $response['birthdate'] = "Debe ser mayor de 18 años.";
            $errors[] = "birthdate";
        }
    } else {
        $response['birthdate'] = "La fecha de nacimiento es obligatoria.";
        $errors[] = "birthdate";
    }

    if (isset($_POST['gender'])) {
        $gender = htmlspecialchars($_POST["gender"]);
        $response['gender'] = "El género introducida es: " . $gender;
    } else {
        $response['gender'] = "Es obligatorio seleccionar género.";
        $errors[] = "gender";
    }

    //$introHabilidades = "Las habilidades seleccionadas son: ";
    //$response['introHabilidades'] = $introHabilidades;

    $habilidades = array();  // Creamos un array para las habilidades
    $algunaHab = false;  // Creamos una variable para establecer si se seleccionó alguna variable

    if (isset($_POST['programming'])) {  // Si se seleccionó programación
        $habilidades[] = htmlspecialchars($_POST["programming"]);  // Guardamos esta habilidad
        $algunaHab = true;  // Establecemos que se ha seleccionado al menos una habilidad
    }

    if (isset($_POST['design'])) {
        $habilidades[] = htmlspecialchars($_POST["design"]);
        $algunaHab = true;
    }

    if (isset($_POST['marketing'])) {
        $habilidades[] = htmlspecialchars($_POST["marketing"]);
        $algunaHab = true;
    }

    if (isset($_POST['writing'])) {
        $habilidades[] = htmlspecialchars($_POST["writing"]);
        $algunaHab = true;
    }

    if (isset($_POST['support'])) {
        $habilidades[] = htmlspecialchars($_POST["support"]);
        $algunaHab = true;
    }

    $response['habilidades'] = $habilidades;  // Guardamos las habilidades como respuesta

    if( ! $algunaHab) {  // Si no se marcó ninguna habilidad
        $errors[] = "habilidades";  // Establecemos el error correspondiente
    }

    if (isset($_FILES['profilePic']) && $_FILES['profilePic']['error'] == 0) {  // Si se seleccionó una imagen y se cargó correctamente
        
        $allowed_types = array('jpg', 'jpeg', 'png');  // Establecemos las extensiones permitidas
        $file_ext = pathinfo($_FILES['profilePic']['name'], PATHINFO_EXTENSION);  // Guardamos la extensión de la imagen
    
        if (in_array($file_ext, $allowed_types)) {  // Si la extensión de la imagen es una de las permitidas

            if ($_FILES['profilePic']['size'] <= 300000) { // 300kb en bytes
                $profilePicName = htmlspecialchars(basename($_FILES["profilePic"]["name"]));
                $response['profilePic'] = "La imagen seleccionada es: " . $profilePicName;
            } else {
                $response['profilePic'] = "El tamaño del archivo no debe superar los 300kb.";
                $errors[] = "profilePic";
            }

        } else {
            $response['profilePic'] = "El tipo de archivo debe ser jpg, jpeg, o png.";
            $errors[] = "profilePic";
        }
    } else {
        $response['profilePic'] = "No se ha seleccionado foto.";
    }

    if (isset($_POST['country']) && ! empty(trim($_POST['country']))) {
        $country = htmlspecialchars($_POST["country"]);
        $response['country'] = "El country introducido es: " . $country;
    } else {
        $response['country'] = "Es obligatorio seleccionar país.";
        $errors[] = "country";
    }

    if (isset($_POST['description']) && ! empty(trim($_POST['description']))) {
        $description = htmlspecialchars($_POST["description"]);
        $response['description'] = "El description introducido es: " . $description;
    } else {
        $response['description'] = "No se ha introducido descripción.";
    }

    if (isset($_POST['terms'])) {
        //$terms = htmlspecialchars($_POST["terms"]);
        $response['terms'] = "Términos aceptados";
    } else {
        $response['terms'] = "Es obligatorio aceptar los términos.";
        $errors[] = "terms";
    }

    $response['errors'] = $errors;  // Establecemos los errores en la respuesta a enviar

    //header('Content-Type: application/json');
    echo json_encode($response);  // Enviamos la respuesta codificada como JSON
}
?>

