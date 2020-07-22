import electron from 'electron'
import fs from 'fs'

export const local = () => {
    let dirs = []
    const source = 'E:/'
    fs.readdirSync(source).map(
        name => {
            if (
                !name.includes('.') &&
                !name.includes('System Volume Information') &&
                !name.includes('Android') &&
                !name.includes('Images') &&
                !name.includes('Movies') &&
                !name.includes('Music')) {
                dirs.push(name)
            }
        }
    )
    console.log(local)
}
