const express=require("express");
const app=express();
const mongoose= require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejs=require("ejs-mate");


const Listing=require("./models/listing.js");
const mongo_url="mongodb://127.0.0.1:27017/wanderlust"

main().then(()=>{
     console.log("Connected to DB");
})
.catch((err)=>
{
    console.log(err);
})

async function main()
{
   await mongoose.connect(mongo_url);
}


app.engine('ejs',ejs);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));

app.get("/",(req,res)=>
{
    res.send("root is listening");
})
app.get("/listings/new",async (req,res)=>
    {
        res.render("listings/new.ejs");
    })

    app.get("/listings/:id/edit",async (req,res)=>
    {
        let {id}=req.params;
        const listing=await Listing.findById(id);
        res.render("./listings/edit.ejs",{listing});
    })

app.get("/listings",async (req,res)=>
{
    const allListings=await Listing.find({});
    res.render("./listings/index.ejs",{allListings});

})
app.get("/listings/:id",async (req,res)=>
{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("./listings/show.ejs",{listing});
})

app.get("/testListing",async (req,res)=>
{
    let sampleListing=new Listing({
        title:"My new Villa",
        description:"By the Beach",
        price:1200,
        location:"Goa",
        country:"India",
    });
    await sampleListing.save();
    console.log("saved");
    res.send("successful saving");
})



app.post("/listings",async (req,res)=>
{
    let newlisting=new Listing(req.body.listing);
    newlisting.save();
    res.redirect("/listings");
})

app.put("/listings/:id",async (req,res)=>
{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/listings");
})

app.delete("/listing/:id",async (req,res)=>
{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})
app.listen(8080,()=>
{
    console.log("server is listening");
})