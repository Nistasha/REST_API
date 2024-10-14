const express = require('express');
const app=express();

//Use an in-memory array to simulate a database for tasks
let tasks = [
    {id: 1, task: 'Learn Node.js'},
    {id: 2, task: 'Build an API'}
];

//Middleware to parse  JSON data
app.use(express.json());

//Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

//Route to get  all the tasks (GET /tasks)
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

//Route to create a new task (POST /tasks), expects JSON body
app.post('/tasks', (req, res) => {

    const {task} = req.body; //Extracts task from the request body
    if(!task){
        return res.status(400).json({error: 'Task is required'});
    }
    const newTask = { 
        id: tasks.length + 1, task};
    tasks.push(newTask);
    res.status(201).json(newTask);
});


//Route to update a task (PUT /tasks/:id)
app.put('/tasks/:id', (req,res) => {
    const taskId = parseInt(req.params.id);
    const {task}= req.body;

    const existingTask= tasks.find(t => t.id === taskId);

    if(!existingTask){
        return res.status(400).json({error: 'Task not found'})
    } 
    if(!task){
        res.status(404).json({error: 'Task not found'})
    }

    existingTask.task= task;
    res.json(existingTask);
});

//Route to delete a task (DELETE /tasks/:id)
app.delete('/tasks/:id', (req, res) => {
    const taskId= parseInt(req.params.id);
    const task= tasks.filter(t=> t.id!== taskId);

    res.json({message: 'Task deleted'});
});

//Error handling middleware
app.use((err, req, res, next)=>{
    console.error(err.stack);//Log the error stack
    res.status(500).json({error: 'Something went wrong!'}); //respond with a generic error message
;
});

//Set the server to listen on port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});