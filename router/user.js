const express = require('express')
let userRouter = express.Router()
let fs = require('fs');
const path = require('path');
const uuid = require('uuid')
// var bodyParser = require('bodyParser')

userRouter.get('/:user',async (req, res) => {
    console.log('/',req.params);
    console.log('//',req.query);
    const getAll = await readAll()
    res.send('get method: ' + JSON.stringify(getAll))

    // res.send('get method ' + obj.user+getAll)
});

userRouter.post('/:user',async (req, res) => {
    const obj = req.query
    await addUser(obj)
    const getAll = await readAll()
    res.send('post method: '+ JSON.stringify(getAll))
});

userRouter.patch('/', (req, res) => {
    res.send('patch method')
}); 

userRouter.put('/:user', async(req, res) => {
    const obj = req.query
    console.log(obj);
    await updateUser(obj)
    const getAll = await readAll()
    res.send('put method: '+ JSON.stringify(getAll))
});

userRouter.delete('/:user', async(req, res) => {
    const obj = req.query
    console.log(obj);
    await deleteUser(obj)
    const getAll = await readAll()
    res.send('delete method: '+ JSON.stringify(getAll))
});

//read
const readAll = async()=>{
    try {
        const data =await fs.promises.readFile(path.resolve(__dirname,'student.json'),'utf-8')
        return JSON.parse(data)
    } catch (error) {
        console.log('no data',error);
        return []
    }
}

//write
const writeUser = async(data)=>{
    try {
        data.id = uuid.v4()
        if(!fs.existsSync(path.resolve(__dirname,'student.json'))){
            data= [data]
        await fs.promises.writeFile(path.resolve(__dirname,'student.json'),JSON.stringify(data))
        }
        await fs.promises.writeFile(path.resolve(__dirname,'student.json'),JSON.stringify(data))
    } catch (error) {
        console.log('/',error)
    }
}

//add
const addUser = async(data)=>{
    try {
        data.id = uuid.v4()
        if(!fs.existsSync(path.resolve(__dirname,'student.json'))){
            data = [data]
            await writeUser(data)
        }
        let allData = await readAll()
        allData = [...allData, data]
        await writeUser(allData)
    } catch (error) {
        throw(error)
    }
}

//update
const updateUser = async(user)=>{
    try {
        const {id:idUser,...dataUpdate} = user
        if(!idUser){
            console.log('User not found');
        }
        const allUser = await readAll()
        let indexUser = allUser.findIndex(({id})=>id === idUser)
        allUser[indexUser] = {id:idUser,...dataUpdate}
        await writeUser(allUser)
    } catch (error) {
        console.log('/',error);
    }
}

//delete
const deleteUser = async(idUser)=>{
    try {
        if(!idUser){
            throw new Error('User not found')
        }
        const allUser = await readAll()
        let indexUser = allUser.findIndex(({id})=>id === idUser)
        allUser.splice(indexUser,1)
        await writeUser(allUser)

    } catch (error) {
        throw(error)
    }
}


// writeUser({"name":2,"age":1})
// addUser({"name":1,"age":1})
// updateUser({name: 01, age: 10,adress:3, id: '38e01883-e28c-4354-9d86-7ed888c57670'})
// deleteUser('38e01883-e28c-4354-9d86-7ed888c57670')
module.exports = userRouter