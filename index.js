exports.handler = async (event) => {
    console.log(event);
    const loginData = loginAdapter(event);
   
    const isValid = validateLoginData(loginData);
    var data = responseAdapter(isValid, loginData);
    return data;
};


const loginAdapter = (body) => {
    const loginData = {
        usuario: body.user,
        email: body.email,
        password: body.password,
        confirmPassword: body.confirmpwd,
    }
    return loginData;
}
const responseAdapter = (isValid, loginData) =>{
    var data = {
        message: "Usuario: " + loginData.usuario + "  fue creado exitozamente"
    }

    if (!isValid) {
        data.message = "Ocurrio un error al crear el usuario " + loginData.usuario;
    }
    return data;
}

const validateLoginData = (loginData) => {
    console.log(loginData);

    if (required(loginData.usuario) && required(loginData.email)
        && required(loginData.password) && required(loginData.confirmPassword)) {
        return true;
    }
    else
        return false;
}

function required(inputtx) {
    if (inputtx) {

        return true;
    }
    return false;
}
