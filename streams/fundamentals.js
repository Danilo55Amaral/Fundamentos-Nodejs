// Netflix & Spotify 

// Importação de clientes via CSV (Excel)

// process.stdin
//     .pipe(process.stdout)

// Como construir streams do zero 

import { Readable } from 'node:stream'

class OneToHoundreStream extends Readable {
    index = 1 

    _read() {
        const i = this.index++ 

       setTimeout(() => {
        if (i > 100) {
            this.push(null)
        } else {
            const buf = Buffer.from(String(i))

            this.push(buf)
        }
       }, 1000)
    }
}

new OneToHoundreStream()
    .pipe(process.stdout)