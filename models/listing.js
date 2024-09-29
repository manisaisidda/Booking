const mongoose=require("mongoose");

const Schema=mongoose.Schema;
const listingSchema=new Schema
({
     title:
     {
          type:String,
          required:true
     },
     description:String,
     image:
     {
          type:String,
          default:"https://unsplash.com/photos/a-cup-of-green-cream-with-a-spoon-next-to-it-jdWJHKbnVaY",
          set:(v)=>v===""?"https://unsplash.com/photos/a-cup-of-green-cream-with-a-spoon-next-to-it-jdWJHKbnVaY":v,
     },
     price:Number,
     location:String,
     Country:String

});

const listings=mongoose.model("Listing",listingSchema);

module.exports=listings;