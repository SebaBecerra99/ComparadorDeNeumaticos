function calcularDiametro(ancho, perfil, aro) {
    return (2 * (ancho * (perfil / 100))) + (aro * 25.4);
}

function generarSugerencias(ancho, perfil, aro) {
    let diametroOriginal = calcularDiametro(ancho, perfil, aro);
    let sugerencia1 = null;
    let sugerencia2 = null;

    for (let ajuste of [5, -5, 10, -10]) {
        let nuevoAncho = ancho + ajuste;
        let nuevoPerfil = perfil + ajuste;
        let nuevoDiametro = calcularDiametro(nuevoAncho, perfil, aro);
        let porcentajeDiferencia = Math.abs((nuevoDiametro - diametroOriginal) / diametroOriginal) * 100;
        
        if (porcentajeDiferencia <= 3.1) {
            if (!sugerencia1) {
                sugerencia1 = `${nuevoAncho}/${perfil}/${aro}`;
            } else {
                sugerencia2 = `${nuevoAncho}/${perfil}/${aro}`;
                break;
            }
        }
        
        nuevoDiametro = calcularDiametro(ancho, nuevoPerfil, aro);
        porcentajeDiferencia = Math.abs((nuevoDiametro - diametroOriginal) / diametroOriginal) * 100;
        
        if (porcentajeDiferencia <= 3.1) {
            if (!sugerencia1) {
                sugerencia1 = `${ancho}/${nuevoPerfil}/${aro}`;
            } else {
                sugerencia2 = `${ancho}/${nuevoPerfil}/${aro}`;
                break;
            }
        }
    }

    document.getElementById("sugerencia1").innerText = sugerencia1 ? `Opción 1: ${sugerencia1}` : "No hay sugerencias dentro del rango";
    document.getElementById("sugerencia2").innerText = sugerencia2 ? `Opción 2: ${sugerencia2}` : "";
}

function compararNeumaticos() {
    let ancho1 = parseFloat(document.getElementById("ancho1").value);
    let perfil1 = parseFloat(document.getElementById("perfil1").value);
    let aro1 = parseFloat(document.getElementById("aro1").value);
    
    let ancho2 = parseFloat(document.getElementById("ancho2").value);
    let perfil2 = parseFloat(document.getElementById("perfil2").value);
    let aro2 = parseFloat(document.getElementById("aro2").value);
    
    if (isNaN(ancho1) || isNaN(perfil1) || isNaN(aro1) || isNaN(ancho2) || isNaN(perfil2) || isNaN(aro2)) {
        alert("Por favor, ingrese valores válidos en todos los campos.");
        return;
    }

    let diametro1 = calcularDiametro(ancho1, perfil1, aro1);
    let diametro2 = calcularDiametro(ancho2, perfil2, aro2);
    
    let diferencia = Math.abs(diametro1 - diametro2);
    let porcentajeDiferencia = (diferencia / diametro1) * 100;
    
    let resultado = document.getElementById("resultado");
    if (porcentajeDiferencia <= 3) {
        resultado.innerHTML = `Los neumáticos son compatibles. Diferencia: ${porcentajeDiferencia.toFixed(2)}%`;
        resultado.style.color = "green";
    } else {
        resultado.innerHTML = `Los neumáticos NO son compatibles. Diferencia: ${porcentajeDiferencia.toFixed(2)}%`;
        resultado.style.color = "red";
    }
    
    generarSugerencias(ancho1, perfil1, aro1);
}
