export const onlyNumber = (e) => {
    const re = /^[0-9\b]+$/;
    return !!(e === "" || re.test(e));
};

/*** Convierte TEA a TEM */
export const toTEM = (tea) => {
    const localTEA = tea / 100;

    console.log("localTEA", localTEA);
    const localBase = 1 + localTEA;
    console.log("localBase", localBase);
    const periodo = 1 / 12;
    console.log("periodo", periodo);
    let localTEM = Math.pow(localBase, periodo.toFixed(9)) - 1;
    localTEM = localTEM * 100;

    console.log(`Convirtiendo TEA: ${tea}% a TEM: ${localTEM}%`);

    return localTEM.toFixed(9);
};

export const calculaCuota = (capital, tem, periodo) => {
    const interes = tem / 100;
    const base = 1 + interes;
    const potencia = Math.pow(base, periodo);
    const base1 = potencia * interes;
    const base2 = potencia - 1;
    const cuota = capital * (base1 / base2);

    console.log(`Calculando cuota: ${cuota.toFixed(2)}`);
    return cuota;
};

export const calculaInteres = (capital, tem) => {
    const interes = tem / 100;

    const montoInteres = capital * interes;

    console.log(`Calculando interes: ${montoInteres.toFixed(2)}`);
    return montoInteres;
};

export const calculaCapital = (cuota, interes) => {
    const capital = cuota - interes;

    console.log(`Calculando capital: ${capital.toFixed(2)}`);
    return capital;
};

export const calculaTotalFinanciado = (monto, inicial, desgravamen) => {
    console.log("monto: " + monto);
    console.log("inicial: " + inicial);
    console.log("desgravamen: " + desgravamen);

    const total = monto - inicial + desgravamen;
    console.log("total: " + total);
    return total;
};

export const commify = (n) => {
    var parts = n.toString().split(".");

    const numberPart = parts[0];
    const decimalPart = parts[1];
    const thousands = /\B(?=(\d{3})+(?!\d))/g;

    return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");
};
