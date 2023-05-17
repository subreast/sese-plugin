import Version from './Version.js'
import Data from './Data.js'
import renderer from './renderer.js';


const Path = process.cwd();
const Plugin_Name = 'sese-plugin'
const Plugin_Path = `${Path}/plugins/${Plugin_Name}`;


export { renderer, Data, Version, Path, Plugin_Name, Plugin_Path }