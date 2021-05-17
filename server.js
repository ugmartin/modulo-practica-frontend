const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

const createUser = (req, res) => {
    const loginData = loginAdapter(req);
    console.log(req.body);
    const isValid = validateLoginData(loginData);
    var data = responseAdapter(isValid, loginData);
    res.json({ data });
};
//this is a comment
const loginAdapter = (req) => {
    const loginData = {
        usuario: req.body.user,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmpwd,
    }
    return loginData;
}
const responseAdapter = (isValid, loginData) =>{
    var data = {
        message: "Usuario: " + loginData.usuario + "  fue creado muy exitosamente"
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

const getUser = (req, res) => {
    let userId = req.query.id;

    var data = {
        user: {
           id : userId,
           name:  "Test"
        }
    }

    res.json({ data });
};

app.post('/send', createUser);
app.get('/getUser', getUser);

app.listen(port, () => console.log(`Listening on port ${port}!`));
