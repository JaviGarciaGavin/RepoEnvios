"use strict"

class Employee {
    #name
    #surname
    #birtday
    #salary
    #dni
    #email

    constructor(name, surname, birtday, salary, dni, email) {
        this.#name = name;
        this.#surname = surname;
        this.#birtday = birtday;
        this.#salary = salary;
        this.#dni = dni;
        this.#email = email;
    }

    toString() {
        return `<tr><td>${this.#name}</td>
                <td>${this.#surname}</td>
                <td>${this.#birtday}</td>
                <td>${this.#salary}</td>
                <td>${this.#dni}</td>
                <td>${this.#email}</td></tr>`;
    }
    getName() { return this.#name; }
    getSurname() { return this.#surname; }
    getBirtDay() { return this.#birtday; }
    getSalary() { return this.#salary; }
    getDni() { return this.#dni; }
    getEmail() { return this.#email; }
}

let employees = [
    new Employee("Paco", "Fiestas", 1997, 33000, "12345678A", "paco@fiestas.com"),
    new Employee("Chindas", "Vinto", 2001, 27000, "23456789B", "chindas@vinto.com"),
    new Employee("Chingas", "Perma", 1772, 38000, "34567890C", "chingas@perma.com"),
    new Employee("Perma", "Trago", 1991, 74000, "45678901D", "perma@trago.com"),
    new Employee("Misty", "Articuno", 1987, 37000, "56789012E", "misty@articuno.com"),
    new Employee("Giovanni", "Vazquez", 1000, 20000, "67890123F", "giovanni@vazquez.com"),
    new Employee("Lagartijo", "Iguana", 1993, 54000, "78901234G", "lagartijo@iguana.com"),
];

let tabla = document.getElementById("lista-empleados");

let flags = {
    name: "asc",      
    surname: "asc",
    birtday: "asc",   
    salary: "asc",   
};

// Carga inicial de la tabla
window.onload = refreshTabla;

// Función para refrescar la tabla
function refreshTabla() {
    tabla.innerHTML = "";
    employees.forEach(empleado => {
        tabla.innerHTML += empleado.toString();
    });
}

// Cosas que ordenan cosas

//Cosa que ordena salarios
function orderSalary() {
    if (flags.salary === "asc") {
        employees.sort((a, b) => b.getSalary() - a.getSalary()); 
        flags.salary = "desc"; 
    } else {
        employees.sort((a, b) => a.getSalary() - b.getSalary()); 
        flags.salary = "asc"; 
    }
    refreshTabla();
}
//Cosa que ordena cumpleaños
function orderBirthDay() {
    if (flags.birtday === "asc") {
        employees.sort((a, b) => b.getBirtDay() - a.getBirtDay()); 
        flags.birtday = "desc"; 
    } else {
        employees.sort((a, b) => a.getBirtDay() - b.getBirtDay()); 
        flags.birtday = "asc"; 
    }
    refreshTabla();
}
//Cosa que ordena apellidos
function orderSurname() {
    if (flags.surname === "asc") {
        employees.sort((a, b) => b.getSurname().localeCompare(a.getSurname())); 
        flags.surname = "desc"; 
    } else {
        employees.sort((a, b) => a.getSurname().localeCompare(b.getSurname())); 
        flags.surname = "asc"; 
    }
    refreshTabla();
}

//Cosa que ordena nombre
function orderName() {
    if (flags.name === "asc") {
        employees.sort((a, b) => b.getName().localeCompare(a.getName()));
        flags.name = "desc";
    } else {
        employees.sort((a, b) => a.getName().localeCompare(b.getName())); 
        flags.name = "asc"; 
    }
    refreshTabla();
}

// Le doy funcion a los botones de la tabla
document.getElementById("nombre").addEventListener("click", orderName);
document.getElementById("apellido").addEventListener("click", orderSurname);
document.getElementById("nacimiento").addEventListener("click", orderBirthDay);
document.getElementById("sueldo").addEventListener("click", orderSalary);


// El blur 
function validateField(input, validationFn) {
    input.addEventListener("blur", function() {
        if (!validationFn(this.value)) {
            this.style.borderColor = "red";  // no valido
        } else {
            this.style.borderColor = "green";  //valido
        }
    });
}
// Cosa que valida cosas
validateField(document.getElementById("nombre"),(value)=>value.trim()!==""); //Valida que la cosa no sea nula
validateField(document.getElementById("apellidos"), (value) => value.trim() !== ""); //Valida que la cosa no sea nula
validateField(document.getElementById("nacimiento"), (value) => !isNaN(value));//Valida que la cosa no sea nula 
validateField(document.getElementById("sueldo"), (value) => !isNaN(value));//Valida que la cosa no sea nula
validateField(document.getElementById("dni"), (value) => /^[0-9]{8}[A-Za-z]$/.test(value));//Valida que el DNI sea un numero aceptable
validateField(document.getElementById("email"), (value) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)); //Valida que el email sea algo@algo.

// Cosa que envia la cosa a la tabla
document.getElementById("envia_formulario").addEventListener("click", function(event) {
    event.preventDefault();

    let nombre = document.getElementById("nombre").value.trim();
    let apellidos = document.getElementById("apellidos").value.trim();
    let nacimiento = document.getElementById("nacimiento").value.trim();
    let sueldo = document.getElementById("sueldo").value.trim();
    let dni = document.getElementById("dni").value.trim();
    let email = document.getElementById("email").value.trim();
    let valid = true;
    
    let fields = [
        {value: nombre, id: "nombre"},
        {value: apellidos, id: "apellidos"},
        {value: nacimiento, id: "nacimiento"},
        {value: sueldo, id: "sueldo"},
        {value: dni, id: "dni"},
        {value: email, id: "email"}
    ];

    fields.forEach(field => {
        let inputElement = document.getElementById(field.id);
        if (!field.value || (field.id === "nacimiento" && (isNaN(field.value) || field.value.length !== 4)) || 
            (field.id === "sueldo" && isNaN(field.value)) || 
            (field.id === "dni" && !/^[0-9]{8}[A-Za-z]$/.test(field.value)) || 
            (field.id === "email" && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(field.value))) {
            inputElement.style.borderColor = "red";
            valid = false;
        } else {
            inputElement.style.borderColor = "";
        }
    });

    if (valid) {
        let newEmployee = new Employee(nombre, apellidos, nacimiento, sueldo, dni, email);
        employees.push(newEmployee);
        refreshTabla();
    } else {
        alert("Por favor, revisa los campos marcados.");
    }
});
