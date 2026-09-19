const axios = require('axios');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const AdmZip = require('adm-zip');
require('dotenv').config();

console.log("\x1b[36m\x1b[1m%s\x1b[0m", "\n===============================================");
console.log("\x1b[37m\x1b[1m%s\x1b[0m", "       ATOM MD - Secure Bootstrapper");
console.log("\x1b[32m\x1b[1m%s\x1b[0m", "          Created by Syntiox");
console.log("\x1b[31m\x1b[1m%s\x1b[0m", "  I AGREE TO THE TERMS: NO EDITING | NO LIABILITY");
console.log("\x1b[36m\x1b[1m%s\x1b[0m", "================================================\n");

const { execSync } = require('child_process');

// Get the user's secret key from their .env
const ATOM_SECRET_KEY = process.env.ATOM_SECRET_KEY;

if (!ATOM_SECRET_KEY) {
    console.log("\x1b[31m%s\x1b[0m", "[!] FATAL ERROR: ATOM_SECRET_KEY is missing in your .env file.");
    console.log("\x1b[33m%s\x1b[0m", "[!] Please add ATOM_SECRET_KEY to your .env and restart.");
    process.exit(1);
}

// Highly Secret URL Obfuscation
const _0x_b64 = 'YUhSMGNITTZMeTloZEc5dExuTjViblJwYjNndWRHOXdMMkZ3YVM5bVpYUmphQT09'; // Base64 of Base64 of URL
const GATEKEEPER_URL = Buffer.from(Buffer.from(_0x_b64, 'base64').toString(), 'base64').toString();

async function initializeSystem() {
    try {
        const timestampMs = Date.now();
        // Generate a time-based signature using the user's secret key
        const sig = crypto.createHmac('sha256', ATOM_SECRET_KEY)
                          .update(timestampMs.toString())
                          .digest('hex');

        console.log("🔒 Authenticating with ATOM servers...");
        const res = await axios.get(GATEKEEPER_URL, {
            params: { t: timestampMs, sig: sig },
            responseType: 'arraybuffer'
        });

        console.log(`🗜️ Decrypting and extracting core files...`);
        const zip = new AdmZip(res.data);
        zip.extractAllTo(__dirname, true);

        console.log(`📦 Installing core dependencies... This may take a minute.`);
        execSync('npm install --production', { stdio: 'inherit', cwd: __dirname });

        // Run the internal launcher
        if (fs.existsSync(path.join(__dirname, 'src/lib/launcher.js'))) {
            console.log("✅ Bootstrapping successful. Starting ATOM MD...");
            require('./src/lib/launcher.js');
        } else {
            throw new Error("Core component 'launcher.js' missing after extraction.");
        }

    } catch (error) {
        let errorMsg = error.message;
        if (error.response) {
            if (error.response.status === 403) {
                errorMsg = "Unauthorized! Your ATOM_SECRET_KEY is invalid or request expired.";
            } else {
                errorMsg = `Server returned status: ${error.response.status}`;
            }
        }
        
        console.log("\x1b[31m%s\x1b[0m", "❌ Boot Error: " + errorMsg);
        console.log("Retrying in 10 seconds...");
        setTimeout(initializeSystem, 10000);
    }
}

initializeSystem();
