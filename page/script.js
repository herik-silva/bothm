const img = document.querySelector('img');
img.style.transition = '.2s ease-out all';

const buttonFechar = document.getElementById('esconderComandos');
buttonFechar.addEventListener('click', ()=>{
    const comandos = document.querySelector('.comandos');
    comandos.style.height = '0%';

    setTimeout(()=>{
        comandos.style.display = 'none';
    },500)
})

const buttonComandos = document.getElementById('mostrarComandos');
buttonComandos.addEventListener('click', ()=>{
    const comandos = document.querySelector('.comandos');
    comandos.style.display = 'block';
    
    setTimeout(()=>{
        comandos.style.height = '80%';
    },1)
})
