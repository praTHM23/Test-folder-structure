const Service = require('../models/service.model')
const cloudinary= require('../helpers/cloudinaryUpload')
// create
exports.addService = async (req, res) => {
    
//    console.log(req.body)
    try {
        // const service = await Service.create(req.body);
        console.log(req.body)
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        console.log("uploaded image")
    
        // Create new post
        const service = new Service({
        userID: req.body.userID ,
        occupation: req.body.occupation,
        serviceTitle: req.body.serviceTitle,
        serviceDescription: req.body.serviceDescription,
        location: req.body.location,
        serviceImage:result.secure_url,
        tags: req.body.tags,

        });
         service.save();
        console.log("post saved")
        res.status(200).send(service);
    }
    catch (err){
        res.send(err);
    }

}
// delete
exports.deleteService = async (req, res) => {
    console.log("deleted job")
     try {
         const service = await Service.findOneAndDelete(req.params.id);
         res.status(200).send(service);
     }
     catch (err){
         res.send(err);
     }}

//get     
exports.getService = async (req, res) => {
    console.log(req.params.id)
     try {
         const service = await Service.findById(req.params.id);
         res.status(200).send(service);
     }
     catch (err){
         res.send(err);
     }}

//get all
exports.getServices = async (req, res) => {
    console.log("get all service")
     try {
         const service = await Service.find();
         res.status(200).send(service);
     }
     catch (err){
         res.send(err);
     }}
//update
exports.updateService = async (req, res) => {
    console.log("update service")
     try {
         const service = await Service.findByIdAndUpdate(req.params.id, req.body,);
         res.status(200).send("updated");
        }
        catch (err){
            res.send(err);
        }}
   