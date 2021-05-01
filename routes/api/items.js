const express =require('express')
const router = express.Router();
//Item model
const Item = require('../../models/Item');
//@route Get api/items
//@desc Get al Items
//@access PUblic
router.get('/',(req,res)=>{
    Item.find()
    .sort({date:+1})
    .then(items=>res.json(items));
});
//@route post api/items
//@desc post al Items
//@access post
router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });
  newItem.save().then((item) => res.json(item));
}); //@route delete api/items
//@desc delete al Items
//@access Public
router.delete("/:id", (req, res) => {
    Item.findById(req.params.id)
    .then(item=> item.remove().then(()=>res.json({success: true})))
    .catch(err=> res.status(404).json({success: false}));
  
});

module.exports = router;
