
export const validator = (type, value) => {

    switch (type) {
        case 'email':
        case 'correo':
        case 'mail':
            if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)) {
                return "Invalid e-mail format";
            } else {
                return "";
            }

        case 'name':
        case 'surname':
        case 'Tattoo_artist':
            if (value.length > 75) {
                return "Escribe un nombre correcto"
            } else {
                return ""
            }
        case 'description':
            if (value.length > 255) {
                return "Incorrect description"
            } else {
                return ""
            }

        case 'shift':
            if (value.toLowerCase() !== "mañana" && value.toLowerCase() !== "tarde") {
                return "Elige: mañana o tarde"
            } else {
                return ""
            }

        case 'type_work':
            if (value.toLowerCase() !== "tattoo" && value.toLowerCase() !== "piercing") {
                return "Elige: tattoo o piercing"
            } else {
                return ""
            }

        case 'user_id':
        case 'artist_id':
            if (! /(?=.*?[0-9])/.test(value)) {
                return "Incorrect id";
            } else {
                return "";
            }

        case 'date':
            if (! /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(value)) {
                return "Date incorrect, must be YYYY-MM-DD";
            } else {
                return "";
            }
            
        case 'phone':
        case 'telefono':
            if (! /(?=.*?[0-9])/.test(value)) {
                return "Incorrect phone number";
            } else {
                return "";
            }

        case 'password':
        case 'password2':
        case 'contraseña':
            if (value.length < 4) {
                return "Write 4 characters at least"
            } else {

                //Checking the password format....

                // if (! /[\d()+-]/g.test(value)) {
                //     return "Invalid password format";
                // } 
                // else {
                return "";
                //  }
            }
    }
}