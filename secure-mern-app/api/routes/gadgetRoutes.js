const express = require('express'); 
const router = express.Router(); 

const { 
    getAllGadgets, 
    getGadgetById, 
    createGadget 
} = require('../controllers/gadgetController'); 

const validateGadgetInput =
require('../middleware/validateGadgetInput'); 

router.get('/', getAllGadgets); 
router.get('/:id', getGadgetById); 
router.post('/', validateGadgetInput, createGadget); 

module.exports = router; 