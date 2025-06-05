import { generateKeyPairSync } from 'crypto';
import fs from 'fs';
import path from 'path';

try {
    console.log('Starting key generation...');
    
    // Generate RSA key pair
    const { privateKey, publicKey } = generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    });



    // Create keys directory if it doesn't exist
    const keysDir = path.join(__dirname, '../keys');
    console.log('Keys directory path:', keysDir);
    
    if (!fs.existsSync(keysDir)) {
        console.log('Creating keys directory...');
        fs.mkdirSync(keysDir, { recursive: true });
    }

    // Write keys to files
    const privateKeyPath = path.join(keysDir, 'private.pem');
    const publicKeyPath = path.join(keysDir, 'public.pem');
    
    console.log('Writing private key to:', privateKeyPath);
    fs.writeFileSync(privateKeyPath, privateKey);
    
    console.log('Writing public key to:', publicKeyPath);
    fs.writeFileSync(publicKeyPath, publicKey);
    
} catch (error) {
    console.error('Error generating keys:', error);
    process.exit(1);
} 