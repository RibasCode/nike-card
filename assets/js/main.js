// Selecionem tots els botons de Size
const sizes = document.querySelectorAll('.size');
// Selecionem tots els botons de colors
const colors = document.querySelectorAll('.color');
// Selecionem totes les img de les sabates
const shoes = document.querySelectorAll('.shoe');
// Selecionem tots els degradats
const gradients = document.querySelectorAll('.gradient');
// Selecionem el background de la sabata per modificarlo al responsive
const shoeBg = document.querySelector('.shoeBackground');

// Al comensament del color previ asignat es el blau perque per defecte comensem amb el blau
let prevColor = "blue";
// Al comensament deixem que la animació del gradient s'inici amb normalitat
let animationEnd = true;


function changeSize(){
    // Eliminem totes les clases active dels botons Size 
    sizes.forEach(size => size.classList.remove('active'));
    // Afegim la class active al boto Size que hem clicat
    this.classList.add('active');
}

function changeColor(){
    // Quan apretem un color la variable voleana pot retornar 2 valors true o false, si es true la animacio s'executara, si es false no i el codi es parara aquí, fins que torni a ser true i segueixi amb normalitat.
    // "!animationEnd" means "animationEnd===false"
    if(!animationEnd) return;

    // Agafa el el contingut del atribut primary dins del HTML (codi hexadecimal) 
    let primary = this.getAttribute('primary');
    // Agafa el el contingut del atribut color dins del HTML (blue, red, green etc...) 
    let color = this.getAttribute('color');
    // Coloca la dada recollida de la variable de asobre anomenada color i la coloca dins del atribut color dins de la clase .shoe del HTML
    let shoe = document.querySelector(`.shoe[color="${color}"]`);
    // Coloca la dada recollida de la variable de asobre anomenada color i la coloca dins del atribut color dins de la clase .gradient del HTML la qual si es de cert color se li apricaran els estils del .gradient[color="blue"] on sespecifica el degradat que ha de seguir
    let gradient = document.querySelector(`.gradient[color="${color}"]`);
    // Posem el hueco del atribut apunt per en la linea de abaix retindre el color 
    let prevGradient = document.querySelector(`.gradient[color="${prevColor}"]`);

    // Preparem i asignem el valor del color dins del atribut  
    if(color == prevColor) return;

    // Eliminem totes les clases active dels botons de colors   
    colors.forEach(c => c.classList.remove('active'));
    // Afegim la class active al boto de color que hem clicat
    this.classList.add('active');

    // Cambia el color dins del CSS de la variable --primary per el color hexadecimal que agafem del HTML amb el getAttribute ('primary')
    document.documentElement.style.setProperty('--primary', primary);
    // Eliminem totes les clases show de les sabates perque no es mostri cap
    shoes.forEach(s => s.classList.remove('show'));
    shoe.classList.add('show');

    // Eliminem totes les clases first i second dels gradients perque no es mostri cap
    gradients.forEach(g => g.classList.remove('first', 'second'));
    // Afegeix la class first al gradient que hem agafat previament atraves del color
    gradient.classList.add('first');
    // Afegeix la class second al gradient que hem agafat previament atraves del color que amb el CSS i un Z-index es veura per sota del first
    prevGradient.classList.add('second');

    // Al final el color previ asignat es el color clickat
    prevColor = color;
    // Variable boleana per fer que la animacio del gradient acabi avans de pitxar el seguent
    animationEnd = false;

    gradient.addEventListener('animationend', () => {
        animationEnd = true;
    })
}

// Per cada size que clikem sexecuta el codi de la funció changeSize()
sizes.forEach(size => size.addEventListener('click', changeSize));
// Per cada color que clikem sexecuta el codi de la funció changeColor()
colors.forEach(c => c.addEventListener('click', changeColor));

// Camviar la altura del background de la sabata
let x = window.matchMedia("(max-width: 1000px)");

function changeHeight(){
    // x.matches es com dir @media (max-width: 1000px){}
    if(x.matches){
        // Agafa el valor height catual de la sabata
        let shoeHeight = shoes[0].offsetHeight;
        // apliquem el nou height al background de la sabata 
        shoeBg.style.height = `${shoeHeight * 1.4}px`;
    }
    else{
        // si no esta dins de la mediaquery seguira tenint el seu valor original
        shoeBg.style.height = "475px";
    }
}
// Executem la funció Change heit de adalt
changeHeight();

window.addEventListener('resize', changeHeight);