"use strict";
class Employee {
    #name;
    #surname;
    #birtday;
    #salary;
    #dni;
    #email;
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
    new Employee("Paco", "Fiestas", "1997-05-12", 33000, "12345678A", "paco@fiestas.com"),
    new Employee("Chindas", "Vinto", "2001-03-18", 27000, "23456789B", "chindas@vinto.com"),
    new Employee("Chingas", "Perma", "1772-09-25", 38000, "34567890C", "chingas@perma.com"),
    new Employee("Perma", "Trago", "1991-11-07", 74000, "45678901D", "perma@trago.com"),
    new Employee("Misty", "Articuno", "1987-01-28", 37000, "56789012E", "misty@articuno.com"),
    new Employee("Giovanni", "Vazquez", "1000-02-02", 20000, "67890123F", "giovanni@vazquez.com"),
    new Employee("Lagartijo", "Iguana", "1993-07-15", 54000, "78901234G", "lagartijo@iguana.com"),
];

let tabla = document.getElementById("lista-empleados");

function generateForm() {
    const formularioContainer = document.getElementById("formulario-contenedor");
    formularioContainer.innerHTML = ""; 

    const form = document.createElement("form");
    form.classList.add("formulario"); 
    const fields = [
        { label: 'Nombre', id: 'nombre', type: 'text', required: true },
        { label: 'Apellidos', id: 'apellidos', type: 'text', required: true },
        { label: 'Fecha Nacimiento', id: 'nacimiento', type: 'date', required: true },
        { label: 'Sueldo', id: 'sueldo', type: 'text', required: true },
        { label: 'DNI', id: 'dni', type: 'text', required: true },
        { label: 'Email', id: 'email', type: 'text', required: true }
    ];

    fields.forEach((field) => {
        const label = document.createElement("label");
        label.setAttribute("for", field.id);
        label.textContent = field.label;

        const input = document.createElement("input");
        input.setAttribute("type", field.type);
        input.setAttribute("id", field.id);
        if (field.placeholder) input.setAttribute("placeholder", field.placeholder);
        input.required = field.required;

        form.appendChild(label);
        form.appendChild(input);

        validateField(input, getValidationFn(field.id));
    });

    const button = document.createElement("button");
    button.textContent = "Añadir empleado";
    button.type = "button";
    button.classList.add("form-button");
    button.addEventListener("click", addEmployee); 

    form.appendChild(button);
    formularioContainer.appendChild(form);
}

// Validaciones por campo
function getValidationFn(fieldId) {
    switch (fieldId) {
        case "nombre":
        case "apellidos":
            return (value) => value.trim() !== "";
        case "nacimiento":
            return (value) => /^\d{4}-\d{2}-\d{2}$/.test(value);
        case "sueldo":
            return (value) => !isNaN(value) && parseFloat(value) > 0;
        case "dni":
            return (value) => /^[0-9]{8}[A-Za-z]$/.test(value);
        case "email":
            return (value) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        default:
            return () => true;
    }
}

function validateField(input, validationFn) {
    input.addEventListener("blur", function () {
        if (!validationFn(this.value)) {
            this.style.borderColor = "red"; 
        } else {
            this.style.borderColor = "green"; 
        }
    });
}


function addEmployee() {
    const nombre = document.getElementById("nombre").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const nacimiento = document.getElementById("nacimiento").value; 
    const sueldo = document.getElementById("sueldo").value.trim();
    const dni = document.getElementById("dni").value.trim();
    const email = document.getElementById("email").value.trim();
    const valid =
        nombre &&
        apellidos &&
        nacimiento &&
        !isNaN(sueldo) &&
        /^[0-9]{8}[A-Za-z]$/.test(dni) &&
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    if (!valid) {
        alert("Por favor, corrige los campos inválidos.");
        return;
    }
    const formattedDate = nacimiento.split("-").reverse().join("/");

    const newEmployee = new Employee(nombre, apellidos, formattedDate, sueldo, dni, email);
    employees.push(newEmployee);
    refreshTabla();
}

function refreshTabla() {
    tabla.innerHTML = "";
    employees.forEach((empleado) => {
        tabla.innerHTML += empleado.toString();
    });
}

window.onload = function () {
    generateForm();
    refreshTabla();



    function orderSalary() {
        if(flag=="salary"){
            let ordenSue = elementos.sort((a,b) => {
                return b.getSalary() - a.getSalary();
            });
            flag="sueldoReverse";
        }else{
            let ordenSue = elementos.sort((a,b) => {
                return a.getSalary() - b.getSalary();
            });
            flag="salary";
        }
            
        refreshTabla();
    }
};
