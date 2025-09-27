const express = require("express");
const app = express();
const port =8080;
const path = require("path");
const {v4 : uuidv4} = require('uuid');
uuidv4(); 
const methodOverride = require("method-override");


// override with POST having ?_method=PATCH
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}));

app.set("view engine" , "ejs");
app.set("views",path.join(__dirname ,"views"))

app.use(express.static(path.join(__dirname, "public")));


let posts =  [
    {   
        id:uuidv4(),
        username : "namanKaushik",
        content : "Keep breaking your heart until it opens"
    },
    {
        id:uuidv4(),
        username : "vaidik",
        content : "Keep doing again and again until you got success"
    },
    {
        id:uuidv4(),
        username : "powerstar",
        content : "Power Yahi se shuru hota hai"
    },

];

app.get("/posts" ,(req,res)=>{
     res.render("index.ejs" ,{posts});
     
    
});
app.get("/posts/new" , (req , res)=>{
    res.render("new.ejs");
});

app.post("/posts" , (req , res) =>{
    let {username , content} = req.body;
    let id = uuidv4();
    posts.push({id , username , content});
    res.redirect("/posts");
});

//Show route : to get a post using id.
app.get("/posts/:id" , (req , res) =>{
     let {id} = req.params;
     let post = posts.find((p) => id === p.id);
     console.log(post);
    res.render("show.ejs" ,{posts});

})

//Patch Request
app.patch("/posts/:id" , (req , res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
})

//on click of edit post 
app.get("/posts/:id/edit" , (req , res )=>{
    let {id} = req.params;
    let post = posts.find((p) =>id === p.id);
    res.render("edit.ejs" , {post});
})

//DELETING POST

app.delete("/posts/:id" , (req , res)=>{
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");

})
app.listen(port ,() =>{
    console.log(`Listening to port ${port}`);
})