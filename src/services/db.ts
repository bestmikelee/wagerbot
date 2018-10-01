import levelup from 'levelup';
import leveldown from 'leveldown';
import path from 'path';

const leveldb = levelup(leveldown(path.join(__dirname, '../leveldb')));

export default leveldb;
