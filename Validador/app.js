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
    getName() {
        return this.#name;
    }
    getSurname() {
        return this.#surname;
    }
    getBirtDay() {
        return this.#birtday;
    }
    getSalary() {
        return this.#salary;
    }
    getDni() {
        return this.#dni;
    }
    getEmail() {
        return this.#email;
    }
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
let elementos = [...employees];
let flags = {
    name: "asc",      
    surname: "asc",
    birtday: "asc",   
    salary: "asc",   
};

function refreshTabla() {
    tabla.innerHTML = ""; 
    elementos.forEach(empleado => {
        tabla.innerHTML += empleado.toString(); 
    });
}

// Funciones de ordenación
function orderSalary() {
    if (flags.salary === "asc") {
        elementos.sort((a, b) => b.getSalary() - a.getSalary()); 
        flags.salary = "desc"; 
    } else {
        elementos.sort((a, b) => a.getSalary() - b.getSalary()); 
        flags.salary = "asc"; 
    }
    refreshTabla();
}

function orderBirthDay() {
    if (flags.birtday === "asc") {
        elementos.sort((a, b) => b.getBirtDay() - a.getBirtDay()); 
        flags.birtday = "desc"; 
    } else {
        elementos.sort((a, b) => a.getBirtDay() - b.getBirtDay()); 
        flags.birtday = "asc"; 
    }
    refreshTabla();
}

function ordenarSurname() {
    if (flags.surname === "asc") {
        elementos.sort((a, b) => b.getSurname().localeCompare(a.getSurname())); 
        flags.surname = "desc"; 
    } else {
        elementos.sort((a, b) => a.getSurname().localeCompare(b.getSurname())); 
        flags.surname = "asc"; 
    }
    refreshTabla();
}

function orderName() {
    if (flags.name === "asc") {
        elementos.sort((a, b) => b.getName().localeCompare(a.getName()));
        flags.name = "desc";
    } else {
        elementos.sort((a, b) => a.getName().localeCompare(b.getName())); 
        flags.name = "asc"; 
    }
    refreshTabla();
}


document.getElementById("nombre").addEventListener("click", orderName);
document.getElementById("apellido").addEventListener("click", ordenarSurname);
document.getElementById("nacimiento").addEventListener("click", orderBirthDay);
document.getElementById("sueldo").addEventListener("click", orderSalary);


window.onload = refreshTabla;


document.getElementById("envia_formulario").addEventListener("click", function(event) {
    event.preventDefault();

    let nombre = document.getElementById("nombre").value.trim();
    let apellidos = document.getElementById("apellidos").value.trim();
    let nacimiento = document.getElementById("nacimiento").value.trim();
    let sueldo = document.getElementById("sueldo").value.trim();
    let dni = document.getElementById("dni").value.trim();
    let email = document.getElementById("email").value.trim();


    let dniRegex = /^[0-9]{8}[A-Za-z]$/; 
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    let valid = true;
    if (!nombre) {
        valid = false;
        document.getElementById("nombre").style.borderColor = "red";
    } else {
        document.getElementById("nombre").style.borderColor = "";
    }

    if (!apellidos) {
        valid = false;
        document.getElementById("apellidos").style.borderColor = "red";
    } else {
        document.getElementById("apellidos").style.borderColor = "";
    }

    if (!nacimiento || isNaN(nacimiento) || nacimiento.length !== 4) {
        valid = false;
        document.getElementById("nacimiento").style.borderColor = "red";
    } else {
        document.getElementById("nacimiento").style.borderColor = "";
    }

    if (!sueldo || isNaN(sueldo)) {
        valid = false;
        document.getElementById("sueldo").style.borderColor = "red";
    } else {
        document.getElementById("sueldo").style.borderColor = "";
    }

    if (!dniRegex.test(dni)) {
        valid = false;
        document.getElementById("dni").style.borderColor = "red";
    } else {
        document.getElementById("dni").style.borderColor = "";
    }

    if (!emailRegex.test(email)) {
        valid = false;
        document.getElementById("email").style.borderColor = "red";
    } else {
        document.getElementById("email").style.borderColor = "";
    }

    if (valid) {
        let newEmployee = new Employee(nombre, apellidos, nacimiento, sueldo, dni, email);
        employees.push(newEmployee);
        elementos.push(newEmployee); 
        refreshTabla();  
    } else {
        alert("Por favor, revisa los campos marcados.");
    }
});
