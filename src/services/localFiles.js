import electron from 'electron'
import fs from 'fs'

export const local = () => {
    const source = 'E:/'
    let localList = []
    fs.readdirSync(source).map(name => {
        if (
            !name.includes('.') &&
            !name.includes('System Volume Information') &&
            !name.includes('Android') &&
            !name.includes('Images') &&
            !name.includes('Movies') &&
            !name.includes('Music')) {
            localList.push(name)
        }
    })
    return localList
}
