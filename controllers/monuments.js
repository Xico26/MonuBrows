const Monument = require("../models/monument");
const { cloudinary } = require("../cloudinary")

module.exports.index = async (req, res) => {
  const monuments = await Monument.find({});
  res.render("monuments/index", {monuments});
};

module.exports.renderNewForm = (req, res) => {
  res.render("monuments/new");
};

module.exports.createMonument = async (req, res, next) => {
  const { longitude, latitude } = req.body.monument
  const coords = [longitude, latitude]
  const monument = new Monument(req.body.monument);
  monument.geometry = {type: "Point", coordinates: coords}
  monument.images = req.files.map(f => ({url: f.path, fileName: f.filename}))
  monument.author = req.user._id;
  await monument.save();
  console.log(monument)
  req.flash("success", "Successefuly added a new monument!");
  res.redirect(`/monuments/${monument._id}`);
};

module.exports.monumentDetails = async (req, res, next) => {
  const monument = await Monument.findById(req.params.id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("author");
  if (!monument) {
    req.flash("error", "Cannot find that monument!");
    res.redirect("/monuments");
  }
  res.render("monuments/details", { monument });
  console.log(monument.location)
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const monument = await Monument.findById(id);
  if (!monument) {
    req.flash("error", "Cannot find that monument!");
    res.redirect("/monuments");
  }
  res.render("monuments/edit", { monument });
};

module.exports.editMonument = async (req, res) => {
  const { id } = req.params;
  const { longitude, latitude } = req.body.monument
  const coords = [longitude, latitude]
  const monument = await Monument.findByIdAndUpdate(id, {...req.body.monument });
  const images = req.files.map(f => ({url: f.path, fileName: f.filename}))
  monument.images.push(...images)
  monument.geometry = {type: "Point", coordinates: coords}
  console.log(monument)
  await monument.save()
  if(req.body.deleteImages) {
    for (let fileName of req.body.deleteImages) {
      await cloudinary.uploader.destroy(fileName)
    }
    await monument.updateOne({
      $pull: {images: {
        fileName: {
          $in: req.body.deleteImages
        }
      }}
    })
  }
  req.flash("success", "Successefuly updated the monument!");
  res.redirect(`/monuments/${monument._id}`);
};

module.exports.deleteMonument = async (req, res) => {
  const { id } = req.params;
  const monument = await Monument.findByIdAndRemove(id);
  req.flash("success", "Successefuly deleted the monument!");
  res.redirect(`/monuments/`);
};

module.exports.searchMonuments = async (req, res) => {
  const { query } = req.body
  const monuments = await Monument.find({name: {$regex: query}})
  res.render("monuments/index", {monuments})
}

module.exports.filterMonuments = async (req, res) => {
  const selectedCountries = (req.body.selectCountries)
  const monuments = await Monument.find({country: {$in: selectedCountries} })
  res.render("monuments/index", { monuments })
}