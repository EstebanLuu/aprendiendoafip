require('dotenv').config(); // Importa dotenv para usar variables de entorno
const Afip = require('@afipsdk/afip.js');
const fs = require('fs');

// CUIT del contribuyente
const taxId = process.env.AFIP_CUIT;
// Usuario para ingresar a AFIP
const username = process.env.AFIP_USERNAME;
// Contraseña para ingresar a AFIP
const password = process.env.AFIP_PASSWORD;
// Alias para el certificado
const alias = process.env.AFIP_ALIAS;

// Ruta del certificado y clave privada de testing
const certTestPath = process.env.AFIP_CERTIFICATE_TEST_PATH;
const testKeyPath = process.env.AFIP_TEST_KEY_PATH;

// Creamos una instancia de la librería
const afip = new Afip({
    CUIT: taxId,
});

// Crear el certificado y clave privada
(async () => {
    try {
        const res = await afip.CreateCert(username, password, alias);

        fs.writeFileSync(certTestPath, res.cert, { encoding: 'utf8' });
        fs.writeFileSync(testKeyPath, res.key, { encoding: 'utf8' });

        console.log('Certificado y clave privada generados y guardados correctamente.');
    } catch (error) {
        console.error('Error al crear el certificado:', error);
    }
})();

module.exports = afip;
