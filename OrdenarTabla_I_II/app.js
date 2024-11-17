"use strict"

class Employee{
    #name
    #surname
    #birtday
    #salary

    constructor(name, surname, birtday, salary){
        this.#name = name;
        this.#surname = surname;
        this.#birtday = birtday;
        this.#salary = salary;

    }

    toString(){
        return `<tr><td>${this.#name}</td><td>${this.#surname}</td><td>${this.#birtday}</td><td>${this.#salary}</td></tr>`;
    }
    getName(){
        return this.#name;
    }
    getSurname(){
        return this.#surname;
    }
    getBirtDay(){
        return this.#birtday;
    }
    getSalary(){
        return this.#salary;
    }
}
let employees = [
    new Employee("Paco","Fiestas",1997,33000),
    new Employee("Chindas","Vinto",2001,27000),
    new Employee("Chingas","Perma",1772,38000),
    new Employee("Perma","Trago",1991,74000),
    new Employee("Misty","Articuno",1987,37000),
    new Employee("Giovanni","Vazquez",1000,20000),
    new Employee("Lagartijo","Iguana",1993,54000),
]

let tabla = document.getElementById("lista-empleados");
let elementos = [];
employees.forEach(empleado => { 
    tabla.innerHTML += empleado;
    elementos.push(empleado);
});
let flag = "";

function refreshTabla(){
    tabla.innerHTML="";
    elementos.forEach(empleado => { 
        tabla.innerHTML += empleado;
    });
}

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
function orderBirthDay() {
    if(flag=="birtday"){
        let ordenNac = elementos.sort((a,b) => {
            return b.getBirtDay() - a.getBirtDay();
        });
        flag="nacimientoReverse";
    }else{
        let ordenNac = elementos.sort((a,b) => {
            return a.getBirtDay() - b.getBirtDay();
        });
        flag="birtday";
    }
    refreshTabla();
}
function ordenarSurname() {
    if(flag=="surname"){
        let ordenApe = elementos.sort((a,b) => {
            return (b.getSurname()).localeCompare(a.getSurname());
        });
        flag="apellidoReverse";
    }else{
        let ordenApe = elementos.sort((a,b) => {
            return (a.getSurname()).localeCompare(b.getSurname());
        });
        flag="surname";
    }
    refreshTabla();
}

function orderName() {
    if(flag=="name"){
        let ordenNom = elementos.sort((a,b) => {
            return (b.getName()).localeCompare(a.getName());
        });
        flag="nombreReverse";
    }else{
        let ordenNom = elementos.sort((a,b) => {
            return (a.getName()).localeCompare(b.getName());
        });
        flag="name";
    }
    refreshTabla();
}
document.getElementById("nombre").addEventListener("click", orderName);
document.getElementById("apellido").addEventListener("click", ordenarSurname);
document.getElementById("nacimiento").addEventListener("click", orderBirthDay);
document.getElementById("sueldo").addEventListener("click", orderSalary);